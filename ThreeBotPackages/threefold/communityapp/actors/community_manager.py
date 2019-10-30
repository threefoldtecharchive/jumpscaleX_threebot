from Jumpscale import j


class community_manager(j.baseclasses.threebot_actor):
    def _init(self, **kwargs):
        self.bcdb = j.data.bcdb.get("tf_community_app")
        self.model = self.bcdb.model_get(url="threefold.community.user.1")

    def community_join(self, user_name, community_name, user_session=None):
        """
        ask FFP client to join to this space 
        """
        pass

    def check_referral(self, email, referral, schema_out=None, user_session=None):
        """
        ```in
        email = (S)
        referral = (S)
        ```
        check the referral is correct or not
        if correct send his username to community_join
        else: send message this inviation is wrong
        """
        if referral:
            users = self.model.find(email=email)
            if not users:
                user = self.model.new()
                user.email = email
            else:
                user = users[0]
            user.referral_codes.append(referral)
            user.save()
            return True
        return False

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
        cl = j.clients.freeflowpages.get()
        user_id = cl.users.get_by_username(name)["id"]
        spaces = cl.users.spaces(user_id)
        out = schema_out.new()
        # TODO: improve html styling in the template
        out.content = j.tools.jinja2.template_get(self._dirpath + "/info_template.html").render(
            username=name, spaces=spaces
        )
        return out
