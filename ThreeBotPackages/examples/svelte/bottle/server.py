import json
import random

from bottle import run, template, request, Bottle, abort, static_file, route, run

app = Bottle()

persons = {}
MAX_PER = 10


@app.route("/hello")
def index():
    return "<b>Hello World!</b>!"


@app.route("/websocket")
def handle_websocket():
    wsock = request.environ.get("wsgi.websocket")
    if not wsock:
        abort(400, "Expected WebSocket request.")

    while True:
        try:
            message = wsock.receive()
            if not message:
                continue

            command, args = message.split(":", 1)

            if args:
                args = json.loads(args)

            if command == "set":
                p_id = random.randint(0, MAX_PER)
                persons[p_id] = args
                result = {"id": p_id}
            elif command == "get":
                p_id = args["id"]
                result = persons[p_id]

            wsock.send(json.dumps(result))
        except WebSocketError:
            break


@app.route("/test_websocket")
def test():
    host = request.get_header("host")
    t = (
        """
    <html>
    <head>
        <script>
        let socket = new WebSocket("ws://%s/websocket");

socket.onopen = function(e) {
  alert("[open] Connection established");
  alert("Sending to server");
  socket.send("My name is John");
};

socket.onmessage = function(event) {
  alert(`[message] Data received from server: ${event.data}`);
};

socket.onclose = function(event) {
  if (event.wasClean) {
    alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
  } else {
    // e.g. server process killed or network down
    // event.code is usually 1006 in this case
    alert('[close] Connection died');
  }
};

socket.onerror = function(error) {
  alert(`[error] ${error.message}`);
};
        </script>
     </head>
    </html>

    """
        % host
    )
    return template(t)
