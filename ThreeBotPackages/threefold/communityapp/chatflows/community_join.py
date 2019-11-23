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

    if not invited:
        form = bot.new_form()
        invited_bot = form.string_ask(
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
        invited = gedis_client.actors.community_manager.check_referral(
            email=user_email, name=user_name, bot_invited=invited_bot
        )

    gedis_client.actors.community_manager.set_current_user(user=user_email)

    if invited:
        choice = bot.single_choice(
            f"""
        <h3>Welcome to ThreeFold Connect</h3> <br/>
        Hi there! <br/>
        You're about to enter to a new digital world, where your data will be only yours.
        The connect process will allow us to better understand you and tailor our future connect services. <br/>
        Looking forward to build the conscious internet together.<br/>
        The ThreeFold Team <br/><br/>
        You are invited by {invited.decode()}
        """,
            ["Count me in", "get invitation url"],
        )

        if choice == "get invitation url":
            code_id = gedis_client.actors.community_manager.get_invitation_code(email=user_email, user_name=user_name)
            md = f"""
                # please copy this url and send it to your friends
                - https://community.app.3bot.testnet.grid.tf/chat/session/community_join?referral={code_id.decode()}
                """
            res = j.tools.jinja2.template_render(text=j.core.text.strip(md), **locals())
            bot.md_show(res)
        spaces = gedis_client.actors.community_manager.spaces_list()
        interests = bot.multi_choice(
            """
            <h1>please notice this is currently set to staging ffp for testing purposes </h1> <br/>
            <h2>to be set to freeflowpages.com on next release</h2><br/>
            Choose your interests: """,
            [space.decode() for space in spaces],
        )
        result = gedis_client.actors.community_manager.community_join(user_email=user_email, spaces=interests)
        if not result:
            result = gedis_client.actors.community_manager.user_create(user_email=user_email, user_name=user_name)
            result = gedis_client.actors.community_manager.community_join(user_email=user_email, spaces=interests)
            if not result:
                res = f"""
                ## you have been invited by {invited.decode()}
                # Sorry you can't joined to those spaces because:
                - we have problem in FFP server
                ### Click next
                to try again
                """
            else:

                res = f"""
                ## you have been invited by {invited.decode()}
                # You joined :
                """
                for interest in interests:
                    res = (
                        res
                        + f"""
                    - {interest}
                    """
                    )
                res = (
                    res
                    + """
                ### Click next
                for the final step which will redirect you to dynamic macro
                """
                )

        else:
            res = f"""
            ## you have been invited by {invited.decode()}
            # You joined :
            """
            for interest in interests:
                res = (
                    res
                    + f"""
                - {interest}
                """
                )
            res = (
                res
                + """
            ### Click next
            for the final step which will redirect you to dynamic macro
            """
            )
    else:
        result = False
        res = """
        # Sorry! The 3bot name you entered or the referral code is incorrect
        ## We'll send you an email with an invitation soon. Stay tuned!
        ### Click next
        to resetart your chatflow
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

    email_message = f"""
        Dear {name},
        Welcome to the ThreeFold community!
        This is a simple confirmation that you have successfully registered your details with us. We will put you in touch with one of our ambassadors very soon, who will assist you throughout your 3Bot registration.
        We will only reach out when it's important, so keep an eye on your inbox for messages from us.
        You’re about to become part of the ThreeFold Community, where we together are growing a conscious Internet for everyone.
        Looking forward to having you with us!
        Warm regards,
        ThreeFold Team
        """
    gedis_client.actors.community_manager.send_mail(
        name=user_name,
        receiver=user_email,
        content=j.core.tools.text_strip(email_message),
        subject="Your registration was successful, stay tuned!",
    )

    res = j.tools.jinja2.template_render(text=j.core.text.strip(res), **locals())
    bot.md_show(res)
    gevent.sleep(1)
    if not result:
        bot.redirect("/chat/session/community_join")
    bot.redirect("/community/wiki")
