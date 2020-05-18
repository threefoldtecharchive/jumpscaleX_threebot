import json
from Jumpscale import j


class package_manager(j.baseclasses.threebot_actor):
    def _init(self, **kwargs):
        assert self.package.gedis_server
        self._gedis_server = self.package.gedis_server
        self._requiredpackages = ["zerobot.base", "zerobot.webinterface", "zerobot.admin"]
        j.data.schema.get_from_text(j.tools.threebot_packages._model.schema.text)

    def _to_schema(self, schema_out, package):
        """a helper method to return a package as schema out

        :param schema_out: schema out
        :type schema_out: schema object
        :param package: package
        :type package: ThreeBotPackage
        """
        out = schema_out.new()
        out.package = package
        return out

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

        ```out
        package = (O) !jumpscale.threebot.package.1
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
            git_url = git_url.strip()
            p = git_url
        else:
            path = path.strip()
            p = path

        p = j.core.tools.text_replace(p)

        def getfullname(p):
            tomlpath = j.sal.fs.joinPaths(j.clients.git.getContentPathFromURLorPath(p), "package.toml")
            # path = j.clients.git.getContentPathFromURLorPath(p)
            # name_from_path = j.sal.fs.getBaseName(path).lower().strip()

            if j.sal.fs.exists(tomlpath):
                meta = j.data.serializers.toml.load(tomlpath)
                source = meta.get("source", {})
                if not source:
                    raise j.exceptions.Input("invalid toml :%s" % tomlpath)
                threebot = source.get("threebot")
                if not threebot:
                    raise j.exceptions.Input("invalid toml :%s no threebot specified" % tomlpath)
                name = source.get("name")
                if not name:
                    raise j.exceptions.Input("invalid toml :%s no name specified" % tomlpath)
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
            try:
                package.start()
            except Exception as e:
                package.status = "error"
                raise e

        j.servers.threebot.default.openresty_server.reload()

        return self._to_schema(schema_out, package)

    @j.baseclasses.actor_method
    def package_delete(self, name, schema_out=None, user_session=None):
        """
        ```in
        name = ""
        ```

        ```out
        package = (O) !jumpscale.threebot.package.1
        ```
        remove this package from the threebot
        will call package.uninstall()

        """
        user_session.admin_check()
        if not j.tools.threebot_packages.exists(name):
            return

        # check if package is in requiredpackages
        if name in self._requiredpackages:
            raise j.exceptions.Input("could not delete :%s, it's required package" % name)

        package = j.tools.threebot_packages.get(name)
        package.uninstall()
        package.delete()

        return self._to_schema(schema_out, package)

    @j.baseclasses.actor_method
    def package_stop(self, name, schema_out=None, user_session=None):
        """
        ```in
        name = ""
        ```

        ```out
        package = (O) !jumpscale.threebot.package.1
        ```

        stop a package, which means will call package.stop()
        """
        user_session.admin_check()
        if not j.tools.threebot_packages.exists(name):
            raise j.exceptions.NotFound("package not found", data={"name": name})

        # check if package is in requiredpackages
        if name in self._requiredpackages:
            raise j.exceptions.Input("could not stop :%s, it's required package" % name)

        package = j.tools.threebot_packages.get(name)
        package.stop()

        return self._to_schema(schema_out, package)

    @j.baseclasses.actor_method
    def package_start(self, name, schema_out=None, user_session=None):
        """
        ```in
        name = ""
        ```

        ```out
        package = (O) !jumpscale.threebot.package.1
        ```
        """
        user_session.admin_check()
        if not j.tools.threebot_packages.exists(name):
            raise j.exceptions.NotFound("package not found", data={"name": name})

        package = j.tools.threebot_packages.get(name)
        package.start()

        return self._to_schema(schema_out, package)

    @j.baseclasses.actor_method
    def package_disable(self, name, schema_out=None, user_session=None):
        """
        ```in
        name = ""
        ```

        ```out
        package = (O) !jumpscale.threebot.package.1
        ```
        """
        user_session.admin_check()
        if not j.tools.threebot_packages.exists(name):
            raise j.exceptions.NotFound("package not found", data={"name": name})

        # check if package is in requiredpackages
        if name in self._requiredpackages:
            raise j.exceptions.Input("could not disable :%s, it's required package" % name)

        package = j.tools.threebot_packages.get(name)
        package.disable()

        return self._to_schema(schema_out, package)

    @j.baseclasses.actor_method
    def package_enable(self, name, schema_out=None, user_session=None):
        """
        ```in
        name = ""
        ```

        ```out
        package = (O) !jumpscale.threebot.package.1
        ```
        """
        user_session.admin_check()
        if not j.tools.threebot_packages.exists(name):
            raise j.exceptions.NotFound("package not found", data={"name": name})

        package = j.tools.threebot_packages.get(name)
        package.enable()
        package.start()

        return self._to_schema(schema_out, package)

    @j.baseclasses.actor_method
    def packages_list(self, status="all", frontend=False, has_frontend_args=False, schema_out=None, user_session=None):
        """
        ```in
        status = "all,init,config,toinstall,installed,tostart,disabled,error" (E)
        frontend = (B) false  # list only frontend packages
        has_frontend_args = (B) false # list only package with defined frontend args for admin menu
        ```

        ```out
        packages = (LO) !jumpscale.threebot.package.1
        ```
        """
        packages = []
        for package in j.tools.threebot_packages.find():
            if frontend or has_frontend_args:
                mdp = j.sal.fs.joinPaths(package.path, "package.toml")
                if j.sal.fs.exists(mdp):
                    metadata = j.data.serializers.toml.loads(j.sal.fs.readFile(mdp))
                    if frontend and not metadata["source"].get("frontend", False):
                        continue
                    if has_frontend_args and metadata.get("frontend_args"):
                        package.frontend_args = metadata["frontend_args"]
                    else:
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
    def packages_get_status(self, names=None, schema_out=None, user_session=None):
        """get packages status info given a list of full names

        the result will be json object with package name as a key
        and package object as a value

        :param names: list of package names, defaults to None
        :type names: list of str, optional
        :param schema_out: schema out, defaults to None
        :type schema_out: Schema, optional
        :param user_session: user session, defaults to None
        :type user_session: UserSession, optional

        ```in
        names = (LS)
        ```
        """
        packages = {}

        for name in names:
            if j.tools.threebot_packages.exists(name):
                packages[name] = j.tools.threebot_packages.get(name).status.value
            else:
                packages[name] = 0  # status: init

        return j.data.serializers.json.dumps(packages)

    @j.baseclasses.actor_method
    def actors_list(self, package_name=None, schema_out=None, user_session=None):
        """
        if not packagename then all
        only lists the one which are installed

        ```in
        package_name = (S)
        ```

        ```out
        packages = (LO) !zerobot.admin.packagedef.1

        @url = zerobot.admin.packagedef.1
        package_name = ""
        actor_names = [] (LS)
        ```
        """

        def do(r, package):
            try:
                # if package.status not in ["installed"]:
                #     package.install()
                pdef = r.packages.new()
                pdef.package_name = package.name
                actor_names = list(package.actors.keys())
                pdef.actor_names = actor_names
                if pdef.package_name:
                    return r
            except Exception as e:
                self._log_error(f"Error occured at package {package.name}: {e}")
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
        packages = (LO) !zerobot.admin.packagedefmodel.1

        @url = zerobot.admin.packagedefmodel.1
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

        ```out
        package = (O) !jumpscale.threebot.package.1
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

        return self._to_schema(schema_out, package)
