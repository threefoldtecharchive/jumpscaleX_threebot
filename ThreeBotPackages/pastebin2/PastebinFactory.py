from Jumpscale import j


class PastebinFactory(j.baseclasses.object, j.baseclasses.testtools):

    __jslocation__ = "j.threebot.package.pastebin2"

    def install(self):
        server = j.servers.threebot.default
        server.save()

        package = j.tools.threebot_packages.get("pastebin2", path=self._dirpath, threebot_server_name=server.name)
        # package.prepare()
        package.save()
        self._log_info("pastebin loaded")

        return "OK"

    def start(self):
        self.install()
        server = j.servers.threebot.default
        # self._export_pastebin_app()
        self._start_pastebin_server()
        server.start(web=True, ssl=False)

    def _start_pastebin_server(self, reset=True):
        s = j.servers.startupcmd.get("pastebin")
        s.cmd_start = f"""
        cd {self._dirpath}/pastebin
        export DEV=1
        npm run dev
        """
        s.executor = "tmux"
        s.interpreter = "bash"
        s.timeout = 10
        s.ports = [3000]

        s.start(reset=reset)

    def _export_pastebin_app(self, reset=True):
        cmd = f"""
        cd {self._dirpath}/pastebin
        npm run export
        """
        j.sal.process.execute(cmd)

    def test(self, name=""):
        pass
