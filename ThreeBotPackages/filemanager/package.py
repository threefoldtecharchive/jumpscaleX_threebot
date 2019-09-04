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
        root = os.path.dirname(os.path.abspath(__file__))
        sys.path.append(root)

        from app import App
        rack = j.servers.rack.get()
        app = App(root=root)()
        rack.bottle_server_add(name="fileman", port=7000, app=app)

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
