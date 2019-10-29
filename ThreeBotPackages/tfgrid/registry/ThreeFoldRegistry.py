from Jumpscale import j


class ThreeFoldRegistry(j.baseclasses.threebot_factory):

    __jslocation__ = "j.threebot.package.threefold.registry"

    def client_get(self):
        """
        j.threebot.package.threefold.registry.client_get()
        :return:
        """
        self.client = j.servers.threebot.local_start_default(web=True)

        return self.client

    def test(self, name=""):
        """
        kosmos -p 'j.threebot.package.threefold.registry.test()'
        """
        cl = self.client_get()

        print(name)

        # lets test for registration of a wiki page

        schema = """
            @url = threebot.registry.test.schema.1
            url = ""                              #unique url, points to where the wiki is
            description = ""
            topic = "travel,food,it" (E)
            tags = (LS)
        """

        self.client.actors....schema_register(schema_text=schema)

        s=j.data.schemas.get(schema=schema)
        o = s.new()
        o...

        author_tid=j.tools.threebot.me.default.tid


        j.data.schema.add_from_path(path=self._dirpath+"/models") #this will make sure the schema is known if this packafge
        s = j.data.schemas.get_from_url(url="threebot.registry.entry.data.1")
        dataobj=s.new()

        #TODO: fill in required info in  the data obj
        #we should create 2 examples, one where we encrypt for multiple threebot identities (j.tools.threebot...)

        #need to sign with private key of author, we sign the bin data from dataobj (_data)
        signature_hex = j.tools.threebot.me.sign(dataobj._data)

        self.client.actors....register(author=author_tid, object=dataobj, signature_hex=None


        #TODO: lets now verify if we can get the data and if we can decrypt (if encrypted)
        #
        obj=self.client.actors....get(...)
        #TODO: Find for encrypted and not



        return "OK"
