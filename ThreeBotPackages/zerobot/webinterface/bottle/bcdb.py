import mimetypes

from Jumpscale import j

from . import auth
from .rooter import app, abort, enable_cors, response, request

MODEL_URL = "/<threebot_name>/<package_name>/model/<model_url>"
RECORD_URL = f"{MODEL_URL}/<record_id>"


def get_model(package_name, model_url):
    """a helper method to get a model from a package

    :param package_name: full package name
    :type package_name: str
    :param model_url: full model url
    :type model_url: str
    :raises j.exceptions.NotFound: in case package or model cannot be found
    :return: model object
    :rtype: BCDBModel
    """
    if not j.tools.threebot_packages.exists(package_name):
        raise j.exceptions.NotFound(f"package of {package_name} cannot be found")

    package = j.tools.threebot_packages.get(name=package_name)
    try:
        model = package.bcdb.model_get(url=model_url)
    except j.exceptions.Input:
        raise j.exceptions.NotFound(f"model of {model_url} cannot be found")

    return model


def model_route(handler):
    """a decorator for any model related routes

    it can decorate handlers which takes threebot_name and package_name
    then, pass the model only.

    if the model or the package cannot be found, it will
    abort with 404 and the correct body message

    :param handler: handler function
    :type handler: function
    :return: decorated function
    :rtype: function
    """

    @auth.admin_only
    def inner(*args, **kwargs):
        threebot_name = kwargs.pop("threebot_name")
        package_name = kwargs.pop("package_name")
        model_url = kwargs.pop("model_url")
        full_name = f"{threebot_name}.{package_name}"

        try:
            kwargs["model"] = get_model(full_name, model_url)
        except j.exceptions.NotFound as ex:
            return abort(404, ex.message)

        return handler(*args, **kwargs)

    return inner


def record_route(handler):
    """
    used with model_decorator to get pass a record instead of a model

    :param handler: handler function
    :type handler: function
    :return: decorated function
    :rtype: function
    """

    @model_route
    def inner(*args, **kwargs):
        model = kwargs.pop("model")
        record_id = kwargs.pop("record_id")

        try:
            record_id = int(record_id)
        except ValueError:
            return abort(400, "invalid record id")

        try:
            record = model.get(record_id)
        except j.exceptions.NotFound as ex:
            return abort(404, ex.message)

        kwargs["record"] = record

        return handler(*args, **kwargs)

    return inner


@app.get(MODEL_URL)
@model_route
@enable_cors
def find(model):
    """handle get operation on the model

    do find with given query parameters

    :param model: model object
    :type model: str
    :return: data or corresponding error status
    :rtype: response
    """
    response.headers["Content-Type"] = "application/json"
    records = model.find(**request.query)
    return j.data.serializers.json.dumps([record._ddict for record in records])


@app.post(MODEL_URL)
@model_route
@enable_cors
def create(model):
    """handle create operation on the model

    create a new record with the given

    :param model: model object
    :type model: BCDBModel
    :return: response body as {id: <new record id>} or corresponding error status
    :rtype: response
    """
    data = request.json
    if not data:
        return abort(400, "no data was given")

    record = model.new(data=data)
    record.save()

    response.status = 201
    return j.data.serializers.json.dumps({"id": record.id})


@app.get(RECORD_URL)
@record_route
@enable_cors
def get(record):
    """handle get operation on record

    :param record: record object
    :type record: JSXObject
    :return: record as json or corresponding error status
    :rtype: response
    """
    response.headers["Content-Type"] = "application/json"
    return j.data.serializers.json.dumps(record._ddict)


@app.post(RECORD_URL)
@record_route
@enable_cors
def update(record):
    """handle post operation on record

    updates the current record with new data (given in request body)

    :param record: record object
    :type record: JSXObject
    :return: data or corresponding error status
    :rtype: response
    """
    data = request.json
    if not data:
        return abort(400, "no data was given")

    record._data_update(data)
    record.save()

    # no content here
    response.status = 204


@app.delete(RECORD_URL)
@record_route
@enable_cors
def delete(record):
    """handle post operation on record

    updates the current record with new data (given in request body)

    :param record: record object
    :type record: JSXObject
    :return: data or corresponding error status
    :rtype: response
    """
    record.delete()

    # no content here
    response.status = 204


@app.get("/bcdbfs/<url:re:.+>")
@auth.admin_only
@enable_cors
def fs(url):
    try:
        data = j.sal.bcdbfs.file_read("/" + url)
    except j.exceptions.NotFound:
        return abort(404, f"could not find the file of {url}")

    response.headers["Content-Type"] = mimetypes.guess_type(url)[0]
    return data
