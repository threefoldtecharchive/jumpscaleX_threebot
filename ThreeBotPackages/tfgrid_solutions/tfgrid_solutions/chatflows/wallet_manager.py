from Jumpscale import j


def create_wallet(bot):
    explorerurl = j.clients.explorer.default.url
    wallettype = "STD"
    if "testnet" in explorerurl or "devnet" in explorerurl:
        wallettype = "TEST"

    name = bot.string_ask("Please provide your wallet name")
    while j.clients.stellar.exists(name):
        name = bot.string_ask("Wallet name already exists please choose another name")
    wallet = j.clients.stellar.new(name=name, network=wallettype)

    if wallettype == "TEST":
        bot.md_show("Will register your wallet")
        wallet.activate_through_friendbot()
    else:
        pass

    bot.md_show("Will setup trustlines for TFT and FreeTFT")
    wallet.add_known_trustline("TFT")
    wallet.add_known_trustline("FreeTFT")

    res = f"""\
        # Wallet has been created
        Your address `{wallet.address}`
        """
    bot.md_show(j.core.text.strip(res))


def manage_wallet(bot, walletname):
    wallet = j.clients.stellar.get(name=walletname)
    balances = wallet.get_balance()
    msg = """\

**Address:** `{{wallet.address}}`  
**Balances:**
{% for balance in balances.balances -%}
- {{balance.balance}} {{balance.asset_code}}
{% endfor %}
"""
    bot.qrcode_show(data=wallet.address, title=f"Wallet info {wallet.name}", msg=j.tools.jinja2.template_render(text=msg, wallet=wallet, balances=balances), scale=5)


def chat(bot):
    """
    """
    user_info = bot.user_info()

    j.sal.reservation_chatflow.validate_user(user_info)
    choices = ["Create new wallet"]
    walletdict = {}
    for wallet in j.clients.stellar.find():
        msg = f"Manage wallet {wallet.name}"
        choices.append(msg)
        walletdict[msg] = wallet.name
    choice = bot.single_choice("What would you like to do?", choices)
    if choices.index(choice) == 0:
        create_wallet(bot)
    else:
        manage_wallet(bot, walletdict[choice])
