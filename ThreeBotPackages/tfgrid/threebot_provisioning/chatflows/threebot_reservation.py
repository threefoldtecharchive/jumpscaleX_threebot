from Jumpscale import j
import nacl


def chat(bot):
    """
    This chat is to deploy 3bot container on the grid
    """
    explorer = j.clients.explorer.default
    cl = j.clients.s3.get("deployer")

    AWS_ID = cl.accesskey_
    AWS_SECRET = cl.secretkey_

    user_info = bot.user_info()
    name = user_info["username"]
    email = user_info["email"]
    choose = ["Deploy a new 3bot", "Restore my 3bot"]
    ip_range_choose = ["Specify IP Range", "Choose IP Range for me"]
    expiration = j.data.time.epoch + (60 * 60 * 24)  # for one day

    backup_directory = name.replace(".", "_")
    env = dict()
    secret_env = dict()

    identity = j.sal.reservation_chatflow.validate_user(user_info)

    user_choice = bot.single_choice("This wizard will help you deploy or restore your 3bot.", choose)
    identity_pubkey = identity.pubkey
    if user_choice == "Restore my 3bot":
        password = bot.secret_ask("Please enter the password you configured to backup your 3bot")
        hash_restore = nacl.hash.blake2b(password.encode(), key=identity_pubkey.encode()).decode()

    network = j.sal.reservation_chatflow.network_select(bot, identity.id)
    currency = bot.single_choice("Please choose a currency that will be used for the payment", ["FreeTFT", "TFT"])
    if not currency:
        currency = "TFT"

    # ask user about corex user:password and ssh-key to give him full access to his container
    pub_key = None
    while not pub_key:
        pub_key = bot.upload_file(
            """"Please add your public ssh key, this will allow you to access the deployed container using ssh.
                Just upload the file with the key"""
        ).split("\n")[0]

    form = bot.new_form()
    user_corex = form.string_ask(
        "Please create a username for your 3bot (this will allow you secure access to the 3bot from your web browser)"
    )
    password = form.secret_ask("Please create a password for your 3bot")
    form.ask()

    # create new reservation
    reservation = j.sal.zosv2.reservation_create()
    node_selected = j.sal.reservation_chatflow.nodes_get(1, cru=4, sru=8, currency=currency)[0]
    if not node_selected:
        res = "# We are sorry we don't have empty Node to deploy your 3bot"
        res = j.tools.jinja2.template_render(text=res, **locals())
        bot.md_show(res)
        return

    network.add_node(node_selected)
    ip_address = network.ask_ip_from_node(node_selected, "Please choose IP Address for your solution")

    # Encrypt AWS ID and AWS Secret to send it in secret env
    aws_id_encrypted = j.sal.zosv2.container.encrypt_secret(node_selected.node_id, AWS_ID)
    aws_secret_encrypted = j.sal.zosv2.container.encrypt_secret(node_selected.node_id, AWS_SECRET)
    user_corex_encrypted = j.sal.zosv2.container.encrypt_secret(node_selected.node_id, user_corex.value)
    password_corex_encrypted = j.sal.zosv2.container.encrypt_secret(node_selected.node_id, password.value)

    # Create network of reservation and add peers
    if user_choice == "Restore my 3bot":
        hash_encrypt = j.sal.zosv2.container.encrypt_secret(node_selected.node_id, hash_restore)
        env.update({"restore": "True"})
        secret_env.update({"HASH": hash_encrypt})

    backup = bot.single_choice("Do you want your 3bot to be automatically backed up?", ["Yes", "No"])
    if backup == "Yes":
        password = bot.secret_ask(
            """The password you add here will be used to encrypt your backup to keep your 3bot safe.
            please make sure to keep this password safe so you can later restore your 3bot.
            Remember, this password will not be saved anywhere, so there cannot be recovery for it"""
        )
        hash_backup = nacl.hash.blake2b(password.encode(), key=identity_pubkey.encode()).decode()
        hash_encrypted = j.sal.zosv2.container.encrypt_secret(node_selected.node_id, hash_backup)
        secret_env.update({"HASH": hash_encrypted})
        env.update({"backup": "True", "FOLDER": backup_directory})

    env.update({"pub_key": pub_key, "botname": name, "botemail": email})
    secret_env.update(
        {
            "AWS_ID": aws_id_encrypted,
            "AWS_SECRET": aws_secret_encrypted,
            "corex_password": password_corex_encrypted,
            "corex_user": user_corex_encrypted,
        }
    )

    container_flist = "https://hub.grid.tf/bola_nasr_1/threefoldtech-3bot2-corex.flist"
    entry_point = "/usr/bin/zinit init -d"
    storage_url = "zdb://hub.grid.tf:9900"

    network.update(identity.id)
    # Add volume and create container schema
    vol = j.sal.zosv2.volume.create(reservation, node_selected.node_id, size=8)
    reservation_create = j.sal.reservation_chatflow.reservation_register(
        reservation, expiration, customer_tid=identity.id, currency=currency
    )
    rid = reservation_create.reservation_id
    wallet = j.sal.reservation_chatflow.payments_show(bot, reservation_create)
    if wallet:
        j.sal.zosv2.billing.payout_farmers(wallet, reservation_create)

    j.sal.reservation_chatflow.payment_wait(bot, rid)
    j.sal.reservation_chatflow.reservation_wait(bot, rid)

    # create container
    cont = j.sal.zosv2.container.create(
        reservation=reservation,
        node_id=node_selected.node_id,
        network_name=network.name,
        ip_address=ip_address,
        flist=container_flist,
        storage_url=storage_url,
        env=env,
        entrypoint=entry_point,
        cpu=4,
        memory=4096,
        public_ipv6=True,
        secret_env=secret_env,
    )

    volume_id = f"{rid}-{vol.workload_id}"
    j.sal.zosv2.volume.attach_existing(cont, volume_id, "/sandbox/var")

    reservation_create = j.sal.reservation_chatflow.reservation_register(
        reservation, expiration, customer_tid=identity.id, currency=currency
    )
    resv_id = reservation_create.reservation_id
    wallet = j.sal.reservation_chatflow.payments_show(bot, reservation_create)
    if wallet:
        j.sal.zosv2.billing.payout_farmers(wallet, reservation_create)

    j.sal.reservation_chatflow.payment_wait(bot, rid)
    j.sal.reservation_chatflow.reservation_wait(bot, resv_id)
    res = f"""
        # reservation sent. ID: {resv_id}
        # your 3bot container is ready. please continue initialization on ```{ip_address}:8000``` It may take a few minutes.
        """
    bot.md_show(j.core.text.strip(res))
