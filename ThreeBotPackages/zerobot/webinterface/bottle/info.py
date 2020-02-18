from bottle import Bottle, abort, post, request, response, run
from Jumpscale import j
from Jumpscale.servers.gedis_http.GedisHTTPFactory import enable_cors
from .rooter import env, app


@app.route("/info", method=["get"])
def get_authors_info():
    authors = j.threebot.packages.__dict__.keys()
    return env.get_template("info/authors_info.html").render(authors=authors)


@app.route("/<author_name>/info", method=["get"])
def get_author_packages_info(author_name):
    packages = getattr(j.threebot.packages, author_name).__dict__
    packages_names = filter(lambda x: not x.startswith("www_"), packages)
    websites_names = filter(lambda x: x.startswith("www_"), packages)
    return env.get_template("info/author_packages_info.html").render(
        packages_names=packages_names, author_name=author_name, websites_names=websites_names
    )


@app.route("/<author_name>/<package_name>/info", method=["get"])
def get_all_info(author_name, package_name):
    package = j.threebot.package_get(author_name, package_name)
    return env.get_template("info/package_info.html").render(package=package)
