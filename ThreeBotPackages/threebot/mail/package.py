import sys
import os

from Jumpscale import j
from JumpscaleLibs.servers.mail.smtp import app


class Package(j.baseclasses.threebot_package):
    def start(self):
        """
        called when the 3bot starts
        :return:
        """
        # TODO: ADD REVERSE PROXY

        server = j.servers.imap.get_instance("0.0.0.0", 7002)
        self.rack_server.add(name="smtp", server=server)
        self.gedis_server.actors_add(j.sal.fs.joinPaths(self.package_root, "actors"))
