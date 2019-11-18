from Jumpscale import j


class community_manager(j.baseclasses.threebot_actor):
    def _init(self, **kwargs):
        self.bcdb = j.data.bcdb.get("tf_community_app")
        self.model = self.bcdb.model_get(url="threefold.community.user.1")
        self.current_user = ""
        self.FFP = "http://10.102.71.171:8280/"
        self.freeflow_client = j.clients.freeflowpages.get()
        self.links = []
        self.ids = []
        self.start = True

    def community_join(self, user_email, spaces, user_session=None):
        """
        ```in
        user_email = (S)
        spaces = (LS)
        ```

        ask FFP client to join to this space
        """
        spaces_joined = []
        user_id = self.freeflow_client.users.get_by_email(user_email).get("id")
        spaces_list = self.freeflow_client.spaces.list()
        for space in spaces_list["results"]:
            if space["name"] in spaces:
                spaces_joined.append(space["id"])

        result = self.freeflow_client.users.subscribe(user_id, spaces_joined)
        if result["code"] == 200:
            return True
        return False

    def user_create(self, user_email, user_name, schema_out=None, user_session=None):
        """
        ```in
        user_email = (S)
        user_name = (S)
        ```
        join FFP by mail
        """
        result = self.freeflow_client.users.create(user_name, user_email)
        if result.get("id"):
            return True
        return False

    def set_current_user(self, user, schema_out=None, user_session=None):
        self.current_user = user.decode()

    def spaces_list(self, schema_out=None, user_session=None):
        spaces = self.freeflow_client.spaces.list()
        spaces = spaces["results"]
        return [space["name"] for space in spaces]

    def get_node_structure(self, schema_out=None, user_session=None):
        if not self.ids and not self.start:
            user = self.model.find(email=self.current_user)
            d = self.get_nodes(user[0].name, user[0].name)

            return j.data.serializers.json.dumps(d)

        elif not self.start:
            user_id = self.ids.pop()
            user = self.model.find(id=user_id)
            users = self.model.find(invited_by=user_id)
        else:
            user = self.model.find(email=self.current_user)
            users = self.model.find(invited_by=user[0].id)
            self.start = False

        for i in users:
            self.ids.append(i.id)
            self.links.append((user[0].name, i.name))
        return self.get_node_structure()

    def get_nodes(self, node, main_user=None):
        d = {}
        if node == main_user:
            d["text"] = {"name": node + " / " + "{}".format(self.count_children(node) + 1)}
        else:
            d["text"] = {"name": node + " / " + "{}".format(self.count_children(node) - 1)}
        children = self.get_children(node)
        if children:
            d["children"] = [self.get_nodes(child) for child in children]
        return d

    def get_children(self, node):
        return [x[1] for x in self.links if x[0] == node]

    def count_children(self, node):
        if not node:
            return 1

        return 1 + len([self.count_children(x[0]) for x in self.get_children(node)])

    def info_get_current_user(self, schema_out=None, user_session=None):
        """
        ```out
        content = (S)
        ```
        gets parsed html representation of user info
        :param user_name:
        :return:
        """
        latestNews = {}
        error_message = ""
        join_message = ""

        user = self.freeflow_client.users.get_by_email(self.current_user)
        if not user.get("id"):
            error_message = "sorry ,you are not a member of FreeFlow pages.."
            join_message = "PLEASE JOIN"
            spaces = []
        else:
            user_id = user.get("id")
            spaces = self.freeflow_client.users.spaces(user_id)
        for space in spaces:
            posts = self.freeflow_client.posts.list(space_id=space["id"])
            latestNews[space["id"]] = [post["message"] for post in posts["results"]]
        out = schema_out.new()
        # TODO: improve html styling in the template
        out.content = j.tools.jinja2.template_get(self._dirpath + "/info_template.html").render(
            username=self.current_user,
            spaces=spaces,
            notfound=error_message,
            url=self.FFP,
            join=join_message,
            latestnews=latestNews,
        )
        return out

    def info_nodes(self, schema_out=None, user_session=None):
        """
        ```out
        content = (S)
        ```
        gets parsed html representation of user info
        :param user_name:
        :return:
        """
        out = schema_out.new()
        # TODO: improve html styling in the template
        out.content = j.tools.jinja2.template_get(self._dirpath + "/index.html").render()
        return out

    def check_referral(self, email, referral, name, bot_invited, schema_out=None, user_session=None):
        """
        ```in
        email = (S)
        name = (S)
        referral = (S)
        bot_invited = (S)
        ```
        check the referral is correct or not
        if correct send his username to community_join
        else: send message this inviation is wrong
        """
        if referral or bot_invited:
            users = self.model.find(email=email)
            if not users:
                user = self.model.new()
                user.email = email
                user.name = name
                user.referral_code = j.data.idgenerator.generateGUID().replace("-", "")
                user.save()
            else:
                user = users[0]
            if referral:
                user_invitation = self.model.find(referral_code=referral)
            if not user_invitation:
                user_invitation = self.model.find(name=bot_invited)
            if user_invitation and user.id != user_invitation[0].id:
                user.invited_by = user_invitation[0].id
                user.save()
                return user_invitation[0].email
        return False

    def unsubscribe_space(self, space, user, user_session=None):
        """
        unsubscribe from any community just take space name
        """
        pass

    def get_invitation_code(self, email, user_name, user_session=None):
        """
        ```in
        email = (S)
        user_name = (S)
        ```
        get invation code of user
        """
        users = self.model.find(email=email)
        if not users:
            user = self.model.new()
            user.email = email
            user.name = user_name
            user.referral_code = j.data.idgenerator.generateGUID().replace("-", "")

            user.save()
        else:
            user = users[0]
        return user.referral_code

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

        error_message = ""
        join_message = ""

        self.current_user = name
        user = self.freeflow_client.users.get_by_email(self.current_user)
        if not user.get("id"):
            error_message = "sorry ,you are not a member of FreeFlow pages.."
            join_message = "PLEASE JOIN"
            spaces = []
        else:
            user_id = user.get("id")
            spaces = self.freeflow_client.users.spaces(user_id)
        out = schema_out.new()
        # TODO: improve html styling in the template
        out.content = j.tools.jinja2.template_get(self._dirpath + "/info_template.html").render(
            username=self.current_user, spaces=spaces, notfound=error_message, url=self.FFP, join=join_message
        )
        return out
