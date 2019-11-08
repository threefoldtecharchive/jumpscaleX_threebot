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
    invited = gedis_client.actors.community_manager.check_referral(
        email=user_email, name=user_name, referral=bot.kwargs.get("referral")
    )
    # welcome_message = """
    # Hi there! <br /><br />
    # Welcome to ThreeFold Connect. <br /><br />
    # You're about to enter to a new digital world, where your data will be only yours. <br /><br />
    # The connect process, will allow us to better understand you and tailor our futur connect services. <br /><br />
    # You are 2 minutes away from getting your digital freedom back. <br /><br />
    # Looking forward to build this digital world together. <br /><br />
    # The ThreeFold Team <br />
    # """
    # go_to_main = bot.single_choice(f"{welcome_message}", ["OK"])

    # if no ref code acquired
    form = bot.new_form()
    threebot_doublename_ref_person = form.string_ask(
        """
    <h3>Welcome to ThreeFold</h3> <br />
    Please give the 3Bot double name of the person who referred you, if you don’t have, Please leave it empty
    """
    )
    form.ask()

    if threebot_doublename_ref_person.value:
        threebot_doublename_ref_person = threebot_doublename_ref_person.value.lower()
        valid_name = validate_threebot_name(threebot_doublename_ref_person)
        # TODO: check 3bot existed
        while not valid_name:
            form = bot.new_form()
            threebot_doublename_ref_person = form.string_ask(
                """
            <a>You have entered invalid name</a><br />
            Please make sure it's in the correct format, it's two parts each is 5 characters or more, example: kristof.eagle
            """
            )
            form.ask()
            threebot_doublename_ref_person = threebot_doublename_ref_person.value.lower()
            valid_name = validate_threebot_name(threebot_doublename_ref_person)

        form = bot.new_form()
        name = form.string_ask("<h3>Please fill in the following</h3> <br /> Name: ")
        email = form.string_ask("Email: ")
        company = form.string_ask("Company: ")
        country = form.string_ask("Country: ")
        secret = uuid.uuid4().hex
        form.ask()
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
        valid_name = validate_threebot_name(threebot_given_name)
        # TODO: check 3bot existed
        while not valid_name:
            form = bot.new_form()
            threebot_given_name = form.string_ask(
                """
            <a>You have entered invalid name</a><br />
            Please make sure it's in the correct format, it's two parts each is 5 characters or more, example: kristof.eagle
            """
            )
            form.ask()
            threebot_given_name = threebot_given_name.value.lower()
            valid_name = validate_threebot_name(threebot_given_name)

        # finishing
        # TODO: save threebot name
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

        # TODO: Save guest data
        # new_guest = gedis_client.actors.community_manager.guest_add()
        bot.single_choice(
            f"""We will find you the right ThreeFold Ambassador to help you further, stay tuned, <br />
            instructions will follow over email.""",
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
    # else:
    #     choice = bot.single_choice(
    #         f"Welcome {user_name} ...  to our ThreeFold World! Our dream is a complemetary responsible Internet, everywhere and owned by everyone, \n without borders \
    #     nor geographical discrimination. We envision a future where all humans are given an equal opportunity \
    #     to partake, learn, and succeed.",
    #         ["Count me in", "get invitation url"],
    #     )

    #     if choice == "get invitation url":
    #         code_id = gedis_client.actors.community_manager.get_invitation_code(email=user_email, user_name=user_name)
    #         md = f"""
    #             # please copy this url and send it to your friends
    #             - https://community.app.3bot.testnet.grid.tf/chat/session/community_join?referral={code_id.decode()}
    #             """
    #         res = j.tools.jinja2.template_render(text=j.core.text.strip(md), **locals())
    #         bot.md_show(res)

    #     if invited:
    #         spaces = gedis_client.actors.community_manager.spaces_list()
    #         interests = bot.multi_choice("Choose your interests: ", [space.decode() for space in spaces])
    #         result = gedis_client.actors.community_manager.community_join(user_email=user_email, spaces=interests)
    #         if not result:
    #             res = f"""
    #                 ## You invited by {invited.decode()}
    #                 # Sorry you can't joined to those spaces because:
    #                 - you don't have account in Freeflowpages
    #                 - or we have problem in FFP server
    #                 ### Click next
    #                 to try again
    #                 """

    #         else:
    #             res = f"""
    #             ## You invited by {invited.decode()}
    #             # You joined {interests}:
    #             - Email : {user_email}
    #             ### Click next
    #             for the final step which will redirect you to dynamic macro
    #             """
    #     else:
    #         bot.single_choice("We'll send you an email with invitation soon! Stay tuned", ["OK"])
    #         result = gedis_client.actors.community_manager.user_create(user_email=user_email, user_name=user_name)
    #         res = """
    #         ### Click next
    #         for the final step which will redirect you to dynamic macro
    #         """

    # res = j.tools.jinja2.template_render(text=j.core.text.strip(res), **locals())
    # bot.md_show(res)
    # gevent.sleep(1)
    # if not result:
    #     bot.redirect("/chat/session/community_join")
    # bot.redirect("/community/wiki")
