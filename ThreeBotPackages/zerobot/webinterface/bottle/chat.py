from bottle import Bottle, abort, post, request, response, run
from Jumpscale import j
from .rooter import env, app, get_ws_url


@app.route("/<threebot_name>/<package_name>/chat", method=["get"])
def gedis_http_chat(threebot_name, package_name):
    try:
        package = j.tools.threebot_packages.get(name=f"{threebot_name}.{package_name}")
    except j.exceptions.NotFound:
        print(f"couldn't load chats for {threebot_name}.{package_name}")
        abort(404)

    data = [(chatflow, chatflow.capitalize().replace("_", " ")) for chatflow in package.chat_names]
    return env.get_template("chat/home.html").render(
        chatflows=data, threebot_name=threebot_name, package_name=package_name
    )


@app.route("/<threebot_name>/<package_name>/chat/<chat_name>", method=["get"])
def gedis_http_chat(threebot_name, package_name, chat_name):
    session = request.environ.get("beaker.session", {})
    try:
        package = j.tools.threebot_packages.get(name=f"{threebot_name}.{package_name}")
    except j.exceptions.NotFound:
        print(f"couldn't load chat {chat_name} for {threebot_name}.{package_name}")
        abort(404)
    query = request.urlparts.query
    if query:
        query = query.split("&")
        query_params = {}
        for q in query:
            try:
                k, v = q.split("=")
                query_params[k] = v
            except:
                query_params["referral"] = q

        session["kwargs"] = query_params
    else:
        session["kwargs"] = {}
    if chat_name not in package.chat_names:
        response.status = 404
        error = f"Specified chatflow {chat_name} is not registered on the system"
        return env.get_template("chat/error.html").render(error=error, email=session.get("email", ""))
    ws_url = get_ws_url()
    return env.get_template("chat/index.html").render(
        topic=chat_name,
        url=ws_url,
        email=session.get("email", ""),
        qs=session.get("kwargs", ""),
        username=session.get("username", ""),
    )
