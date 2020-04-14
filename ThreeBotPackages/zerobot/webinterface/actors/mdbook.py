from Jumpscale import j


class mdbook(j.baseclasses.threebot_actor):
    @j.baseclasses.actor_method
    def reload(self, package_name, user_session=None, pull=False, schema_out=None):
        """
        :param name: name of the wiki to reload

        ```in
        package_name = (S)
        ```
        """
        if j.tools.threebot_packages.exists(package_name):
            package = j.tools.threebot_packages.get(package_name)
            j.tools.mdbook.load(package_name, j.sal.fs.joinPaths(package.path, "wiki"))


    @j.baseclasses.actor_method
    def books_list(self, user_session=None, schema_out=None):
        """
        ```out
        books = L(S)
        ```
        """
        return j.data.serializers.json.dumps([{'name':book} for book in j.tools.mdbook.list_books()])
