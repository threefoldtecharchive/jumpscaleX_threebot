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
