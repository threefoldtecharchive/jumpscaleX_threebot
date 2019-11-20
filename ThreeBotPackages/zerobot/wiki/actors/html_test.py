from Jumpscale import j


class html_test(j.baseclasses.threebot_actor):
    def hello(self, name, user_session, schema_out=None):
        """
        :param name: name to say hello to

        ```in
        name = (S)
        ```

        ```out
        content = (S)
        ```
        """
        out = schema_out.new()
        out.content = f"Hello <h3>{name}</h3>"
        return out

    def hello_markdown(self, name, user_session, schema_out=None):
        """
        :param name: name to say hello to

        ```in
        name = (S)
        ```

        ```out
        content = (S)
        ```
        """
        out = schema_out.new()
        out.content = f"_markdown test_ Hello `{name}`"
        return out
