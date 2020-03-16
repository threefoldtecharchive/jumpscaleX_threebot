from Jumpscale import j

from .rooter import env, app, package_route, PACKAGE_BASE_URL


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


@app.route(f"{PACKAGE_BASE_URL}/info", method=["get"])
@package_route
def get_all_info(package):
    return env.get_template("info/package_info.html").render(package=package)
