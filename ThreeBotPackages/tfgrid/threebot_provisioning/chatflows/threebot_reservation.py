from Jumpscale import j
import netaddr
import random
import nacl
import os


def chat(bot):

    """
    This chat is create 3bot container using zosv2
    """
    explorer = j.clients.threebot.explorer
    cl = j.clients.s3.get("deployer")

    AWS_ID = cl.accesskey_
    AWS_SECRET = cl.secretkey_

    user_info = bot.user_info()
    name = user_info["username"]
    email = user_info["email"]
    ips = ["IPV6", "IPV4"]
    choose = ["New", "Restore"]
    ip_range_choose = ["Specify IP Range", "Choose IP Range for me"]

    folder_name = name.replace(".", "_")
    env = dict()
    secret_env = dict()

    if not name or not email:
        bot.md_show("Username or email not found in session. Please log in properly")

    user_choice = bot.single_choice("create a new 3bot or restore existing 3bot?", choose)
    identity = explorer.actors_all.phonebook.get(name=name, email=email)
    identity_pubkey = identity.pubkey
    if user_choice == "Restore":
        password = bot.secret_ask("please add restore password?")
        hash_restore = nacl.hash.blake2b(password.encode(), key=identity_pubkey.encode()).decode()

    # ask user about corex user:password and ssh-key to give him full access to his container
    pub_key = bot.string_ask(
        "Please add your public ssh-key (that will allow you to access the deployed container using ssh) "
    )
    user_corex = bot.string_ask(
        "username of your coreX (that will allow you to be secure when access from web browser)"
    )
    password = bot.secret_ask("password of your coreX (that will allow you to be secure when access from web browser)")

    # create new reservation
    reservation = j.sal.zosv2.reservation_create()

    ip_version = bot.single_choice("choose your IP version", ips)
    node_selected = j.sal.chatflow.nodes_get(1)[0]

    # Encrypt AWS ID and AWS Secret to send it in secret env
    aws_id_encrypt = j.sal.zosv2.container.encrypt_secret(node_selected.node_id, AWS_ID)
    aws_secret_encrypt = j.sal.zosv2.container.encrypt_secret(node_selected.node_id, AWS_SECRET)

    # Create network of reservation and add peers
    if user_choice == "Restore":
        hash_encrypt = j.sal.zosv2.container.encrypt_secret(node_selected.node_id, hash_restore)
        env.update({"restore": "True"})
        secret_env.update({"HASH": hash_encrypt})

    reservation, config = j.sal.chatflow.network_configure(
        bot, reservation, [node_selected], customer_tid=identity.id, ip_version=ip_version
    )

    ip_address = config["ip_addresses"][0]

    backup = bot.single_choice("Auto-backup 3bot?", ["Yes", "No"])
    if backup == "Yes":
        password = bot.secret_ask("Backup password? Don't forget to save this password to be able to restore")
        hash_backup = nacl.hash.blake2b(password.encode(), key=identity_pubkey.encode()).decode()
        hash_encrypt = j.sal.zosv2.container.encrypt_secret(node_selected.node_id, hash_backup)
        secret_env.update({"HASH": hash_encrypt})
        env.update({"backup": "True", "FOLDER": folder_name})

    env.update({"corex_password": password, "corex_user": user_corex, "pub_key": pub_key})
    secret_env.update({"AWS_ID": aws_id_encrypt, "AWS_SECRET": aws_secret_encrypt})

    container_flist = "https://hub.grid.tf/bola_nasr_1/threefoldtech-3bot-corex.flist"
    entry_point = "/usr/bin/zinit init -d"
    storage_url = "zdb://hub.grid.tf:9900"

    # Add volume and create container schema
    expiration = j.data.time.epoch + (3600 * 24 * 365)
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
    expiration = j.data.time.epoch + (3600 * 24 * 365)

    resv_id = j.sal.zosv2.reservation_register(reservation, expiration, customer_tid=identity.id)

    res = """# reservation sent. ID: {}
        """.format(
        resv_id
    )
    bot.md_show(res)

    filename = "{}_{}.conf".format(name, resv_id)

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

    res = j.tools.jinja2.template_render(text=config["wg"], **locals())
    bot.download_file(res, filename)

    res = "# Open your browser at ```{}:1500```".format(ip_address)
    res = j.tools.jinja2.template_render(text=res, **locals())
    bot.md_show(res)
