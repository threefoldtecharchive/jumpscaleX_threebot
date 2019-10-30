from Jumpscale import j


class community_manager(j.baseclasses.threebot_actor):
    def _init(self, **kwargs):
        self.bcdb = j.data.bcdb.get("tf_community_app")
        self.model = self.bcdb.model_get(url="threefold.community.user.1")
        self.current_user = "community_user"  # temporary hack

    def community_join(self, user_name, community_name, user_session=None):
        """
        ask FFP client to join to this space 
        """
        pass

    def set_current_user(self, user, schema_out=None, user_session=None):
        self.current_user = "dylan_verstraete_1"

    def info_get_current_user(self, schema_out=None, user_session=None):
        """
        ```out
        content = (S)
        ```
        gets parsed html representation of user info
        :param user_name:
        :return:
        """
        cl = j.clients.freeflowpages.get()
        user_id = cl.users.get_by_username(self.current_user)["id"]
        spaces = cl.users.spaces(user_id)
        out = schema_out.new()
        # TODO: improve html styling in the template
        out.content = j.tools.jinja2.template_get(self._dirpath + "/info_template.html").render(
            username=self.current_user, spaces=spaces
        )
        return out

    def check_referral(self, email, referral, name, schema_out=None, user_session=None):
        """
        ```in
        email = (S)
        name = (S)
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
            user.name = name
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
