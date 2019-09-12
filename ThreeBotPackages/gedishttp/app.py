from bottle import post, run, response, request, Bottle
from Jumpscale import j

class App:
    def __init__(self):
        self.client = j.clients.gedis.get(name='main_gedis_threebot', port=8901)
        self.app = Bottle()

        @self.app.route("/actors/<name>/<cmd>", method="post")
        def client_handler(name, cmd):
            actor = getattr(self.client.actors, name, None)
            if not actor:
                response.status = 404
                return f"Actor {name} does not exist"
            command = getattr(actor, cmd, None)
            if not command:
                response.status = 400
                return f"Actor {name} does not have command {cmd}"
            data = request.json
            content_type = data.get("content_type", "json")
            if content_type not in ["json", "msgpack"]:
                response.status = 400
                return f"content_type needs to be either json or msgpack"
            response.headers['Content-Type'] = f"application/{content_type}"
            result = command(**data["args"])
            if content_type:
                result = getattr(result, f"_{content_type}", result)
            return result


   def __call__(self):
        return self.app