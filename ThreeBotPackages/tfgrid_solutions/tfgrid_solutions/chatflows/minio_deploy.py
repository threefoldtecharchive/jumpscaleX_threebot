from Jumpscale import j
import math


def chat(bot):
    """
    """
    user_form_data = {}
    user_info = bot.user_info()
    name = user_info["username"]
    user_form_data["chatflow"] = "minio"
    flist_url = "https://hub.grid.tf/tf-official-apps/minio-2020-01-25T02-50-51Z.flist"
    model = j.threebot.packages.tfgrid_solutions.tfgrid_solutions.bcdb_model_get("tfgrid.solutions.minio.1")

    j.sal.reservation_chatflow.validate_user(user_info)

    bot.md_show("# This wizard will help you deploy a minio cluster")
    network = j.sal.reservation_chatflow.network_select(bot, j.me.tid)
    if not network:
        return
    currency = network.currency

    user_form_data["Solution name"] = j.sal.reservation_chatflow.solution_name_add(bot, model)

    user_form_data["Disk type"] = bot.drop_down_choice("Please choose a the type of disk for zdb", ["SSD", "HDD"])

    accesskey_string = f"{name.split('.')[0]}"
    secret_string = "secret12345"
    while True:
        form = bot.new_form()
        accesskey = form.string_ask(
            "Please add the key to be used for minio when logging in. Make sure not to loose it",
            default=accesskey_string,
        )
        secret = form.string_ask(
            "Please add the secret to be used for minio when logging in to match the previous key. Make sure not to loose it",
            default=secret_string,
        )
        form.ask()
        accesskey_string = accesskey.value
        secret_string = secret.value
        ok = True
        if len(accesskey_string) < 3:
            ok = False
            bot.md_show("Access key should be atleast 3 characters")
        if len(secret_string) < 8:
            ok = False
            bot.md_show("Secret should be atleast 8 characters")
        if ok:
            break

    user_form_data["Access key"] = accesskey.value
    user_form_data["Secret"] = secret.value

    form = bot.new_form()
    cpu = form.int_ask("Please add how many CPU cores are needed", default=1)
    memory = form.int_ask("Please add the amount of memory in MB", default=1024)
    form.ask()
    user_form_data["CPU"] = cpu.value
    user_form_data["Memory"] = memory.value

    form = bot.new_form()
    data_number = form.int_ask(
        "Resources for minio: Please add the number of locations you need. Take care of the ratio between the locations and locations allowed to fail that you will specify next",
        default=2,
    )
    parity = form.int_ask("Resources for minio: Please add the number of locations allowed to fail", default=1)

    form.ask()
    user_form_data["Locations"] = int(data_number.value)
    user_form_data["Locations allowed to fail"] = int(parity.value)
    user_form_data["ZDB number"] = int(data_number.value) + int(parity.value)

    expirationdelta = int(bot.time_delta_ask("Please enter solution expiration time.", default="1d"))
    user_form_data["Solution expiration"] = j.data.time.secondsToHRDelta(expirationdelta)
    expiration = j.data.time.epoch + expirationdelta
    # create new reservation
    reservation = j.sal.zosv2.reservation_create()

    zdb_nodequery = {}
    zdb_nodequery["currency"] = currency
    if user_form_data["Disk type"] == "SSD":
        zdb_nodequery["sru"] = 10
    if user_form_data["Disk type"] == "HDD":
        zdb_nodequery["hru"] = 10

    zdb_farms = j.sal.reservation_chatflow.farm_names_get(
        user_form_data["ZDB number"], bot, message="zdb", **zdb_nodequery
    )
    nodes_selected = j.sal.reservation_chatflow.nodes_get(
        number_of_nodes=user_form_data["ZDB number"], farm_names=zdb_farms, **zdb_nodequery
    )

    nodequery = {}
    nodequery["currency"] = currency
    nodequery["mru"] = math.ceil(memory.value / 1024)
    nodequery["cru"] = cpu.value
    cont_farms = j.sal.reservation_chatflow.farm_names_get(
        user_form_data["ZDB number"], bot, message="minio container", **nodequery
    )
    cont_node = j.sal.reservation_chatflow.nodes_get(number_of_nodes=1, farm_names=cont_farms, **nodequery)[0]

    for node_selected in nodes_selected:
        network.add_node(node_selected)

    if cont_node not in nodes_selected:
        network.add_node(cont_node)

    ip_address = network.ask_ip_from_node(cont_node, "Please choose IP Address for your solution")
    bot.md_show_confirm(user_form_data)

    network.update(j.me.tid, currency=currency, bot=bot)
    password = j.data.idgenerator.generateGUID()

    for node in nodes_selected:
        j.sal.zosv2.zdb.create(
            reservation=reservation,
            node_id=node.node_id,
            size=10,
            mode="seq",
            password=password,
            disk_type=user_form_data["Disk type"],
            public=False,
        )
    volume = j.sal.zosv2.volume.create(reservation, cont_node.node_id, size=10, type=user_form_data["Disk type"])

    # register the reservation for zdb db
    zdb_rid = j.sal.reservation_chatflow.reservation_register_and_pay(
        reservation, expiration, customer_tid=j.me.tid, currency=currency, bot=bot
    )
    res = f"# Database has been deployed with reservation id: {zdb_rid}. Click next to continue with deployment of the minio container"

    reservation_result = j.sal.reservation_chatflow.reservation_wait(bot, zdb_rid)
    bot.md_show(res)

    # read the IP address of the 0-db namespaces after they are deployed to be used in the creation of the minio container
    namespace_config = []
    for result in reservation_result:
        if result.category == "ZDB":
            data = result.data_json
            cfg = f"{data['Namespace']}:{password}@[{data['IP']}]:{data['Port']}"
            namespace_config.append(cfg)

    entry_point = "/bin/entrypoint"

    minio_secret_encrypted = j.sal.zosv2.container.encrypt_secret(cont_node.node_id, user_form_data["Secret"])
    shards_encrypted = j.sal.zosv2.container.encrypt_secret(cont_node.node_id, ",".join(namespace_config))
    secret_env = {"SHARDS": shards_encrypted, "SECRET_KEY": minio_secret_encrypted}

    # create container
    cont = j.sal.zosv2.container.create(
        reservation=reservation,
        node_id=cont_node.node_id,
        network_name=network.name,
        ip_address=ip_address,
        flist=flist_url,
        entrypoint=entry_point,
        cpu=user_form_data["CPU"],
        public_ipv6=True,
        memory=user_form_data["Memory"],
        env={"DATA": str(data_number.value), "PARITY": str(parity.value), "ACCESS_KEY": user_form_data["Access key"]},
        secret_env=secret_env,
    )

    j.sal.zosv2.volume.attach_existing(container=cont, volume_id=f"{zdb_rid}-{volume.workload_id}", mount_point="/data")

    res = j.sal.reservation_chatflow.solution_model_get(
        user_form_data["Solution name"], "tfgrid.solutions.minio.1", user_form_data
    )
    reservation = j.sal.reservation_chatflow.reservation_metadata_add(reservation, res)
    resv_id = j.sal.reservation_chatflow.reservation_register_and_pay(
        reservation, expiration, customer_tid=j.me.tid, currency=currency, bot=bot
    )
    j.sal.reservation_chatflow.reservation_save(
        resv_id, user_form_data["Solution name"], "tfgrid.solutions.minio.1", user_form_data
    )
    res = f"""\
        # Minio cluster has been deployed successfully. Your reservation id is: {resv_id}
        Open your browser at [http://{ip_address}:9000](http://{ip_address}:9000). It may take a few minutes.
        """
    bot.md_show(j.core.text.strip(res))
