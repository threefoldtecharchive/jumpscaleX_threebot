import mimetypes

from Jumpscale import j
from Jumpscale.clients.peewee.peewee import OperationalError

from . import auth
from .rooter import app, abort, enable_cors, package_route, response, request, PACKAGE_BASE_URL


MODEL_URL = f"{PACKAGE_BASE_URL}/model/<model_url>"
RECORD_URL = f"{MODEL_URL}/<record_id>"


class BaseError(j.exceptions.Base):
    """a generic base error for bcdb rest, with status code"""

    def __init__(self, status, *args, **kwargs):
        super().__init__(*args, *kwargs)
        self.status = status


class ModelNotFound(BaseError):
    pass


class InvalidRecordId(BaseError):
    pass


class RecordNotFound(BaseError):
    pass


class NoDataGiven(BaseError):
    pass


class InvalidData(BaseError):
    pass


class FieldIsNotIndexed(BaseError):
    pass


def format_error(error):
    """"formats an error as json

    :param error: error object
    :type error: j.exceptions.Base or BaseError
    :return: json formatted error with status, type and message fields
    :rtype: str
    """
    if isinstance(error, BaseError):
        status = error.status
    else:
        status = 400

    error_type = j.core.text.convert_to_snake_case(error.__class__.__name__)
    data = {"status": status, "type": error_type, "message": error.message}

    response.status = status
    response.content_type = "application/json"
    return j.data.serializers.json.dumps(data)


def get_model(package, model_url):
    """a helper method to get a model from a package

    :param package: package object
    :type package: ThreeBotPackage
    :param model_url: full model url
    :type model_url: str
    :raises j.exceptions.NotFound: if model cannot be found
    :return: model object
    :rtype: BCDBModel
    """
    try:
        model = package.bcdb.model_get(url=model_url)
    except j.exceptions.Input:
        raise ModelNotFound(404, f"model of {model_url} cannot be found")

    return model


def model_route(handler):
    """a decorator for any model related routes

    it can decorate handlers which takes threebot_name and package_name
    then, pass the model only.

    if package cannot be found, it will abort with 404.

    in case of any BaseError raised, it will return a json
    body with the correct status and message

    :param handler: handler function
    :type handler: function
    :return: decorated function
    :rtype: function
    """

    @auth.admin_only
    @package_route
    def inner(*args, **kwargs):
        package = kwargs.pop("package")
        model_url = kwargs.pop("model_url")

        try:
            kwargs["model"] = get_model(package, model_url)
            return handler(*args, **kwargs)
        except j.exceptions.Base as error:
            return format_error(error)

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
            raise InvalidRecordId(400, "invalid record id")

        try:
            record = model.get(record_id)
        except j.exceptions.NotFound as ex:
            raise RecordNotFound(404, ex.message)

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

    try:
        records = model.find(**request.query)
    except OperationalError as ex:
        raise FieldIsNotIndexed(400, f"some fields are not indexed, {ex}")

    response.headers["Content-Type"] = "application/json"
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
        raise NoDataGiven(400, "no data was given")

    record = model.new(data=data)
    record.save()

    if not record.id:
        raise InvalidData(400, "could not create the record, please check your data")

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
        raise NoDataGiven(400, "no data was given")

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
