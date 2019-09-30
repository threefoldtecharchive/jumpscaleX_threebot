from Jumpscale import j


class AlertaFactory(j.baseclasses.object, j.baseclasses.testtools):

    __jslocation__ = "j.threebot.package.alerta"

    def install(self):
        server = j.servers.threebot.default
        server.save()

        package = j.tools.threebot_packages.get("alerta", path=self._dirpath, threebot_server_name=server.name)
        package.prepare()
        package.save()
        self._log_info("Alerta loaded")

        return "OK"

    def _start_sapper_server(self, reset=True):
        s = j.servers.startupcmd.get("alerta_sapper")
        s.cmd_start = f"""
        cd {self._dirpath}/alerta
        export DEV=1
        npm run dev
        """
        s.executor = "tmux"
        s.interpreter = "bash"
        s.timeout = 10
        s.ports = [3000]

        s.start(reset=reset)

    def start(self):
        self.install()
        server = j.servers.threebot.default
        self._start_sapper_server()
        server.start(web=True, ssl=False)

    def test(self, name=""):
        pass
