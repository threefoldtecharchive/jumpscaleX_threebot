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

    # TODO: change it to get email not user_name after fixing outh
    user_email = bot.user_info()
    gedis_client = j.clients.gedis.get(port=8901)
    invited = gedis_client.actors.community_manager.check_referral(
        email=user_email, referral=bot.kwargs.get("referral")
    )

    bot.single_choice(
        "Welcome to our ThreeFold World! Our dream is a complemetary responsible Internet, everywhere and owned by everyone, \n without borders \
    nor geographical discrimination. We envision a future where all humans are given an equal opportunity \
    to partake, learn, and succeed.",
        ["YES! Count me in!!!"],
    )

    if invited:
        interests = bot.multi_choice(
            "Choose your interests: ", ["TF Tokens", "ThreeFold Foundation", "Veda-egypt", "BetterToken"]
        )
        res = """
        # You will join {{interests}}: 
        - Email : {{user_email}} 
        ### Click next 
        for the final step which will redirect you to threefold.me
        """
    else:
        bot.single_choice("We'll send you an email with invitation soon! Stay tuned", ["OK"])
        res = """
        # You will join {{interests}}: 
        - Email : {{user_email}} 
        ### Click next 
        for the final step which will redirect you to threefold.me
        """

    res = j.tools.jinja2.template_render(text=j.core.text.strip(res), **locals())
    bot.md_show(res)

    bot.redirect("/dynamic_wiki")
