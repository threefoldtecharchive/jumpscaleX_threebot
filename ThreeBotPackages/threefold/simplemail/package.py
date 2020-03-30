from Jumpscale import j


class Package(j.baseclasses.threebot_package):
    def start(self):
        # start local mail server
        server = j.servers.simplemail.get("default", address="0.0.0.0", port=25)
        server.start()

    def stop(self):
        server = j.servers.simplemail.get("default", address="0.0.0.0", port=25)
        server.stop()
