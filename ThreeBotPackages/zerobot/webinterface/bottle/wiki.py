from bottle import Bottle, abort, post, request, response, run, redirect
from Jumpscale import j
from JumpscaleLibs.tools.markdowndocs.Doc import Doc
from JumpscaleLibs.tools.markdowndocs.DocSite import DocSite
from Jumpscale.servers.gedis_http.GedisHTTPFactory import enable_cors
from .rooter import env, app, get_ws_url
import mimetypes
import traceback


def get_metadata(docsite):
    try:
        with open(f"/docsites/{docsite}/.data") as f:
            return f.read()
    except FileNotFoundError:
        return "{}"


@app.route("/<threebot_name>/<package_name>/wiki", method=["get"])
def gedis_http_wiki(threebot_name, package_name):
    try:
        package = j.tools.threebot_packages.get(name=f"{threebot_name}.{package_name}")
    except j.exceptions.NotFound:
        print("Couldn't")
        abort(404)
    wiki_names = package.wiki_names
    return env.get_template("wiki/home.html").render(
        wiki_names=wiki_names, threebot_name=threebot_name, package_name=package_name
    )


@app.route("/<threebot_name>/<package_name>/wiki/<wiki_name>", method=["get"])
def gedis_http_wiki(threebot_name, package_name, wiki_name):
    try:
        package = j.tools.threebot_packages.get(name=f"{threebot_name}.{package_name}")
    except j.exceptions.NotFound:
        print("Couldn't")
        abort(404)
    docsite_path = j.sal.fs.joinPaths("/docsites", wiki_name)
    if not j.sal.bcdbfs.exists(docsite_path):
        return abort(404)

    ws_url = get_ws_url()
    return env.get_template("wiki/wiki/index.html").render(name=wiki_name, metadata=get_metadata(wiki_name), url=ws_url)


@app.route("/wiki/gdrive/<doc_type>/<guid1>")
@app.route("/wiki/gdrive/<doc_type>/<guid1>/<guid2>")
def gdrive_handler(doc_type, guid1, guid2=""):
    cl = j.clients.gedis.get("wiki_gdrive_client", port=8901)
    try:
        ret = cl.actors.gdrive.file_get(doc_type, guid1, guid2)
        if not ret.error_code:
            return redirect(ret.res)
        return env.get_template("wiki/gdrive_error.html").render(code=ret.error_code, message=ret.error_message)
    except j.exceptions.Base as ex:
        err = "".join(traceback.format_exception(etype=type(ex), value=ex, tb=ex.__traceback__))
        response.status = 400
        result = {"error": err}
        result = j.data.serializers.json.dumps(result)
        return result


def get_document(docsite_name, relative_path):
    """get the source document of relative_path inside a docsite

    This source document will be inside the repository directory,
    and not the processed output at /docsites (bcdbfs)

    :param docsite_name: docsite name
    :type docsite_name: str
    :param relative_path: relative path inside this docsite e.g. /terms/conditions.md
    :type relative_path: str
    :return: a document object
    :rtype: Doc
    """
    try:
        docsite = DocSite.get_from_name(docsite_name)
    except j.exceptions.Base:
        return

    full_path = j.sal.fs.joinPaths(docsite.path, relative_path)
    parent_dir = j.sal.fs.getDirName(full_path)
    requested_filename = docsite._clean(j.sal.fs.getBaseName(full_path))

    # as we only have the name of the output document, we will do a search
    # for a possible match in filenames of the same parent directory
    for doc_path in j.sal.fs.listFilesInDir(parent_dir):
        doc_filename = docsite._clean(j.sal.fs.getBaseName(doc_path))
        if doc_filename == requested_filename:
            return Doc(path=doc_path, name=doc_filename.rstrip(".md"), docsite=docsite)


@app.route("/docsites/<name>/<path:re:.+>")
@enable_cors
def docsite_handler(name, path):
    docsite_path = j.sal.fs.joinPaths("/docsites", name)
    full_path = j.sal.fs.joinPaths(docsite_path, path)

    if not j.sal.bcdbfs.exists(docsite_path):
        return abort(404)

    try:
        content = j.sal.bcdbfs.file_read(full_path)
    except j.exceptions.NotFound:
        return abort(404)

    if j.sal.fs.getFileExtension(full_path).lower() == "md":
        # try to reload, but get original doc object first
        doc = get_document(name, path)
        if doc:
            # reload only in case it has dynamic_content or an error
            if "!!!dynamic_content" in doc.markdown_source.lower() or "error in" in content.decode().lower():
                doc.write()
                content = doc.markdown

    response.headers["Content-Type"] = mimetypes.guess_type(path)[0]
    return content
