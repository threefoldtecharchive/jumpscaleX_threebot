from bottle import route, run, error, template, abort
from random import randint
import random
import redis
import json
from bottle import hook, request, response
from bottle import post, get, put, delete
import bottle
import base64

#  configuration information
redis_host = "localhost"
redis_port = 6379
redis_password = ""

# the decorator
def enable_cors(fn):
    def _enable_cors(*args, **kwargs):
        # set CORS headers
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'
        response.headers['Access-Control-Allow-Credentials'] = 'true'

        if bottle.request.method != 'OPTIONS':
            # actual request; reply with the actual response
            return fn(*args, **kwargs)

    return _enable_cors


app = bottle.app()


@app.route('/api/code/add-highlighted-code', method=['OPTIONS', 'GET', 'POST'])
@enable_cors
def add_Highlighted_code():
    """
    Add the highlighted code to the Redis database
    """
    if request.method == "POST":
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Content-type'] = 'application/json'
        
    data = request.json['code']
    encodedData = stringToBase64(data)
    generatedVal = str(generate_random_no())
    # add to redis data base
    add_highlighted_code(radndomNo=generatedVal,
                         data=encodedData)
    return generatedVal


@app.route('/api/code/get-shared-code/<codeId>', method=['OPTIONS', 'GET', 'POST'])
@enable_cors
def get_shared_code(codeId):
    r = redis.StrictRedis(host=redis_host, port=redis_port,
                          password=redis_password, decode_responses=True)
    if r.get(codeId) is not None:
        print("redis response")
        print(r.get(codeId))
        originalCode = base64ToString(r.get(codeId))
        print("orginal code")
        print(originalCode)
        return {"code": originalCode}
    else:
        response.status = 404
        # raise an 404 error
        abort(404, 'object already exists with that name')


# Handle the 404 error response
@error(404)
def error404(error):
    return template('views/404.tpl', e=response.status_code)


def stringToBase64(s):
    return base64.b64encode(s.encode('utf-8'))


def base64ToString(b):
    return base64.b64decode(b).decode('utf-8')


def generate_random_no():

    random.seed(a=None)
    return randint(0, 1000000)  # randint is inclusive at both ends


def add_highlighted_code(radndomNo, data):
    try:

        # The decode_repsonses flag here directs the client to convert the responses from Redis into Python strings
        # using the default encoding utf-8.  This is client specific.
        r = redis.StrictRedis(host=redis_host, port=redis_port,
                              password=redis_password, decode_responses=True)

        # step 4: Set the data in Redis
        r.set(radndomNo, data)
        print("form redis" + r.get(radndomNo))

        # step 5: Retrieve the data message from Redis
    except Exception as e:
        print(e)


run(host='localhost', port=8080, debug=True)
