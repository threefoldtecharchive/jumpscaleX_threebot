from Jumpscale import j


class content_wiki(j.baseclasses.threebot_actor):
    def reload(self, wiki_name, user_session):
        """
        :param name: name of the wiki to reload

        ```in
        wiki_name = (S)
        ```
        """
        j.tools.markdowndocs.reload(wiki_name)

    def load(self, wiki_name, wiki_url, pull, download, user_session):
        """
        ```in
        wiki_name = (S)
        wiki_url = (S)
        pull = false (B)
        download = false (B)
        ```
        """

        def load_wiki(wiki_name, wiki_url, pull=False, download=False):
            wiki = j.tools.markdowndocs.load(path=wiki_url, name=wiki_name, pull=pull, download=download)
            wiki.write()

        job = j.servers.myjobs.schedule(load_wiki, wiki_name=wiki_name, wiki_url=wiki_url, pull=pull, download=download)
        job.wait()

