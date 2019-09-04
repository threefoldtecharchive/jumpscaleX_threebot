import sys
import os

from Jumpscale import j


class Package(j.baseclasses.threebot_package):
    def prepare(self):
        """
        is called at install time
        :return:
        """
        j.builders.runtimes.python3.pip_package_install("filetype")

    def start(self):
        """
        called when the 3bot starts
        :return:
        """
        # TODO: ADD REVERSE PROXY

        # Couldn't import file directly!
        import importlib

        root = os.path.dirname(os.path.abspath(__file__))
        spec = importlib.util.spec_from_file_location("app", os.path.join(root, "app.py"))
        app = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(app)

        rack = j.servers.rack.get()
        app = app.App(path="/", port=7001).app
        rack.bottle_server_add(name="webdav", port=7001, app=app)

    def stop(self):
        """
        called when the 3bot stops
        :return:
        """
        pass

    def uninstall(self):
        """
        called when the package is no longer needed and will be removed from the threebot
        :return:
        """
        j.builders.runtimes.python3.pip_package_uninstall("filetype")
