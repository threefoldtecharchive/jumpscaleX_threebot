from Jumpscale import j
import time


def chat(bot):
    """
    """
    user_form_data = {}
    user_info = bot.user_info()
    name = user_info["username"]
    email = user_info["email"]
    ips = ["IPv6", "IPv4"]
    flist_url = "https://hub.grid.tf/azmy.3bot/minio.flist"
    expiration = j.data.time.epoch + (60 * 60 * 24)  # for one day
    explorer = j.clients.explorer.default
    if not email:
        raise j.exceptions.Value("Email shouldn't be empty")

    user_form_data["IP version"] = bot.single_choice(
        "This wizard will help you deploy a minio cluster, do you prefer to access your 3bot using IPv4 or IPv6? If unsure, choose IPv4",
        ips,
    )

    user_form_data["Password"] = bot.string_ask(
        "Please add a password to be used for all zdb storage", default="password"
    )
    user_form_data["Disk type"] = bot.drop_down_choice("Please choose a disk type to be for zdb", ["SSD", "HDD"])
    user_form_data["Mode"] = bot.drop_down_choice(
        "Please choose the mode to be used for the database. If unsure, choose seq", ["seq", "user"]
    )
    user_form_data["Access key"] = bot.string_ask(
        "Please add the key to be used for minio when logging in. Make sure not to loose it", default=name.split(".")[0]
    )
    user_form_data["Secret"] = bot.string_ask(
        "Please add the secret to be used for minio when logging in to match the previous key. Make sure not to loose it",
        default="secret12345",
    )
    user_form_data["CPU"] = bot.int_ask("Resources for minio: Please add the how much cpu is needed", default=2)
    user_form_data["Memory"] = bot.int_ask(
        "Resources for minio: Please add the size you need for the memory", default=2048
    )
    user_form_data["Data number"] = str(
        bot.string_ask(
            "Resources for minio: Please add the number of data drives you need. Take care of the ratio between the data drives and parity drives you will specify next",
            default="1",
        )
    )
    user_form_data["Parity"] = str(
        bot.string_ask("Resources for minio: Please add the number of parity drives you need", default="0")
    )
    user_form_data["ZDB number"] = int(user_form_data["Data number"]) + int(user_form_data["Parity"])

    bot.md_show_confirm(user_form_data)

    # create new reservation
    reservation = j.sal.zosv2.reservation_create()

    identity = explorer.users.get(name=name, email=email)

    nodes_selected = j.sal.reservation_chatflow.nodes_get(
        user_form_data["ZDB number"] + 1, ip_version=user_form_data["IP version"], farm_id=71
    )
    selected_node = nodes_selected[0]

    # Create network of reservation and add peers
    reservation, configs = j.sal.reservation_chatflow.network_configure(
        bot,
        reservation,
        nodes_selected,
        customer_tid=identity.id,
        ip_version=user_form_data["IP version"],
        number_of_ipaddresses=1,
    )
    rid = configs["rid"]

    ip_address = configs["ip_addresses"][0]
    wg_quick = configs["wg"]
    network_name = configs["name"]

    for i in range(1, len(nodes_selected)):
        zdb = j.sal.zosv2.zdb.create(
            reservation=reservation,
            node_id=nodes_selected[i].node_id,
            size=10,
            mode=user_form_data["Mode"],
            password=user_form_data["Password"],
            disk_type=user_form_data["Disk type"],
            public=False,
        )

    # register the reservation for zdb db
    zdb_rid = j.sal.reservation_chatflow.reservation_register(reservation, expiration, customer_tid=identity.id)
    res = (
        f"# Database has been deployed with reservation id: {zdb_rid}. Click next to continue with deployment of minio"
    )

    reservation_result = []
    trials = 20
    zdbs_found = False
    while not zdbs_found:
        number_of_zdbs_found = 0
        reservation_result = explorer.reservations.get(zdb_rid).results
        for result in reservation_result:
            if result.category == "ZDB":
                number_of_zdbs_found += 1
        if number_of_zdbs_found == user_form_data["ZDB number"]:
            zdbs_found = True

        trials = trials - 1
        if trials == 0:
            break
    # read the IP address of the 0-db namespaces after they are deployed to be used in the creation of the minio container
    namespace_config = []
    for result in reservation_result:
        if result.category == "ZDB":
            data = result.data_json
            cfg = f"{data['Namespace']}:{user_form_data['Password']}@[{data['IP']}]:{data['Port']}"
            namespace_config.append(cfg)

    entry_point = "/bin/entrypoint"

    # create container
    cont = j.sal.zosv2.container.create(
        reservation=reservation,
        node_id=selected_node.node_id,
        network_name=network_name,
        ip_address=ip_address,
        flist=flist_url,
        entrypoint=entry_point,
        cpu=user_form_data["CPU"],
        memory=user_form_data["Memory"],
        env={
            "SHARDS": ",".join(namespace_config),
            "DATA": user_form_data["Data number"],
            "PARITY": user_form_data["Parity"],
            "ACCESS_KEY": user_form_data["Access key"],
            "SECRET_KEY": user_form_data["Secret"],
        },
    )

    resv_id = j.sal.reservation_chatflow.reservation_register(reservation, expiration, customer_tid=identity.id)

    if j.sal.reservation_chatflow.reservation_failed(bot=bot, category="CONTAINER", resv_id=resv_id):
        return
    else:

        res = f"# Minio cluster has been deployed successfully: your reservation id is: {resv_id}"
        bot.md_show(res)
        filename = "{}_{}.conf".format(name.split(".3bot")[0], resv_id)

        res = """
                # Use the following template to configure your wireguard connection. This will give you access to your 3bot.
                ## Make sure you have <a href="https://www.wireguard.com/install/">wireguard</a> installed
                Click next
                to download your configuration
                """
        res = j.tools.jinja2.template_render(text=j.core.text.strip(res), **locals())
        bot.md_show(res)

        res = j.tools.jinja2.template_render(text=wg_quick, **locals())
        bot.download_file(res, filename)
        res = """
                # In order to have the network active and accessible from your local machine. To do this, execute this command: 
                ## ```wg-quick up /etc/wireguard/{}```
                Click next
                """.format(
            filename
        )

        res = j.tools.jinja2.template_render(text=j.core.text.strip(res), **locals())
        bot.md_show(res)
        res = "# Open your browser at ```{}:9000```. It may take a few minutes.".format(ip_address)
        res = j.tools.jinja2.template_render(text=res, **locals())
        bot.md_show(res)
