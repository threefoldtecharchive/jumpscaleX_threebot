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
    gevent.sleep(1)

    email = bot.string_ask("Email address")
    interest = bot.string_ask("reason for interest")
    someone = bot.string_ask("if you know someone in threefold or if someone referred you")
    code = bot.string_ask("your invitation code please")

    res = """
    # You will join {{interest}}: 
    - Email : {{email}} 
    ### Click next 
    for the final step which will redirect you to threefold.me
    """
    res = j.tools.jinja2.template_render(text=j.core.text.strip(res), **locals())
    bot.md_show(res)
    bot.redirect("/wiki")
