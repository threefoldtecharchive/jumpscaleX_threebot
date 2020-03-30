from Jumpscale import j

from .auth import is_admin, bot_app
from .rooter import abort, request, response, env, app, get_ws_url, package_route, PACKAGE_BASE_URL


CHAT_HOME_URL = f"{PACKAGE_BASE_URL}/chat"
CHAT_URL = f"{CHAT_HOME_URL}/<chat_name>"
# for now, we should add this as e.g. a config to packages
ADMIN_ONLY_PACKAGES = ["tfgrid_solutions"]


@app.get(CHAT_HOME_URL)
@package_route
def chat_home(package):
    data = [(chatflow, chatflow.capitalize().replace("_", " ")) for chatflow in package.chat_names]
    return env.get_template("chat/home.html").render(
        chatflows=data, threebot_name=package.source.threebot, package_name=package.source.name
    )


@app.get(CHAT_URL)
@bot_app.login_required
@package_route
def chat_handler(package, chat_name):
    session = request.environ.get("beaker.session", {})
    username = session.get("username", "")
    query = dict(**request.query)  # converts from FormDict to dict
    session["kwargs"] = j.data.serializers.json.dumps(query)

    chat_name = chat_name.strip().lower()

    chat_found = False
    for package_chat_name in package.chat_names:
        if chat_name in package_chat_name.strip().lower():
            chat_found = True
            break

    if not chat_found:
        response.status = 404
        error = f"Specified chatflow '{chat_name}' is not registered on the system"
        return env.get_template("chat/error.html").render(package=package, error=error, email=session.get("email", ""))

    ws_url = get_ws_url()
    return env.get_template("chat/index.html").render(
        topic=chat_name,
        url=ws_url,
        username=username,
        email=session.get("email", ""),
        qs=session.get("kwargs", ""),
        noheader=query.get("noheader", False),
    )
