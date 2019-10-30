from Jumpscale import j


def chat(bot):
    explorer = j.clients.gedis.get(name="explorer", port=8901, host="explorer.testnet.grid.tf")

    question = "Please enter your farm name: {}"
    remark = ""
    while True:
        name = bot.string_ask(question.format(remark))
        try:
            found = explorer.actors.farms.get(name=name)
        except j.exception.NotFound:
            found = False
        if found:
            remark = "(this farm name  is already used, please choose another one)"
            continue
        else:
            break

    question = "Please enter your email: {}"
    remark = ""
    while True:
        email = bot.string_ask(question.format(remark))
        if not j.data.types.email.check(email):
            remark = "(Invalid email)"
            continue
        break

    question = "Please enter the TFT wallet address where to send the farmed token of your farm: {}"
    remark = ""
    while True:
        wallet_address = bot.string_ask(question)
        if not wallet_address:
            remark = "wallet address cannot be empty"
            continue
        if len(wallet_address) != 78:
            remark = (
                "The size of you wallet address is not valid. please double check you have properly copied the address"
            )
            continue
        break

    farm = j.data.schema.get("tfgrid.farm.1").new()
    farm.name = name
    farm.wallet_addresses = [wallet_address]
    farm.email = email

    try:
        farm = explorer.actors.farm.register(farm)
        bot.md_show("You farm has been registered successfully. Your farm ID is %d" % farm.id)
    except:
        bot.md_show("Something wrong happend during the resitration, please try again later")
