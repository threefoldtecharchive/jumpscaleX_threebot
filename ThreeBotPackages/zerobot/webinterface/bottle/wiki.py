import mimetypes
import traceback

from bottle import Bottle, abort, post, request, response, run, redirect, static_file

from Jumpscale import j
from Jumpscale.tools.threegit.Doc import Doc
from Jumpscale.tools.threegit.DocSite import DocSite
from Jumpscale.servers.gedis_http.GedisHTTPFactory import enable_cors

from .rooter import env, app, get_ws_url, package_route, PACKAGE_BASE_URL


def get_metadata(docsite):
    path = j.sal.fs.joinPaths(j.tools.threegit.get_docsite_path(docsite), ".data")
    try:
        with open(path) as f:
            return f.read()
    except FileNotFoundError:
        return "{}"


@app.get("/wiki")
def list_all_wikis():
    return env.get_template("wiki/home.html").render(wiki_names=j.tools.threegit.list_names())


@app.get(f"{PACKAGE_BASE_URL}/wiki")
@package_route
def list_package_wikis(package):
    return env.get_template("wiki/home.html").render(wiki_names=package.wiki_names)


@app.route("/wiki/<wiki_name>", method=["get"])
@app.route("/<threebot_name>/<package_name>/wiki/<wiki_name>", method=["get"])
def wiki_by_name(wiki_name=None, threebot_name=None, package_name=None):
    docsite_path = j.tools.threegit.get_docsite_path(wiki_name)
    if not j.sal.fs.exists(docsite_path):
        err = f"""
        couldn't load wiki {wiki_name}, not found in {j.tools.threegit.docsites_path}
        Try to reload the wiki and try again"""
        return abort(404, err)

    ws_url = get_ws_url()
    return env.get_template("wiki/index.html").render(name=wiki_name, metadata=get_metadata(wiki_name), url=ws_url)


@app.route("/wiki/gdrive/<doc_type>/<guid1>")
@app.route("/wiki/gdrive/<doc_type>/<guid1>/<guid2>")
def gdrive_handler(doc_type, guid1, guid2=""):
    cl = j.clients.gedis.get("wiki_gdrive_client", port=8901, package_name="zerobot.webinterface")
    try:
        ret = cl.actors.wiki_gdrive_manager.file_get(doc_type, guid1, guid2)
        if not ret.error_code:
            return redirect(ret.res)
        return env.get_template("wiki/gdrive_error.html").render(code=ret.error_code, message=ret.error_message)
    except j.exceptions.Base as ex:
        err = "".join(traceback.format_exception(etype=type(ex), value=ex, tb=ex.__traceback__))
        response.status = 400
        result = {"error": err}
        result = j.data.serializers.json.dumps(result)
        return result


@app.route("/3git/wikis/<filepath:re:.+>")
@enable_cors
def threegit_handler(filepath):
    root = j.tools.threegit.docsites_path
    # first remove md file extention and check if the file exist
    if filepath.endswith(".md"):
        filepath = filepath[:-3]

    filename = j.sal.fs.joinPaths(root, filepath)
    if j.sal.fs.exists(filename):
        return static_file(filepath, root=root)

    # if the file isn't found without md extension, try to get it with md
    filepath_with_md = filename + ".md"
    if j.sal.fs.exists(filepath_with_md):
        return static_file(filepath + ".md", root=root)

    return abort(404, f"File not found with path {filename} or {filepath_with_md}")


# def get_document(docsite_name, relative_path):
#     """get the source document of relative_path inside a docsite

#     This source document will be inside the repository directory,
#     and not the processed output at j.tools.threegit.docsites_path (sal/fs)

#     :param docsite_name: docsite name
#     :type docsite_name: str
#     :param relative_path: relative path inside this docsite e.g. /terms/conditions.md
#     :type relative_path: str
#     :return: a document object
#     :rtype: Doc
#     """
#     try:
#         docsite = DocSite.get_from_name(docsite_name)
#     except j.exceptions.Base:
#         return

#     full_path = j.sal.fs.joinPaths(docsite.path, relative_path)
#     parent_dir = j.sal.fs.getDirName(full_path)
#     requested_filename = docsite._clean(j.sal.fs.getBaseName(full_path))

#     # as we only have the name of the output document, we will do a search
#     # for a possible match in filenames of the same parent directory
#     for doc_path in j.sal.fs.listFilesInDir(parent_dir):
#         doc_filename = docsite._clean(j.sal.fs.getBaseName(doc_path))
#         if doc_filename == requested_filename:
#             return Doc(path=doc_path, name=doc_filename.rstrip(".md"), docsite=docsite)


# @app.route("/docsites/<name>/<path:re:.+>")
# @enable_cors
# def docsite_handler(name, path):
#     docsite_path = j.sal.fs.joinPaths("/docsites", name)
#     full_path = j.sal.fs.joinPaths(docsite_path, path)

#     if not j.sal.fs.exists(docsite_path):
#         return abort(404)

#     try:
#         content = j.sal.fs.readFile(full_path)
#     except j.exceptions.NotFound:
#         return abort(404)

#     if j.sal.fs.getFileExtension(full_path).lower() == "md":
#         # try to reload, but get original doc object first
#         doc = get_document(name, path)
#         if doc:
#             # reload only in case it has dynamic_content or an error
#             if "!!!dynamic_content" in doc.markdown_source.lower() or "error in" in content.decode().lower():
#                 doc.write()
#                 content = doc.markdown

#     response.headers["Content-Type"] = mimetypes.guess_type(path)[0]
#     return content
