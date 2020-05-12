from Jumpscale import j
import math


def chat(bot):
    """
    gitea container deploy
    """
    user_form_data = {}
    user_info = bot.user_info()
    HUB_URL = "https://hub.grid.tf/tf-official-apps/gitea-latest.flist"
    model = j.threebot.packages.tfgrid_solutions.tfgrid_solutions.bcdb_model_get("tfgrid.solutions.gitea.1")
    user_form_data["chatflow"] = "gitea"

    j.sal.reservation_chatflow.validate_user(user_info)
    bot.md_show("# This wizard wil help you deploy an gitea container", md=True)
    network = j.sal.reservation_chatflow.network_select(bot, j.me.tid)

    currency = network.currency
    user_form_data["Solution name"] = j.sal.reservation_chatflow.solution_name_add(bot, model)

    user_form_data["Public key"] = bot.upload_file(
        """Please add your public ssh key, this will allow you to access the deployed container using ssh.
                Just upload the file with the key""",
        required=True,
    ).split("\n")[0]

    expiration = bot.datetime_picker(
        "Please enter solution expiration time.",
        required=True,
        min_time=[3600, "Date/time should be at least 1 hour from now"],
        default=j.data.time.epoch + 3900,
    )
    user_form_data["Solution expiration"] = j.data.time.secondsToHRDelta(expiration - j.data.time.epoch)

    query = {"mru": math.ceil(1024 / 1024), "cru": 2, "hru": 5, "sru": 1}
    # create new reservation
    reservation = j.sal.zosv2.reservation_create()
    nodeid = bot.string_ask(
        "Please enter the node id you would like to deploy on if left empty a node will be chosen for you"
    )
    while nodeid:
        try:
            node_selected = j.sal.reservation_chatflow.validate_node(nodeid, query, currency)
            break
        except (j.exceptions.Value, j.exceptions.NotFound) as e:
            message = "<br> Please enter a different node id to deploy on or leave it empty"
            nodeid = bot.string_ask(str(e) + message)

    query["currency"] = currency

    form = bot.new_form()
    database_name = form.string_ask("Please add the database name of your gitea", default="postgres", required=True)
    database_user = form.string_ask(
        "Please add the username for your gitea database. Make sure not to loose it", default="postgres", required=True
    )
    database_password = form.string_ask(
        "Please add the secret for your gitea database. Make sure not to loose it", default="postgres", required=True
    )
    form.ask()
    user_form_data["Database Name"] = database_name.value
    user_form_data["Database User"] = database_user.value
    user_form_data["Database Password"] = database_password.value
    user_form_data["Repository"] = bot.string_ask(
        "Please add the name of repository in your gitea", default="myrepo", required=True
    )
    if not nodeid:
        farms = j.sal.reservation_chatflow.farm_names_get(1, bot, **query)
        node_selected = j.sal.reservation_chatflow.nodes_get(1, farm_names=farms, **query)[0]
    network.add_node(node_selected)

    ip_address = network.ask_ip_from_node(node_selected, "Please choose IP Address for your solution")
    user_form_data["IP Address"] = ip_address
    var_dict = {
        "pub_key": user_form_data["Public key"],
        "POSTGRES_DB": user_form_data["Database Name"],
        "DB_TYPE": "postgres",
        "DB_HOST": f"{ip_address}:5432",
        "POSTGRES_USER": user_form_data["Database User"],
        "APP_NAME": user_form_data["Repository"],
        "ROOT_URL": f"http://{ip_address}:3000",
    }
    database_password_encrypted = j.sal.zosv2.container.encrypt_secret(
        node_selected.node_id, user_form_data["Database Password"]
    )
    secret_env = {"POSTGRES_PASSWORD": database_password_encrypted}
    bot.md_show_confirm(user_form_data)
    network.update(j.me.tid, currency=currency, bot=bot)

    storage_url = "zdb://hub.grid.tf:9900"
    entry_point = "/start_gitea.sh"

    # create container
    j.sal.zosv2.container.create(
        reservation=reservation,
        node_id=node_selected.node_id,
        network_name=network.name,
        ip_address=ip_address,
        flist=HUB_URL,
        storage_url=storage_url,
        env=var_dict,
        interactive=False,
        entrypoint=entry_point,
        cpu=2,
        public_ipv6=True,
        memory=1024,
        secret_env=secret_env,
    )
    metadata = dict()
    metadata["chatflow"] = user_form_data["chatflow"]
    metadata["Solution name"] = user_form_data["Solution name"]
    metadata["Solution expiration"] = user_form_data["Solution expiration"]
    metadata["Database name"] = database_name.value
    metadata["Database user"] = database_user.value
    metadata["Database password"] = database_password.value
    metadata["Repository"] = user_form_data["Repository"]

    res = j.sal.reservation_chatflow.solution_model_get(
        user_form_data["Solution name"], "tfgrid.solutions.gitea.1", metadata
    )
    reservation = j.sal.reservation_chatflow.reservation_metadata_add(reservation, res)
    resv_id = j.sal.reservation_chatflow.reservation_register_and_pay(
        reservation, expiration, customer_tid=j.me.tid, currency=currency, bot=bot
    )

    j.sal.reservation_chatflow.reservation_save(
        resv_id, user_form_data["Solution name"], "tfgrid.solutions.gitea.1", user_form_data
    )

    res = f"""\
        # gitea has been deployed successfully: your reservation id is: {resv_id}
        To connect ```ssh git@{ip_address}``` .It may take a few minutes.
        open gitea from browser at ```{ip_address}:3000```
        """
    bot.md_show(j.core.text.strip(res), md=True)
