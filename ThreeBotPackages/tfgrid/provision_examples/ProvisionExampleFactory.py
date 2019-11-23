from Jumpscale import j
from .ubuntu_ssh import deploy_ubuntu_container
from zdb import deploy_zdbs


class ProvisionExampleFactory(j.baseclasses.threebot_factory):
    __jslocation__ = "j.threebot.package.provision_example"

    def ubuntu_container(self):
        deploy_ubuntu_container()

    def zdbs(self):