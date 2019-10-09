from Jumpscale import j


def main(self):

    cl = self.client
    l = cl.actors.package_manager.packages_list()
    # l2 = cl.actors.package_manager.packages_get()

    j.shell()

    return "OK"
