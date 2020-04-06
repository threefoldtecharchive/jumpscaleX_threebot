from Jumpscale import j

from .rooter import abort, env, app, package_route, redirect, static_file, PACKAGE_BASE_URL


@app.get("/wiki")
def list_all_wikis():
    return env.get_template("wiki/home.html").render(wiki_names=j.tools.mdbook.list_books())


@app.get(f"{PACKAGE_BASE_URL}/wiki")
@package_route
def list_package_wikis(package):
    return env.get_template("wiki/home.html").render(wiki_names=package.wiki_names)


@app.route("/<threebot_name>/<package_name>/wiki/<wiki_name>", method=["get"])
def wiki_by_name(wiki_name=None, threebot_name=None, package_name=None):
    path = j.tools.mdbook.get_book_path(wiki_name)
    if not j.sal.fs.exists(path):
        err = f"""
        couldn't load wiki {wiki_name}, not found in {j.tools.mdbook.output_path}
        Try to reload the wiki and try again"""
        return abort(404, err)

    redirect(f"/wiki/{wiki_name}")


@app.route("/wiki/<wiki_name>", method=["get"])
def wiki_redirect(wiki_name=None):
    redirect(f"/mdbook/{wiki_name}")
