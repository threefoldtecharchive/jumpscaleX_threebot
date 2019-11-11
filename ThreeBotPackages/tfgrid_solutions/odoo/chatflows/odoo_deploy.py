from Jumpscale import j
import gevent


def chat(bot):
    """
    to call http://localhost:5050/chat/session/odoo_deploy
    """

    USER = "odoo"
    HOST_IP = ""  # IP or domain

    load_html = """\
# Loading odoo...
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
    # Odoo has been deployed successfully:
    """
    bot.md_show(res)
    bot.redirect("https://threefold.me")
