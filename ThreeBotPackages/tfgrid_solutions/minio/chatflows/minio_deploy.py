from Jumpscale import j


def chat(bot):
    """
    """

    user_info = bot.user_info()
    name = user_info["username"]
    email = user_info["email"]
    ips = ["IPV6", "IPV4"]
    flist_url = "https://hub.grid.tf/azmy.3bot/minio.flist"

    explorer = j.clients.threebot.explorer
    if not email:
        raise j.exceptions.BadRequest("Email shouldn't be empty")

    ip_version = bot.single_choice("Choose your ip version", ips)

    password = bot.string_ask("Please add the password to be used for zdb", default="password")
    disk_type = bot.drop_down_choice("Please choose a disk_type for zdb", ["SSD", "HDD"])
    mode = bot.drop_down_choice("Please choose the mode to be used for the database", ["seq", "user"])

    secret = bot.string_ask("Please add the secret to be used for minio", default="secret")
    cpu = bot.int_ask("Resources for minio: Please add the number of cpu needed")
    memory = bot.int_ask("Resources for minio: Please add the size for the memory")
    data = bot.string_ask("Resources for minio: Please add the number of data", default="2")
    parity = bot.string_ask("Resources for minio: Please add the parity to be used", default="1")

    # create new reservation
    reservation = j.sal.zosv2.reservation_create()
    identity = explorer.actors_all.phonebook.get(name=name, email=email)

    nodes_selected = j.sal.chatflow.nodes_get(1, ip_version)
    selected_node = nodes_selected[0]

    # Create network of reservation and add peers
    reservation, configs, rid = j.sal.chatflow.network_configure(bot, reservation, nodes_selected)

    ip_address = configs["ip_addresses"][0]
    wg_quick = configs["wg"]
    network_name = configs["name"]

    zdb = j.sal.zosv2.zdb.create(
        reservation=reservation,
        node_id=selected_node.node_id,
        size=10,
        mode=mode,
        password=password,
        disk_type=disk_type,
        public=False,
    )

    # register the reservation for zdb db
    expiration = j.data.time.epoch + (3600 * 24 * 365)
    zdb_rid = j.sal.zosv2.reservation_register(reservation, expiration)
    res = f"# Database has been deployed with reservation id: {zdb_rid}"

    reservation_result = explorer.actors_all.workload_manager.reservation_get(zdb_rid).results
    # read the IP address of the 0-db namespaces after they are deployed
    # we will need these IPs when creating the minio container
    namespace_config = []
    for result in reservation_result:
        if result.category == "ZDB":
            data = j.data.serializers.json.loads(result.data_json)
            cfg = f"{data['Namespace']}:{password}@[{data['IP']}]:{data['Port']}"
            namespace_config.append(cfg)

    entry_point = "/bin/entrypoint"
    storage_url = "zdb://hub.grid.tf:9900"

    # create container
    cont = j.sal.zosv2.container.create(
        reservation=reservation,
        node_id=selected_node.node_id,
        network_name=network_name,
        ip_address=ip_address,
        flist=flist_url,
        entrypoint=entry_point,
        cpu=cpu,
        memory=memory,
        storage_url=storage_url,
        env={
            "SHARDS": ",".join(namespace_config),
            "DATA": data,
            "PARITY": parity,
            "ACCESS_KEY": "minio",
            "SECRET_KEY": secret,
        },
    )

    expiration = j.data.time.epoch + (3600 * 24 * 365)
    resv_id = j.sal.zosv2.reservation_register(reservation, expiration)

    res = f"# Minio has been deployed successfully: your reservation id is: {resv_id} "

    bot.md_show(res)
    filename = "{}_{}.conf".format(name.split(".3bot")[0], resv_id)

    res = """
            # use the next template to configure the wg-quick config of your laptop:
            ### ```wg-quick up /etc/wireguard/{}```
            Click next
            to download your configuration
            """.format(
        filename
    )
    res = j.tools.jinja2.template_render(text=j.core.text.strip(res), **locals())
    bot.md_show(res)

    res = j.tools.jinja2.template_render(text=wg_quick, **locals())
    bot.download_file(res, filename)
