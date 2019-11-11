from Jumpscale import j
import gevent


def chat(bot):
    """
    to call http://localhost:5050/chat/session/taiga_deploy
    """
    # User parameters and env variables preperation to be passed to new container
    USER = "taiga"
    PORT = "4321"
    SECRET_KEY = "taiga"
    email_host = bot.string_ask("Email host:")
    email_host_user = bot.string_ask("Email host user:")
    email_host_password = bot.string_ask("Email host password:")
    HOST_IP = ""  # IP or domain

    load_html = """\
# Loading taiga...
 <div class="progress">
  <div class="progress-bar active" role="progressbar" aria-valuenow="{0}"
  aria-valuemin="0" aria-valuemax="100" style="width:{0}%">
    {0}%
  </div>
</div>
"""
    wait = 3
    for x in range(wait):
        bot.md_show_update(load_html.format((x / wait) * 100))
        gevent.sleep(1)

    res = f"""
# Taiga has been deployed successfully:
"""

    bot.md_show(res)
    bot.redirect("https://threefold.me")
