import json
from Jumpscale import j


class package_manager(j.baseclasses.threebot_actor):
    def _init(self, **kwargs):
        assert self.package.gedis_server
        self._gedis_server = self.package.gedis_server
        j.data.schema.get_from_text(j.tools.threebot_packages._model.schema.text)

    @j.baseclasses.actor_method
    def package_add(
        self,
        git_url=None,
        path=None,
        reload=True,
        install=True,
        start=True,
        schema_out=None,
        user_session=None,
        install_kwargs=None,
    ):
        """
        ```in
        git_url = ""
        path = ""
        reload = true (B)
        install = true (B)
        start = true (B)
        install_kwargs= (dict)

        ```
        can use a git_url or a path
        path needs to exist on the threebot server
        the git_url will get the code on the server (package source code) if its not there yet
        it will not update if its already there

        """
        user_session.admin_check()  # means will give error when not an admin user

        if git_url and path:
            raise j.exceptions.Input("add can only be done by git_url or name but not both")

        assert j.threebot.servers.core

        if git_url:
            p = git_url
        else:
            p = path

        p = j.core.tools.text_replace(p)

        def getfullname(p):
            tomlpath = j.sal.fs.joinPaths(j.clients.git.getContentPathFromURLorPath(p), "package.toml")
            # path = j.clients.git.getContentPathFromURLorPath(p)
            # name_from_path = j.sal.fs.getBaseName(path).lower().strip()

            if j.sal.fs.exists(tomlpath):
                meta = j.data.serializers.toml.load(tomlpath)
                source = meta.get("source", {})
                threebot = source.get("threebot")
                name = source.get("name")
                return f"{threebot}.{name}"
            else:
                raise j.exceptions.Input("could not find :%s" % tomlpath)

        name = getfullname(p)
        package = None
        if git_url:
            package = j.tools.threebot_packages.get(name=name, giturl=git_url)
        elif path:
            package = j.tools.threebot_packages.get(name=name, path=path)
        else:
            raise j.exceptions.Input("need to have git_url or path to package")

        j.threebot.servers.core._package_add(package)

        assert j.tools.threebot_packages.exists(name=package.name)

        if install or reload:
            package.install(install_kwargs=install_kwargs)
        package.reload(reset=reload)
        if not install:
            package.status = "toinstall"
        if start:
            package.start()

        j.servers.threebot.default.openresty_server.reload()

        return "OK"

    @j.baseclasses.actor_method
    def package_delete(self, name, schema_out=None, user_session=None):
        """
        ```in
        name = ""
        ```
        remove this package from the threebot
        will call package.uninstall()

        """
        user_session.admin_check()
        if not j.tools.threebot_packages.exists(name):
            return

        package = j.tools.threebot_packages.get(name)
        package.uninstall()
        package.delete()

    @j.baseclasses.actor_method
    def package_stop(self, name, schema_out=None, user_session=None):
        """
        ```in
        name = ""
        ```
        stop a package, which means will call package.stop()
        """
        user_session.admin_check()
        if not j.tools.threebot_packages.exists(name):
            raise j.exceptions.NotFound("package not found", data={"name": name})

        package = j.tools.threebot_packages.get(name)
        package.stop()

    @j.baseclasses.actor_method
    def package_start(self, name, schema_out=None, user_session=None):
        """
        ```in
        name = ""
        ```
        """
        user_session.admin_check()
        if not j.tools.threebot_packages.exists(name):
            raise j.exceptions.NotFound("package not found", data={"name": name})

        package = j.tools.threebot_packages.get(name)
        package.start()

    @j.baseclasses.actor_method
    def package_disable(self, name, schema_out=None, user_session=None):
        """
        ```in
        name = ""
        ```
        """
        user_session.admin_check()
        if not j.tools.threebot_packages.exists(name):
            raise j.exceptions.NotFound("package not found", data={"name": name})

        package = j.tools.threebot_packages.get(name)
        package.disable()

    @j.baseclasses.actor_method
    def package_enable(self, name, schema_out=None, user_session=None):
        """
        ```in
        name = ""
        ```
        """
        user_session.admin_check()
        if not j.tools.threebot_packages.exists(name):
            raise j.exceptions.NotFound("package not found", data={"name": name})

        package = j.tools.threebot_packages.get(name)
        package.enable()

    @j.baseclasses.actor_method
    def packages_list(self, status="all", frontend=False, schema_out=None, user_session=None):
        """
        ```in
        status = "all,init,config,toinstall,installed,tostart,disabled,error" (E)
        frontend = (B) false  # list only frontend packages
        ```

        ```out
        packages = (LO) !jumpscale.threebot.package.1
        ```
        """
        packages = []
        for package in j.tools.threebot_packages.find():
            if frontend:
                mdp = j.sal.fs.joinPaths(package.path, "package.toml")
                if j.sal.fs.exists(mdp):
                    metadata = j.data.serializers.toml.loads(j.sal.fs.readFile(mdp))
                    if not metadata["source"].get("frontend", False):
                        continue
                else:
                    continue

            if status != "all":
                if not package.status == status:
                    continue

            packages.append(package)

        out = schema_out.new()
        out.packages = packages
        return out

    @j.baseclasses.actor_method
    def actors_list(self, package_name=None, schema_out=None, user_session=None):
        """
        if not packagename then all
        only lists the one which are installed

        ```in
        package_name = (S)
        ```

        ```out
        packages = (LO) !zerobot.packagemanager.packagedef.1

        @url = zerobot.packagemanager.packagedef.1
        package_name = ""
        actor_names = [] (LS)
        ```
        """

        def do(r, package):
            if package.status not in ["installed"]:
                package.install()
            pdef = r.packages.new()
            pdef.package_name = package.name
            actor_names = list(package.actors.keys())
            pdef.actor_names = actor_names
            return r

        r = schema_out.new()
        if package_name:
            package = j.tools.threebot_packages.get(name=package_name)
            r = do(r, package)
        else:
            for package in j.tools.threebot_packages.find():
                r = do(r, package)
        return r

    @j.baseclasses.actor_method
    def model_urls_list(self, package_name=None, schema_out=None, user_session=None):
        """
        if not packagename then all
        only lists the one which are installed

        ```in
        package_name = (S)
        ```

        ```out
        packages = (LO) !zerobot.packagemanager.packagedefmodel.1

        @url = zerobot.packagemanager.packagedefmodel.1
        package_name = ""
        bcdb_name = ""
        urls = [] (LS)
        ```
        """

        def do(r, package):
            if package.status not in ["installed"]:
                package.install()
            pdef = r.packages.new()
            pdef.package_name = package.name
            pdef.bcdb_name = package.bcdb.name
            for m in package.models.values():
                if m.schema.url not in pdef.urls:
                    pdef.urls.append(m.schema.url)
            return r

        r = schema_out.new()
        if package_name:
            package = j.tools.threebot_packages.get(name=package_name)
            r = do(r, package)
        else:
            for package in j.tools.threebot_packages.find():
                r = do(r, package)
        return r

    @j.baseclasses.actor_method
    def package_reload(self, package_name=None, reset=False, schema_out=None, user_session=None):
        """
        if not packagename then all
        only reload the ones which are installed

        ```in
        package_name = (S)
        reset = False (B)
        ```
        """

        def do(package):
            package.reload(reset=reset)

        if package_name:
            package = j.tools.threebot_packages.get(name=package_name)
            do(package)
        else:
            for package in j.tools.threebot_packages.find():
                do(package)
