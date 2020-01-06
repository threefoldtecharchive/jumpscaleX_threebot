from Jumpscale import j
import random


class news(j.baseclasses.threebot_actor):
    def _init(self, **kwargs):
        self.news = self.bcdb.model_get(url="tfgrid.token.news.1")

    @j.baseclasses.actor_method
    def list(self, schema_out=None, user_session=None):
        """
        ```out
        news = (LO) !tfgrid.token.news.1
        ```
        """
        news_list = schema_out.new()

        for item in self.bcdb.instances.tfgrid_news_1.find():
            news_list.news.append(item)

        return news_list
