from Jumpscale import j
import gevent


def chat(bot):
    """
    to call http://localhost:5050/chat/session/community_join
    """
    html = """\
# Loading communits...
 <div class="progress">
  <div class="progress-bar active" role="progressbar" aria-valuenow="{0}"
  aria-valuemin="0" aria-valuemax="100" style="width:{0}%">
    {0}%
  </div>
</div> 
"""

    # simple chatflow
    res = {}
    for x in range(10):
        bot.md_show_update(html.format(x * 10))
        gevent.sleep(1)
    invite = bot.single_choice("Choose you have invitaion code ", ["Yes", "No"])
    if invite == "No":
        email = bot.string_ask("Email address")
        interest = bot.string_ask("reason for interest")
        someone = bot.string_ask("if you know someone in threefold or if someone referred you")

    res = """
    # You will join {{interest}}: 
    - Email : {{email}} 
    ### Click next 
    for the final step which will redirect you to threefold.me
    """
    res = j.tools.jinja2.template_render(text=j.core.text.strip(res), **locals())
    bot.md_show(res)
    bot.redirect("https://threefold.me")
