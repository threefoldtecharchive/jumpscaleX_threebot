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
        <h3>Welcome to ThreeFold</h3> <br />
        Hi there! <br />
        Welcome to ThreeFold Connect. <br />
        You're about to enter to a new digital world, where your data will be only yours.
        The connect process, will allow us to better understand you and tailor our futur connect services.
        You are 2 minutes away from getting your digital freedom back. <br />
        Looking forward to build this digital world together. <br />
        The ThreeFold Team <br /><br />

        You are invited by {threebot_referrer_name}
        """,
            ["OK"],
        )
    else:
        # First page: if no ref code acquired
        form = bot.new_form()
        threebot_doublename_ref_person = form.string_ask(
            """
        <h3>Welcome to ThreeFold</h3> <br />
        Hi there! <br />
        Welcome to ThreeFold Connect. <br />
        You're about to enter to a new digital world, where your data will be only yours.
        The connect process, will allow us to better understand you and tailor our futur connect services.
        You are 2 minutes away from getting your digital freedom back. <br />
        Looking forward to build this digital world together. <br />
        The ThreeFold Team <br /><br />

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
            <a>You have entered invalid name</a><br />
            Please make sure it's in the correct format, it's two parts each is 5 characters or more, example: kristof.eagle
            """
            )
            form.ask()
            threebot_doublename_ref_person = threebot_doublename_ref_person.value.lower()
            is_valid_threebot = validate_threebot_name(threebot_doublename_ref_person)

        form = bot.new_form()
        name = form.string_ask("<h3>Please fill in the following</h3> <br /> Name: ")
        email = form.string_ask("Email: ")
        company = form.string_ask("Company: ")
        country = form.string_ask("Country: ")
        secret = uuid.uuid4().hex
        form.ask()
        # give user his secret url
        bot.single_choice(
            f"Your secret link is: <a>https://threefold.io/connect?secret={secret} </a> <br />This is used to change your information, Please keep it safe",
            ["OK"],
        )
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
            "Please mention which topics of ThreeFold you would like to be informed of", [space for space in spaces]
        )
        subscribe_to_mail = bot.single_choice(
            """Please confirm it's ok we inform you about news in the chosen topics.<br / >
        You can always unsubscribe later. If not you will not receive email notifications.""",
            ["OK"],
        )
        form = bot.new_form()
        threebot_given_name = form.string_ask(
            """Choose your own 3Bot name.<br / >
        A 3Bot name consists out of 2 names minimum 5 characters. <br / >
        Examples isabelle.belgium or red02.ghent<br />"""
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
                <a>You have entered invalid name</a><br />
                Please make sure it's in the correct format, it's two parts each is 5 characters or more, example: kristof.eagle
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
        )
        # result = gedis_client.actors.community_manager.community_join(user_email=email, spaces=interests)
        # code_id = gedis_client.actors.community_manager.get_invitation_code(
        #     email=email.value, user_name=threebot_given_name
        # )
        goodbye_message = f"""
        Congrats you have registerd your unique 3Bot name.<br />
        We will send you an E-mail <br />
        Your secret link is: <a>https://threefold.io/connect?secret={secret} </a><br />
        This link will let you change your information, Please DON'T share it with other people.<br />

        This is your referral link to let you invite your friends<br />
        <a>https://threefold.io/join?{threebot_given_name} </a><br />
        please copy this url and send it to your friends <br /><br />
        """
        bot.single_choice(f"{goodbye_message}", ["OK"])
        gevent.sleep(1)
        bot.redirect("https://threefold.io/")
    else:
        form = bot.new_form()
        name = form.string_ask("<h3>Please fill in the following</h3> <br /> Name: ")
        email = form.string_ask("Email: ")
        company = form.string_ask("Company: ")
        country = form.string_ask("Country: ")
        form.ask()
        # save data in bcdb
        save = gedis_client.actors.community_manager.user_add(
            name=name.value, email=email.value, country=country.value, company=company.value, threebot_name="guest"
        )
        bot.single_choice(
            f"""Great you’re done. <br />
            We will put you in touch with one of our ambassadors shortly. You’re soon about to get your digital freedom. 🙌🏻""",
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
