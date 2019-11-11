from Jumpscale import j


class gitea(j.baseclasses.threebot_actor):
    def _init(self, *args, **kwargs):
        self.bcdb = j.data.bcdb.get("gitea")
        self.model = j.data.bcdb.system.model_get(url="tfgridsolutions.gitea.instance.1")

    def getall(self, user_session=None):
        return self.model.find()

    def chatbot_install_url_get(self):
        """

        :return: the url (normally relative to threebot) for the chatbot which will create a threebot
        """
        pass

    def chatbot_recovery_url_get(self):
        """

        :return: the url (normally relative to threebot) for the chatbot which will create a threebot
        """
        pass

    def wiki_doc_url_get(self):
        """
        :return: the url (normally relative to threebot) for the chatbot which will create a threebot

        """
        pass

    def wiki_solution_url_get(self, name=None):
        """
        it will return wiki link to the specific deployed solution
        :return: the url (normally relative to threebot) for the chatbot which will create a threebot

        """
        pass

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

    def monitor_up(self):
        """
        does monitoring returns True if ok
        :return:
        """
        pass
