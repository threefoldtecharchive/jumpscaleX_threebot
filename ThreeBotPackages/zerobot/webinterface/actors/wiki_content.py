from Jumpscale import j


class wiki_content(j.baseclasses.threebot_actor):
    @j.baseclasses.actor_method
    def reload(self, wiki_name, user_session, schema_out):
        """
        :param name: name of the wiki to reload

        ```in
        wiki_name = (S)
        ```
        """
        j.tools.markdowndocs.reload(wiki_name)

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

        queues = ["content_wiki_load"]
        job = j.servers.myjobs.schedule(
            load_wiki, return_queues=queues, wiki_name=wiki_name, wiki_path=wiki_url, reset=reset
        )
        j.servers.myjobs.wait_queues(queue_names=queues, size=len([job.id]))
