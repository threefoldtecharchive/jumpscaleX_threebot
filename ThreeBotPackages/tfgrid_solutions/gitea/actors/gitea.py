from Jumpscale import j


class gitea(j.baseclasses.threebot_actor):
    def _init(self, *args, **kwargs):
        self.model = self.bcdb.model_get(url="tfgrid.gitea.instance.1")

    @j.baseclasses.actor_method
    def getall(self, user_session=None):
        return self.model.find()

    @j.baseclasses.actor_method
    def chatbot_install_url_get(self):
        """

        :return: the url (normally relative to threebot) for the chatbot which will create a threebot
        """
        pass

    @j.baseclasses.actor_method
    def chatbot_recovery_url_get(self):
        """

        :return: the url (normally relative to threebot) for the chatbot which will create a threebot
        """
        pass

    @j.baseclasses.actor_method
    def wiki_doc_url_get(self):
        """
        :return: the url (normally relative to threebot) for the chatbot which will create a threebot

        """
        pass

    @j.baseclasses.actor_method
    def wiki_solution_url_get(self, name=None):
        """
        it will return wiki link to the specific deployed solution
        :return: the url (normally relative to threebot) for the chatbot which will create a threebot

        """
        pass

    @j.baseclasses.actor_method
    def delete(self, name=None):
        """
        ```in
        name = ""
        ```
        ```out
        state = "OK,ERROR" (E)
        ```
        """
        pass

    @j.baseclasses.actor_method
    def monitor_up(self):
        """
        does monitoring returns True if ok
        :return:
        """
        pass
