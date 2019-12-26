from Jumpscale import j
import os


class Package(j.baseclasses.threebot_package):
    def _init(self, **kwargs):
        # CHANGE ME (default 1: development mode will serve at /location-example)
        os.environ["dev"] = "1"
        self.mylocation = "/vuejs"
        self.DEV = True

    def add_test_data(self):
        model = self.bcdb.model_get(url="jumpscale.example.vuejs")
        test_person = model.new()
        test_person.myname = "hamada"
        test_person.job = "software engineer"
        test_person.aboutme = "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        test_person.save()

    def prepare(self):
        """
        is called at install time
        :return:
        """

        ## building the html bundle should always be done on the developer machine.
        # prepare_cmd = f"""
        # cd {self.package_root}
        # pushd newproject
        # export dev={self.DEV}
        # npm install
        # npm run build
        # popd
        # cp newproject/dist/* html/ -R
        # """
        # # FIXME: https://github.com/threefoldtech/jumpscaleX_threebot/issues/175 this will crash server if no npm & starting this package.
        # j.sal.process.execute(prepare_cmd, die=False)
        self.add_test_data()

    def start(self):
        """
        called when the 3bot starts
        :return:
        """
        server = self.openresty
        server.install(reset=False)
        server.configure()

        for port in (443, 80):
            website = server.get_from_port(port)
            locations = website.locations.get(f"{self.mylocation}_locations_{port}")
            website_location = locations.locations_spa.new()
            website_location.name = self.mylocation
            if self.DEV:
                # TODO: IT'S ALWAYS DEV FOR NOW.
                website_location.path_url = self.mylocation
            else:
                website_location.path_url = "/"
            website_location.use_jumpscale_weblibs = False
            fullpath = j.sal.fs.joinPaths(self.package_root, "html/")
            website_location.path_location = fullpath
            locations.configure()
            website.configure()
