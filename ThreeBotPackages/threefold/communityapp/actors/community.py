from Jumpscale import j


class community(j.baseclasses.threebot_actor):
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
