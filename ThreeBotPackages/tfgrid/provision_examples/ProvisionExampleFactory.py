from Jumpscale import j
from .ubuntu_ssh import deploy_ubuntu_container
from .ubuntu_ssh_corex import deploy_ubuntu_container_corex
from .multi_nodes import deploy_multi_node_network
from .zdb import deploy_zdbs


class ProvisionExampleFactory(j.baseclasses.threebot_factory):
    __jslocation__ = "j.threebot_factories.package.provision_example"

    def ubuntu_container(self):
        deploy_ubuntu_container()

    def ubuntu_container_corex(self):
        deploy_ubuntu_container_corex()

    def multi_nodes_network(self):
        deploy_multi_node_network()

    def zdbs(self):
        deploy_zdbs()

