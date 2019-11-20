from Jumpscale import j


class CommunityFactory(j.baseclasses.threebot_factory):

    __jslocation__ = "j.threebot.package.community_bot"

    def _get_admin_referral(self):
        bcdb = j.data.bcdb.get("tf_community_app")
        model = bcdb.model_get(url="threefold.community.user.1")
        users = model.find(name="admin")
        if users:
            return users[0].referral_code
        return "Sorry , admin not created yet"

    def test(self):
        """
        kosmos 'j.threebot.package.community_bot.test()'
        :return:
        """
        # to do manually:
        # jsx wiki-load -u /sandbox/code/github/threefoldtech/jumpscaleX_threebot/ThreeBotPackages/threefold/communityapp/wiki -n community -f

        pass
