from Jumpscale import j
import binascii


class ThreeFoldRegistry(j.baseclasses.threebot_factory):

    __jslocation__ = "j.threebot.package.threefold.registry"
    bcdb = j.data.bcdb.get("threebot_registery")

    def client_get(self):
        """
        j.threebot.package.threefold.registry.client_get()
        :return:
        """
        self.client = j.servers.threebot.local_start_default()

        return self.client

    def test(self, name=""):
        """
        kosmos -p 'j.threebot.package.threefold.registry.test()'
        """
        """
        #. Start threebot server, add registery package, then reload the client.
        #. Register user1's data as public, should succeed
        #. Get user1 public data, should succeed
        #. Register user1's data as private with giving access to user2, should succeed
        #. Get data with user 2, should succeed
        #. Get data with unauthorized data, should not be able to get the data
        """

        # . Start threebot server, add registery package, then reload the client.
        cl = self.client_get()
        cl.actors.package_manager.package_add(
            path=j.core.tools.text_replace(
                "{DIR_BASE}/code/github/threefoldtech/jumpscaleX_threebot/ThreeBotPackages/tfgrid/registry")
        )
        cl.reload()
        print(name)

        # lets test for registration of a wiki page
        schema = """
            @url = threebot.registry.test.schema.1
            url = "" # unique url, points to where the wiki is
            description = ""
            topic = "travel,food,it" (E)
            tags = (LS)
        """

        scm = j.data.schema.get_from_text(schema)
        model = self.bcdb.model_get(url=scm.url).new()
        model.url = "testwikis.com"
        model.description = "this is a test wiki about travel"
        model.tags = "travel, hotels, diving"
        model.save()

        cl.actors.registry.schema_register(scm.url, schema)

        tid_1 = j.data.idgenerator.generateRandomInt(100, 200)
        tid_2 = j.data.idgenerator.generateRandomInt(201, 300)
        tid_3 = j.data.idgenerator.generateRandomInt(301, 400)

        first_author = j.tools.threebot.me.get("first_id", tid=tid_1, email="test@test.com", tname="first")
        authorized_reader = j.tools.threebot.me.get("second_id", tid=tid_2, email="test@test.com", tname="second")
        unauthorized_reader = j.tools.threebot.me.get("third_id", tid=tid_3, email="test@test.com", tname="third")

        # we should create 2 examples, one where we encrypt for multiple threebot identities (j.tools.threebot...)
        # non-encrypted example
        scm1 = j.data.schema.get_from_url(url="threebot.registry.entry.data.1")
        dataobj = self.bcdb.model_get(url=scm1.url).new()
        dataobj.authors = [first_author.tid]
        dataobj.schema_url = scm.url
        dataobj.registered_info = model._data
        dataobj.format = dataobj.format.WIKI
        dataobj.description = "just a test"
        dataobj.save()

        # . Register user1's data as public, should succeed
        # need to sign with private key of author, we sign the bin data from dataobj (_data)
        verifykey = first_author.nacl.verify_key.encode()
        signed_data = first_author.nacl.sign(dataobj._data)
        post_id1 = cl.actors.registry.register(
            authors=[first_author.tid], verifykey=verifykey, input_object=dataobj, signature_hex=signed_data.hex()
        )
        if not post_id1:
            raise j.exceptions.Input("Failed to register your content")

        # . Get user1 public data, should succeed
        res = cl.actors.registry.get(data_id=post_id1)
        assert model == res

        # encrypted example
        scm2 = j.data.schema.get_from_url(url="threebot.registry.entry.data.1")
        dataobj2 = self.bcdb.model_get(url=scm2.url).new()
        dataobj2.authors = [first_author.tid]
        dataobj2.readers = [authorized_reader.tid]
        dataobj2.schema_url = scm.url
        dataobj2.format = dataobj2.format.WIKI
        dataobj2.description = "just a test"
        encrypted_data_model = j.data.schema.get_from_url(url="threebot.registry.entry.data_encrypted.1").new()
        encrypted_data_model.tid = first_author.tid
        encrypted_data_model.data_ = model._data
        dataobj2.registered_info_encrypted = [encrypted_data_model]
        dataobj2.save()

        signed_data = first_author.nacl.sign(dataobj2._data)

        # . Register user1's data as private with giving access to user2, should succeed
        post_id2 = cl.actors.registry.register(
            authors=[first_author.tid], verifykey=verifykey, input_object=dataobj2, signature_hex=signed_data.hex()
        )
        if not post_id2:
            raise j.exceptions.Input("Failed to register your content")

        #  Find all encrypted data for specific user or you can use your search criteria
        # . Get data with user 2, should succeed
        res = cl.actors.registry.find_encrypted(tid=authorized_reader.tid)
        assert model == res[-1]

        # . Get data with unauthorized data, should not be able to get the data
        res = cl.actors.registry.find_encrypted(tid=unauthorized_reader.tid)
        assert res == []

        # find formatted in jsxschema
        res = cl.actors.registry.find_formatted(registered_info_format="JSXSCHEMA")
        print(res.res)

        print("OK")
