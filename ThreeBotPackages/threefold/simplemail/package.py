from Jumpscale import j


class Package(j.baseclasses.threebot_package):
    def install(self):
        j.builders.runtimes.python3.pip_package_install("logbook")

    def start(self):
        # start local mail server
        server = j.servers.simplemail.get("default", address="0.0.0.0", port=25)
        server.start()

    def stop(self):
        server = j.servers.simplemail.get("default", address="0.0.0.0", port=25)
        server.stop()
