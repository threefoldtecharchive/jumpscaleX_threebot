from Jumpscale import j


class Package(j.baseclasses.threebot_package):
    def prepare(self):
        """
        is called at install time
        :return:
        """
        j.servers.myjobs.workers_tmux_start()

    def start(self):
        server = self.openresty
        server.install(reset=False)
        server.configure()
