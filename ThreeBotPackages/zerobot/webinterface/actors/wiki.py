from Jumpscale import j
from os.path import splitext


class wiki(j.baseclasses.threebot_actor):

    # REMARK: was query before
    def find(self, name, text, schema_out=None, user_session=None):
        """
        ```in
        name = "" (S)
        text = "" (S)
        ```
        ```out
        res = (LS)
        ```
        :param name: Docsite name
        :param text: text to search for in all files
        :return:
        """
        out = schema_out.new()
        res = []
        try:
            res = [
                splitext(entry)[0].lower()
                for entry in j.threebot.servers.sonic.default_client.query("docsites", name, text)
                if "siderbar" not in entry
            ]
        except Exception as e:
            print(e)
        out.res = res
        return out
