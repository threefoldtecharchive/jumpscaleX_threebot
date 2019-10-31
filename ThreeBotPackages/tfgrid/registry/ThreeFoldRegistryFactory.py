from Jumpscale import j
import binascii


class ThreeFoldRegistry(j.baseclasses.threebot_factory):

    __jslocation__ = "j.threebot.package.threefold.registry"
    bcdb = j.data.bcdb.get("threebot_registery")

    def test(self, name=""):
        """
        kosmos -p 'j.threebot.package.threefold.registry.test()'
        """
        cl = self.start()
        cl.actors.package_manager.package_add(
            path="/sandbox/code/github/threefoldtech/jumpscaleX_threebot/ThreeBotPackages/tfgrid/registry"
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

        first_author = j.tools.threebot.me.get("first_id", tid=5, email="test@test.com", tname="first")

        second_author = j.tools.threebot.me.get("second_id", tid=3, email="test@test.com", tname="second")

        j.data.schema.add_from_path(
            path=self._dirpath + "/models"
        )  # this will make sure the schema is known if this package

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

        # need to sign with private key of author, we sign the bin data from dataobj (_data)
        pubkey = first_author.nacl.public_key.encode()
        signingkey = first_author.nacl.signing_key.encode()
        verifykey = first_author.nacl.verify_key.encode()
        signed_data = first_author.nacl.sign(dataobj._data)

        post_id1 = cl.actors.registry.register(
            author=first_author.tid, verifykey=verifykey, input_object=dataobj, signature_hex=signed_data.hex()
        )
        if not post_id1:
            raise j.exceptions.Input("Failed to register your content")

        # encrypted example
        scm2 = j.data.schema.get_from_url(url="threebot.registry.entry.data.1")
        dataobj2 = self.bcdb.model_get(url=scm2.url).new()
        dataobj2.authors = [first_author.tid]
        dataobj2.readers = [second_author.tid]
        dataobj2.schema_url = scm.url
        dataobj2.format = dataobj2.format.WIKI
        dataobj2.description = "just a test"
        encrypted_data_model = j.data.schema.get_from_url(url="threebot.registry.entry.data_encrypted.1").new()
        encrypted_data_model.tid = first_author.tid
        encrypted_data_model.data_ = model._data
        dataobj2.registered_info_encrypted = [encrypted_data_model]
        dataobj2.save()

        signed_data = first_author.nacl.sign(dataobj2._data)

        post_id2 = cl.actors.registry.register(
            author=first_author.tid, verifykey=verifykey, input_object=dataobj2, signature_hex=signed_data.hex()
        )
        if not post_id2:
            raise j.exceptions.Input("Failed to register your content")

        # lets now verify if we can get the data and if we can decrypt (if encrypted)
        # check normal post
        res = cl.actors.registry.get(data_id=post_id1)
        info = j.data.serializers.jsxdata.loads(res.registered_info)
        from pprint import pprint

        pprint(f"{res._ddict_hr}\ninfo_data:{info._ddict_hr}")
        #  Find all encrypted data for specific user or you can use your search criteria
        res = cl.actors.registry.find_encrypted(tid=second_author.tid)
        for item in res:
            pprint(f"{item._ddict_hr}")

        # find formatted in jsxschema
        res = cl.actors.registry.find_formatted(registered_info_format="JSXSCHEMA")
        for item in res:
            res = j.data.serializers.jsxdata.loads(item)
            pprint(f"{res._ddict_hr}")
        return "OK"
