from Jumpscale import j


class provision(j.baseclasses.threebot_actor):
    def _init(self, **kwargs):
        self.bcdb = j.data.bcdb.get("tfgrid_solutions")
        self.model = j.data.bcdb.system.model_get(url="tfgridsolutions.gitea.instance.1")

    def getall(self, user_session=None):
        """
        ```out
        result = (LO) !...
        ```
        """
        return self.model.find()

    def chatbot_install_url_get(self):
        """

        :return: the url (normally relative to threebot) for the chatbot which will create a threebot
        """

    def chatbot_recovery_url_get(self):
        """

        :return: the url (normally relative to threebot) for the chatbot which will create a threebot
        """

    def wiki_doc_url_get(self):
        """
        :return: the url (normally relative to threebot) for the chatbot which will create a threebot

        """

    def wiki_solution_url_get(self, name=None):
        """
        it will return wiki link to the specific deployed solution
        :return: the url (normally relative to threebot) for the chatbot which will create a threebot

        """

    def delete(self, name=None):
        """
        ```in
        name = ""
        ```
        ```out
        state = "OK,ERROR" (E)
        ```
        """

    def monitor_up(self):
        """
        does monitoring returns True if ok
        :return:
        """
