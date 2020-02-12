from Jumpscale import j


class wiki_content(j.baseclasses.threebot_actor):
    def _schedule(self, method, **kwargs):
        job = j.servers.myjobs.schedule(method, **kwargs)
        j.servers.myjobs.wait([job.id])

    @j.baseclasses.actor_method
    def reload(self, wiki_name, user_session, schema_out):
        """
        :param name: name of the wiki to reload

        ```in
        wiki_name = (S)
        ```
        """
        from Jumpscale.tools.threegit.ThreeGit import reload_wiki

        self._schedule(reload_wiki, wiki_name=wiki_name, reset=False)

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
