import hmac
import json
import traceback

from bottle import abort, response, request, Bottle, redirect
from hashlib import sha1

from Jumpscale import j

app = Bottle()
GITHUB_TOKEN = "/sandbox/var/github_token"


@app.route("/webhook/github", method="post")
def webhook_github():
    event = request.headers.get("X-GitHub-Event")
    if event != "push":
        abort(406, f"Wrong even type: {event}")

    content_type = request.headers.get("Content-Type")
    if content_type != "application/x-www-form-urlencoded":
        abort(406, f"wrong content type header: {content_type}")

    signature = request.headers.get("X-Hub-Signature")
    if not signature:
        abort(400, "No signature header found")

    import ipdb

    ipdb.set_trace()
    token = j.sal.fs.readFile(GITHUB_TOKEN).rstrip()
    hexdigest = hmac.new(bytes(token, "utf-8"), request.body.read(), sha1).hexdigest()
    hashed_body = f"sha1={hexdigest}"

    if not hmac.compare_digest(signature, hashed_body):
        abort(401, "Invalid secret")

    payload = json.loads(request.params.payload)
    j.clients.git.pullGitRepo(payload["repository"]["ssh_url"])


class WebhooksFactory(j.baseclasses.threebot_factory):
    __jslocation__ = "j.threebot.package.webhooks"

    def get_app(self):
        return app
