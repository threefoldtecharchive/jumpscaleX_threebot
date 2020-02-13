from Jumpscale import j


class wiki_content(j.baseclasses.threebot_actor):
    @j.baseclasses.actor_method
    def reload(self, wiki_name, user_session=None, schema_out=None):
        """
        :param name: name of the wiki to reload

        ```in
        wiki_name = (S)
        ```
        """
        j.sal.process.execute(f"jsx wiki-reload -n {wiki_name}", showout=False)

    @j.baseclasses.actor_method
    def load(self, wiki_name, wiki_url, reset=False, user_session=None, schema_out=None):
        """
        ```in
        wiki_name = (S)
        wiki_url = (S)
        reset = false (B)
        ```
        """
        from Jumpscale.tools.threegit.ThreeGit import load_wiki

        self._schedule(load_wiki, wiki_name=wiki_name, wiki_path=wiki_url, reset=reset)
