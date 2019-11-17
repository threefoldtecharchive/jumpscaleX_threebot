from Jumpscale import j
import gevent


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
        invited_bot = form.string_ask("what is the name of  the 3bot that you were invited by ?")
        form.ask()
        invited = gedis_client.actors.community_manager.check_referral(
            email=user_email, name=user_name, bot_invited=invited_bot
        )

    gedis_client.actors.community_manager.set_current_user(user=user_email)

    choice = bot.single_choice(
        f"Welcome {user_name} ...  to our ThreeFold World! Our dream is a complemetary responsible Internet, everywhere and owned by everyone, \n without borders \
    nor geographical discrimination. We envision a future where all humans are given an equal opportunity \
    to partake, learn, and succeed.",
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

    if invited:
        spaces = gedis_client.actors.community_manager.spaces_list()
        interests = bot.multi_choice("Choose your interests: ", [space.decode() for space in spaces])
        result = gedis_client.actors.community_manager.community_join(user_email=user_email, spaces=interests)
        if not result:
            result = gedis_client.actors.community_manager.user_create(user_email=user_email, user_name=user_name)
            result = gedis_client.actors.community_manager.community_join(user_email=user_email, spaces=interests)
            if not result:
                res = f"""
                ## You invited by {invited.decode()}
                # Sorry you can't joined to those spaces because:
                - you don't have account in Freeflowpages
                - or we have problem in FFP server
                ### Click next
                to try again
                """
            else:
                res = f"""
                ## You invited by {invited.decode()}
                # You joined {interests}:
                - Email : {user_email}
                ### Click next
                for the final step which will redirect you to dynamic macro
                """

        else:
            res = f"""
            ## You invited by {invited.decode()}
            # You joined {interests}:
            - Email : {user_email}
            ### Click next
            for the final step which will redirect you to dynamic macro
            """
    else:
        result = False
        res = """
        # Sorry the 3bot invited is incorrect or the referral code is incorrect
        ## So we'll send you an email with invitation soon! Stay tuned
        ### Click next
        to resetart your chatflow
        """

    res = j.tools.jinja2.template_render(text=j.core.text.strip(res), **locals())
    bot.md_show(res)
    gevent.sleep(1)
    if not result:
        bot.redirect("/chat/session/community_join")
    bot.redirect("/community/wiki")
