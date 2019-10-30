from Jumpscale import j


class community_manager(j.baseclasses.threebot_actor):
    def _init(self, **kwargs):
        pass

    def community_join(self, user_name, community_name, user_session=None):
        """
        ask FFP client to join to this space 
        """
        pass

    def check_invitation(self, invitation, description, user_session=None):
        """
        check the invitation is correct or not
        if correct send his username to community_join
        else: send message this inviation is wrong
        """
        pass

    def unsubscribe_space(self, space, user, user_session=None):
        """
        unsubscribe from any community just take space name
        """
        pass

    def info_get(self, name, schema_out=None, user_session=None):
        """
        ```in
        name = (S)
        ```
        ```out
        content = (S)
        ```
        gets parsed html representation of user info
        :param user_name:
        :return:
        """
        # TODO: get spaces info for specific username (not implemented in the client yet)
        spaces = [{"name": "test_space", "desc": "hello world"}]
        out = schema_out.new()
        out.content = j.tools.jinja2.template_get(self._dirpath + "/info_template.html").render(username=name, spaces=spaces)
        return out
