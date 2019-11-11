from Jumpscale import j
import gevent


def chat(bot):
    """
    to call http://localhost:5050/chat/session/wordpress_deploy
    """
    # all the required data related to the database so they will be static

    html = """\
# Loading Minecraft configuration...
 <div class="progress">
  <div class="progress-bar active" role="progressbar" aria-valuenow="{0}"
  aria-valuemin="0" aria-valuemax="100" style="width:{0}%">
    {0}%
  </div>
</div>
"""
    waittime = 5
    for x in range(waittime):
        bot.md_show_update(html.format((x / waittime) * 100))
        gevent.sleep(1)

    # j.builders.apps.wordpress.install(path, host_url, title, admin_user, admin_password, admin_email)

    res = f"""
# Minecraft has been deployed successfully:
"""
    bot.md_show(res)
    bot.redirect("https://threefold.me")
