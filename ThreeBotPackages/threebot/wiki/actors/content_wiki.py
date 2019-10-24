from Jumpscale import j


class content_wiki(j.baseclasses.threebot_actor):

    def reload(self, name, user_session):
        """
        :param name: name of the wiki to reload

        ```in
        name = (S)
        ```
        """
        j.tools.markdowndocs.reload(name)
