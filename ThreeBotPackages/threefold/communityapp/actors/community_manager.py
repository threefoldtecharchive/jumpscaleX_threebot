from Jumpscale import j


class community_manager(j.baseclasses.threebot_actor):
    def _init(self, **kwargs):
        self.bcdb = j.data.bcdb.get("tf_community_app")
        self.model = self.bcdb.model_get(url="threefold.community.user.1")
        self.current_user = ""
        self.FFP = "http://10.102.71.171:8280/"
        self.freeflow_client = j.clients.freeflowpages.get()

    def community_join(self, user_email, spaces, user_session=None):
        """
        ```in
        user_email = (S)
        spaces = (LS)
        ```

        ask FFP client to join to this space
        """
        return
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
        # TODO: create new account in FFP
        return True

    def set_current_user(self, user, schema_out=None, user_session=None):
        self.current_user = user.decode()

    def spaces_list(self, schema_out=None, user_session=None):
        spaces = self.freeflow_client.spaces.list()
        spaces = spaces["results"]
        return [space["name"] for space in spaces]

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
        users = []
        users = self.model.find()
        found = False
        for item in users:
            if item.remark_threefold == referral:
                found = True

        return found

    def send_mail(self, name=None, receiver=None, content=None, subject=None, user_session=None):
        """
        ```in
        name = (S)
        receiver = (S)
        content = (S)
        subject = (S)
        ```
        send email to user
        """
        email_to = []
        if receiver:
            email_to.append(receiver)
        ecl = j.clients.sendgrid.get("send_grid")
        try:
            ecl.send("register@threefold.io", subject, content, email_to)
        except:
            print("Wrong Mail")

    def get_by_secret(self, secret, schema_out=None, user_session=None):
        """
        ```in
        secret = (S)
        ```
        """
        users = []
        users = self.model.find()
        threebot_name = ""
        for item in users:
            if item.referral_code == secret:
                threebot_name = item.remark_threefold

        return threebot_name

    def get_referral_name(self, referral, schema_out=None, user_session=None):
        """
        ```in
        referral = (S)
        ```
        check the referral is correct or not
        if correct send his username to community_join
        else: send message this inviation is wrong
        """
        users = []
        users = self.model.find()
        name = ""
        for item in users:
            if item.remark_threefold == referral:
                name = item.name

        return name

    def get_referral_id(self, referral, schema_out=None, user_session=None):
        """
        ```in
        referral = (S)
        ```
        """
        users = []
        users = self.model.find()
        ref_id = 0
        for item in users:
            if item.remark_threefold == referral:
                ref_id = item.id

        return ref_id

    def unsubscribe_space(self, space, user, user_session=None):
        """
        unsubscribe from any community just take space name
        """
        pass

    def get_all_data(self, email=None, schema_out=None, user_session=None):
        """
        ```in
        email = (S)
        ```
        """
        users = []
        res = []
        if email:
            users = self.model.find(email=email)
        else:
            users = self.model.find()

        for item in users:
            res.append(item._ddict_hr)

        return res

    def get_threebots(self, threebot_name, user_session=None):
        """
        ```in
        threebot_name = (S)
        ```
        """
        users = []
        users = self.model.find()
        found = False
        for item in users:
            if item.remark_threefold == threebot_name:
                found = True

        return found

    def user_add(
        self,
        name=None,
        email=None,
        country=None,
        company=None,
        threebot_name=None,
        spaces=None,
        secret=None,
        invited_by=None,
        user_session=None,
    ):
        """
        ```in
        email = (S)
        name = (S)
        country = (S)
        company = (S)
        threebot_name = (S)
        spaces = (S)
        secret = (S)
        invited_by= (S)
        ```
        """
        users = self.model.find(name=name)
        current_user = ""
        if not users:
            user = self.model.new()
            user.email = email
            user.name = name
            user.country = country
            user.company = company
            # TODO: CHANGE ME: will register threebotname in this field to avoid changing the schema
            user.remark_threefold = threebot_name
            # TODO: CHANGE ME: will register userspaces in this field to avoid changing the schema
            user.remark_member = spaces
            user.referral_code = secret
            user.invited_by = self.get_referral_id(invited_by)
            user.save()
        else:
            for item in users:
                if item.remark_threefold == threebot_name:
                    current_user = item
                    break
            if current_user:
                user = current_user
                user.email = email
                user.name = name
                user.country = country
                user.company = company
                user.save()

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
            user.referral_code = user_name

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
