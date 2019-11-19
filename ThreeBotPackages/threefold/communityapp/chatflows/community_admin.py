from Jumpscale import j
import gevent


def chat(bot):
    """
    to call http://localhost/chat/session/community_admin
    """
    # simple chatflow
    res = {}
    html = bot.html_show("community")
    bot.md_show_update(html.format(100, "community"))

    user_info = bot.user_info()
    user_name = user_info["username"]
    user_email = user_info["email"]  # still being added to the oauth user info
    gedis_client = j.clients.gedis.get(port=8901)

    gedis_client.actors.community_manager.set_current_user(user=user_email)

    choice = bot.single_choice(
        f"""
        <h3>Welcome to ThreeFold Connect</h3> <br/>
        Hi there! <br/>
        You're about to enter to a new digital world, where your data will be only yours.
        The connect process will allow us to better understand you and tailor our future connect services. <br/>
        Looking forward to build the conscious internet together.<br/>
        The ThreeFold Team <br/><br/>
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
                # Sorry you can't joined to those spaces because:
                - we have problem in FFP server
                ### Click next
                to try again
                """
        else:
            res = f"""
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

    res = j.tools.jinja2.template_render(text=j.core.text.strip(res), **locals())
    bot.md_show(res)
    gevent.sleep(1)
    if not result:
        bot.redirect("/chat/session/community_join")
    bot.redirect("/community/wiki")
