from Jumpscale import j
import gevent
import re
import uuid


def chat(bot):
    """
    to call http://localhost/chat/session/community_join
    """
    # simple chatflow
    res = {}
    html = bot.html_show("community")
    bot.md_show_update(html.format(100, "community"))

    user_info = bot.user_info()
    user_name = user_info["username"]
    user_email = user_info["email"]  # still being added to the oauth user info
    gedis_client = j.clients.gedis.get(port=8901)
    invited = ""

    if bot.kwargs.get("secret"):
        threebot_name = gedis_client.actors.community_manager.get_by_secret(secret=bot.kwargs.get("secret")).decode()
        if threebot_name:
            form = bot.new_form()
            name = form.string_ask(
                f"<h3>Hello, 3Bot: {threebot_name} <br />Please fill in your details below. to change your data</h3> <br /> Name: "
            )
            email = form.string_ask("Email: ")
            company = form.string_ask("Company: ")
            country = form.string_ask("Country: ")
            form.ask()
            bot.single_choice(f"Saving data, Are you sure ?", ["OK"])
            save = gedis_client.actors.community_manager.user_add(
                name=name.value,
                email=email.value,
                country=country.value,
                company=company.value,
                threebot_name=threebot_name,
            )
            bot.single_choice(f"Data saved you can continue surfing now", ["OK"])
            gevent.sleep(1)
            bot.redirect("https://threefold.io/")
            return
        else:
            bot.single_choice(f"Secret is wrong please check and try again.", ["OK"])
            return

    if bot.kwargs.get("referral"):
        invited = gedis_client.actors.community_manager.check_referral(
            email=user_email, name=user_name, referral=bot.kwargs.get("referral")
        )
    threebot_doublename_ref_person = ""

    if invited:
        threebot_referrer_name = gedis_client.actors.community_manager.get_referral_name(
            referral=bot.kwargs.get("referral")
        ).decode()
        # First page: if ref code acquired
        threebot_doublename_ref_person = bot.kwargs.get("referral")
        bot.single_choice(
            f"""
        <h3>Welcome to ThreeFold Connect</h3> <br/>
        Hi there! <br/>
        You're about to enter to a new digital world, where your data will be only yours.
        The connect process will allow us to better understand you and tailor our future connect services. <br/>
        Looking forward to build the conscious internet together.<br/>
        The ThreeFold Team <br/><br/>

        You are invited by {threebot_referrer_name}
        """,
            ["OK"],
        )
    else:
        # First page: if no ref code acquired
        form = bot.new_form()
        threebot_doublename_ref_person = form.string_ask(
            """
        <h3>Welcome to ThreeFold Connect</h3> <br/>
        Hi there! <br/>
        You're about to enter to a new digital world, where your data will be only yours.
        The connect process will allow us to better understand you and tailor our future connect services. <br/>
        Looking forward to build the conscious internet together.<br/>
        The ThreeFold Team <br/><br/>

        Please give the 3Bot double name of the person who referred you, if you don’t have, Please leave it empty
        """
        )
        form.ask()
        threebot_doublename_ref_person = threebot_doublename_ref_person.value

    # If referral 3Bot is not empty
    if threebot_doublename_ref_person:
        threebot_doublename_ref_person = threebot_doublename_ref_person.lower()
        is_valid_threebot = validate_threebot_name(threebot_doublename_ref_person)
        # TODO: check 3bot existed
        while not is_valid_threebot:
            form = bot.new_form()
            threebot_doublename_ref_person = form.string_ask(
                """
            <a>You have entered an invalid name</a><br />
            Please make sure it's in the correct format. it's two parts each is 5 characters or more. for example: kristof.eagle
            """
            )
            form.ask()
            threebot_doublename_ref_person = threebot_doublename_ref_person.value.lower()
            is_valid_threebot = validate_threebot_name(threebot_doublename_ref_person)

        is_name_existed = False
        form = bot.new_form()
        name = form.string_ask(
            "<h3>Please fill in your details below.</h3> <br /> <h4>Name: </h4>", validate={"required": True}
        )
        email = form.string_ask("Email: ", validate={"required": True, "email": True})
        company = form.string_ask("Company: ", validate={"required": True})
        country = form.string_ask("Country: ", validate={"required": True})
        secret = uuid.uuid4().hex
        form.ask()
        is_name_existed = gedis_client.actors.community_manager.check_name_existance(name=name.value)
        while is_name_existed:
            form = bot.new_form()
            name = form.string_ask(
                "<h3>Please fill in your details below.</h3> <a>This name already exists, please try again</a> <br /> <h4>Name: </h4>",
                validate={"required": True},
            )
            email = form.string_ask("Email: ", validate={"required": True, "email": True})
            company = form.string_ask("Company: ", validate={"required": True})
            country = form.string_ask("Country: ", validate={"required": True})
            secret = uuid.uuid4().hex
            form.ask()
            is_name_existed = gedis_client.actors.community_manager.check_name_existance(name=name.value)

        spaces = [
            "ThreeFold Network User",
            "ThreeFold Network Farmer",
            "ThreeFold Network Developer",
            "Tokens Initial Exchange Offering Jan 2020",
            "ThreeFold Technology",
            "ThreeFold Investor",
            "ThreeFold Events",
            "3Bot your Digital Self",
        ]

        interests = bot.multi_choice(
            "Please select the ThreeFold Circles you’d like to be informed of.", [space for space in spaces]
        )
        subscribe_to_mail = bot.single_choice(
            """Please confirm that you want us to keep you updated about the ThreeFold Circles you selected. You can always unsubscribe later.""",
            ["OK"],
        )
        form = bot.new_form()
        threebot_given_name = form.string_ask(
            """Now it’s time to choose your 3Bot name.<br/>
            A 3Bot name needs 2 sets of minimum 5 characters.<br/>
            Examples isabelle.belgium or red02.ghent"""
        )
        form.ask()
        threebot_given_name = threebot_given_name.value.lower()
        is_valid_threebot = validate_threebot_name(threebot_given_name)
        is_unique_threebot = gedis_client.actors.community_manager.get_threebots(threebot_name=threebot_given_name)

        # check threebot is unique and valid
        while is_unique_threebot == 1 or not is_valid_threebot:
            form = bot.new_form()

            if not is_valid_threebot:
                threebot_given_name = form.string_ask(
                    """
                <a>You have entered an invalid name</a><br />
                Please make sure it's in the correct format. it's two parts each is 5 characters or more. for example: kristof.eagle
                """
                )
            if is_unique_threebot == 1:
                threebot_given_name = form.string_ask(
                    """
                <a>This name already exists</a><br />
                Please choose another one, it's two parts each is 5 characters or more, example: kristof.eagle
                """
                )
            form.ask()
            threebot_given_name = threebot_given_name.value.lower()
            is_valid_threebot = validate_threebot_name(threebot_given_name)
            is_unique_threebot = gedis_client.actors.community_manager.get_threebots(threebot_name=threebot_given_name)

        # finishing
        save = gedis_client.actors.community_manager.user_add(
            name=name.value,
            email=email.value,
            country=country.value,
            company=company.value,
            spaces=interests,
            threebot_name=threebot_given_name,
            secret=secret,
            invited_by=threebot_doublename_ref_person,
        )
        # result = gedis_client.actors.community_manager.community_join(user_email=email, spaces=interests)
        # code_id = gedis_client.actors.community_manager.get_invitation_code(
        #     email=email.value, user_name=threebot_given_name
        # )
        # send an email

        email_message = f"""
        Dear {name.value},

        Welcome to the ThreeFold community!

        This is a simple confirmation that you have successfully registered your 3Bot and you are now officially on the ThreeFold Network.

        You will also find below your referral link and secret link.

        Your referral link will enable you to invite new people to the ThreeFold Network. The greater the referrals, the greater the rewards. So without waiting, invite your circles to the Network.

        https://threefold.io/join?{threebot_given_name}

        Your secret link is a unique security access to your 3Bot details. Keep it safe.

        https://threefold.io/connect?secret={secret}

        Keep calm, and let’s connect the world consciously together

        Warm regards,

        ThreeFold Team
        """
        gedis_client.actors.community_manager.send_mail(
            name=name.value, receiver=email.value, content=email_message, subject="Welcome to the ThreeFold Network"
        )

        goodbye_message = f"""
        Congratulations you have successfully registered your unique 3Bot name. <br/>

        We will send you an E-mail shortly with your referral link and secret link.
        """
        bot.single_choice(f"{goodbye_message}", ["OK"])
        gevent.sleep(1)
        bot.redirect("https://threefold.io/")
    else:
        is_name_existed = False
        form = bot.new_form()
        name = form.string_ask(
            "<h3>Please fill in your details below.</h3> <br /> <h4>Name: </h4>", validate={"required": True}
        )
        email = form.string_ask("Email: ", validate={"required": True, "email": True})
        company = form.string_ask("Company: ", validate={"required": True})
        country = form.string_ask("Country: ", validate={"required": True})
        form.ask()
        is_name_existed = gedis_client.actors.community_manager.check_name_existance(name=name.value)
        while is_name_existed:
            form = bot.new_form()
            name = form.string_ask(
                "<h3>Please fill in your details below.</h3> <a>This name already exists, please try again</a> <br /> <h4>Name: </h4>",
                validate={"required": True},
            )
            email = form.string_ask("Email: ", validate={"required": True, "email": True})
            company = form.string_ask("Company: ", validate={"required": True})
            country = form.string_ask("Country: ", validate={"required": True})
            form.ask()
            is_name_existed = gedis_client.actors.community_manager.check_name_existance(name=name.value)

        # save data in bcdb
        save = gedis_client.actors.community_manager.user_add(
            name=name.value, email=email.value, country=country.value, company=company.value, threebot_name="guest"
        )

        email_message = f"""
        Dear {name.value},

        Welcome to the ThreeFold community!

        This is a simple confirmation that you have successfully registered your details with us. We will put you in touch with one of our ambassadors very soon, who will assist you throughout your 3Bot registration.

        We will only reach out when it's important, so keep an eye on your inbox for messages from us.

        You’re about to become part of the ThreeFold Community, where we together are growing a conscious Internet for everyone.

        Looking forward to having you with us!

        Warm regards,

        ThreeFold Team
        """
        gedis_client.actors.community_manager.send_mail(
            name=name.value,
            receiver=email.value,
            content=email_message,
            subject="Your registration was successful, stay tuned!",
        )
        bot.single_choice(
            f"""Congratulations you have successfully registered your details. <br/>

            We shall get in touch with you by e-mail shortly where we will explain you the next steps. <br/><br/>

            ThreeFold Team""",
            ["OK"],
        )

        gevent.sleep(1)
        bot.redirect("https://threefold.io/")


def validate_threebot_name(name):
    """
    valid threebotname should be xxxxx.xxxxx
    each part is 5 chars or longer
    """
    valid = False
    threebot_name = re.sub(r"\W+", ".", name)
    threebot_name = threebot_name.split(".")
    if len(threebot_name) == 2:
        if len(threebot_name[0]) > 4 and len(threebot_name[1]) > 4:
            valid = True

    return valid
