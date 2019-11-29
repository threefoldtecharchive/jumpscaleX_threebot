from Jumpscale import j


class Package(j.baseclasses.threebot_package):
    def prepare(self):
        """
        Dependencies
        """
        # write 4 apps to database
        appModel = self.bcdb.model_get(url="app.1")

        appsList = [
            {
                "appname": "Mail",
                "installed": False,
                "description": "3bot-to-3bot mail service. Convenience of e-mail meets privacy, no man in the middle.",
                "image": "upcoming",
            },
            {
                "appname": "Contacts",
                "installed": False,
                "description": "Your personal contacts list, integration with other apps possible.",
                "image": "upcoming",
            },
            {
                "appname": "Calendar",
                "installed": False,
                "description": "Standard private calendar.",
                "image": "upcoming",
            },
            {"appname": "Docs", "installed": False, "description": "All your docs belong to you", "image": "upcoming"},
            {
                "appname": "Browser",
                "installed": False,
                "description": "Private browsing without limits.",
                "image": "upcoming",
            },
            {
                "appname": "FF Connect",
                "installed": False,
                "description": "Peer to peer and group video conferencing, straight from the browser.",
                "image": "upcoming",
            },
        ]

        for application in appsList:
            # rework needed
            if appModel.count(appname=application["appname"]) == 0:
                app = appModel.new(application)
                app.save()
