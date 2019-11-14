from Jumpscale import j


def chat(bot):
    """
    to call http://localhost:5050/chat/session/wordpress_deploy
    """

    # all the required data related to the database so they will be static

    bot.loading_show("wordpress", 5)

    bot.loading_show("wordpress", 5)
    MYSQL_ROOT_PASSWORD = "wordpress"
    MYSQL_DATABASE = "wordpress"
    MYSQL_USER = "wordpress"
    MYSQL_PASSWORD = "wordpress"

    WORDPRESS_DB_HOST = "localhost:3306"
    WORDPRESS_DB_USER = "wordpress"
    WORDPRESS_DB_PASSWORD = "wordpress"
    WORDPRESS_DB_NAME = "wordpress"

    bot.md_show("Flist to be added to be able to deploy!!!")

    res = f"""# Wordpress has been deployed successfully:
    """
    bot.md_show(res)
    bot.redirect("https://threefold.me")
