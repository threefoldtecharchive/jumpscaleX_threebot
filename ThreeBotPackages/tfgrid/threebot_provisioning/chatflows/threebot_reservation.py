from Jumpscale import j
import netaddr
import random
import nacl
import os


def chat(bot):
    """
    This chat is to deploy 3bot container on the grid
    """
    explorer = j.clients.threebot.explorer
    cl = j.clients.s3.get("deployer")

    AWS_ID = cl.accesskey_
    AWS_SECRET = cl.secretkey_

    user_info = bot.user_info()
    name = user_info["username"]
    email = user_info["email"]
    ips = ["IPv6", "IPv4"]
    choose = ["Deploy a new 3bot", "Restore my 3bot"]
    ip_range_choose = ["Specify IP Range", "Choose IP Range for me"]
    expiration = j.data.time.epoch + (60 * 60 * 24)  # for one day

    backup_directory = name.replace(".", "_")
    env = dict()
    secret_env = dict()

    if not name or not email:
        bot.md_show("Username or email not found in session. Please log in properly")

    user_choice = bot.single_choice("This wizard will help you deploy or restore your 3bot.", choose)
    identity = explorer.actors_all.phonebook.get(name=name, email=email)
    identity_pubkey = identity.pubkey
    if user_choice == "Restore my 3bot":
        password = bot.secret_ask("Please enter the password you configured to backup your 3bot")
        hash_restore = nacl.hash.blake2b(password.encode(), key=identity_pubkey.encode()).decode()

    # ask user about corex user:password and ssh-key to give him full access to his container
    pub_key = None
    while not pub_key:
        pub_key = bot.string_ask(
            """Please add your public ssh key, this will allow you to access the deployed container using ssh. 
            Just copy your key from `~/.ssh/id_rsa.pub`"""
        )

    form = bot.new_form()
    user_corex = form.string_ask(
        "Please create a username for your 3bot (this will allow you secure access to the 3bot from your web browser)"
    )
    password = form.secret_ask("Please create a password for your 3bot")
    form.ask()

    # create new reservation
    reservation = j.sal.zosv2.reservation_create()


    ip_version = bot.single_choice("Do you prefer to access your 3bot using IPv4 or IPv6? If unsure, chooose IPv4", ips)
    node_selected = j.sal.chatflow.nodes_get(1, cru=4, sru=8)
    if len(node_selected) != 0:
        node_selected = node_selected[0]
    else:
        node_selected = j.sal.chatflow.nodes_get(1, cru=4, hru=8)
        if len(node_selected) != 0:
            res = "# We are sorry we don't have empty Node to deploy your 3bot"
            res = j.tools.jinja2.template_render(text=res, **locals())
            bot.md_show(res)
            return
        node_selected = node_selected[0]

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

    reservation, config = j.sal.chatflow.network_configure(
        bot, reservation, [node_selected], customer_tid=identity.id, ip_version=ip_version
    )

    ip_address = config["ip_addresses"][0]

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

    env.update({"pub_key": pub_key})
    secret_env.update(
        {
            "AWS_ID": aws_id_encrypted,
            "AWS_SECRET": aws_secret_encrypted,
            "corex_password": password_corex_encrypted,
            "corex_user": user_corex_encrypted,
        }
    )

    container_flist = "https://hub.grid.tf/bola_nasr_1/threefoldtech-3bot-corex.flist"
    entry_point = "/usr/bin/zinit init -d"
    storage_url = "zdb://hub.grid.tf:9900"

    # Add volume and create container schema
    vol = j.sal.zosv2.volume.create(reservation, node_selected.node_id, size=8)
    rid = j.sal.zosv2.reservation_register(reservation, expiration, customer_tid=identity.id)
    # create container
    cont = j.sal.zosv2.container.create(
        reservation=reservation,
        node_id=node_selected.node_id,
        network_name=config["name"],
        ip_address=ip_address,
        flist=container_flist,
        storage_url=storage_url,
        env=env,
        entrypoint=entry_point,
        cpu=4,
        memory=4096,
        secret_env=secret_env,
    )

    j.sal.zosv2.volume.attach_existing(cont, vol, rid, "/sandbox/var")

    resv_id = j.sal.zosv2.reservation_register(reservation, expiration, customer_tid=identity.id)

    res = """# reservation sent. ID: {}
        """.format(
        resv_id
    )
    bot.md_show(res)

    filename = "{}_{}.conf".format(name, resv_id)

    res = """
            ## Use the following template to configure your wireguard connection. This will give you access to your 3bot.
            # Make sure you have wireguard ```https://www.wireguard.com/install/``` installed
            ## ```wg-quick up /etc/wireguard/{}```
            Click next
            to download your configuration
            """.format(
        filename
    )
    res = j.tools.jinja2.template_render(text=j.core.text.strip(res), **locals())
    bot.md_show(res)

    res = j.tools.jinja2.template_render(text=config["wg"], **locals())
    bot.download_file(res, filename)

    res = "# Open your browser at ```{}:1500```".format(ip_address)
    res = j.tools.jinja2.template_render(text=res, **locals())
    bot.md_show(res)
