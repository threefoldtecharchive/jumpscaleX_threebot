from Jumpscale import j
import gevent


def chat(bot):
    """
    to call http://localhost:5050/chat/session/gitea_deploy
    """
    # User parameters and env variables preperation to be passed to new container
    APP_NAME = bot.string_ask("Instance title:")
    ADMIN_USER = bot.string_ask("Admin username:")
    ADMIN_PASSWORD = bot.string_ask("Admin user password:")
    ADMIN_EMAIL = bot.string_ask("Admin Email:")
    POSTGRES_DB = "gitea"
    DB_TYPE = "postgres"
    DB_HOST = "localhost:5432"
    DB_USER = "postgres"
    DB_PASSWORD = "postgres"
    ROOT_URL = ""  # IP or domain

    load_html = """\
# Loading gitea...
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

    # TODO: send reservation, get container, start from flist.

    res = f"""
    # Gitea has been deployed successfully:
    """
    bot.md_show(res)
    bot.redirect("https://threefold.me")
