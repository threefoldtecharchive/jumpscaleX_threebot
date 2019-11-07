from Jumpscale import j
import binascii
from io import BytesIO

JSBASE = j.baseclasses.object
NONE = 2147483647


class registry(j.baseclasses.threebot_actor):
    def _init(self, *args, **kwargs):
        self.bcdb = self._bcdb_get("threebot_registery")
        self.registration_model = self.bcdb.model_get(url="threebot.registry.entry.1")
        self.threebot_data_model = self.bcdb.model_get(url="threebot.registry.entry.data.1")

    def register(
        self, authors=[], verifykey=None, input_object=None, signature_hex=None, schema_out=None, user_session=None
    ):
        """
        register an object of the type threebot.registry.entry.data.1
        can be given in multiple formats

        signature hex is done on the capnp output of the object

        ```in
        authors = (LI)  #tid of the author
        input_object = (O)  !threebot.registry.entry.data.1
        signature_hex = "" (S)
        verifykey = (BIN)
        ```

        :return: return the id of the object
        """
        # verify author id is correct
        if user_session.threebot_id:
            threebot_id = user_session.threebot_id
            # adding the threebot_id in the session in the authors list
            authors.append(threebot_id)

        if not all(author in input_object.authors for author in authors):
            raise j.exceptions.Input("Error data wasn't authored by the author")

        # need to verify if author is correct (use user_session tid or author if specified)
        # verification happens by means of signature, signature was done on data

        # verifiy the  data is signed with the input signatures
        signature_hex = binascii.a2b_hex(signature_hex)
        # TODO update the tid to be the threebot_id that we got from the session when it is ready
        verifiy_data = self.validate_signature(
            tid=authors[0], verifykey=verifykey, payload=input_object._data, signature=signature_hex
        )

        if not verifiy_data:
            raise j.exceptions.Input("Registery cannot be registered, wrong signature")

        # register the data
        new_data_model = None
        if input_object.schema_url:
            if input_object.registered_info:
                new_data_model = self.__decrypt_data(input_object.registered_info_format, input_object.registered_info)
            else:
                new_data_model = input_object.registered_info_encrypted

        new_object = self.bcdb.model_get(url="threebot.registry.entry.data.1").new()
        new_object.authors = input_object.authors
        new_object.readers = input_object.readers
        new_object.registered_info_format = input_object.registered_info_format
        new_object.registered_info_encrypted = input_object.registered_info_encrypted
        new_object.schema_url = input_object.schema_url
        new_object.location_latitude = input_object.location_latitude
        new_object.location_longitude = input_object.location_longitude
        new_object.country_code = input_object.country_code
        new_object.format = input_object.format
        new_object.category = input_object.category
        new_object.topic = input_object.topic
        new_object.description = input_object.description
        if input_object.registered_info:
            new_object.registered_info = self.__encrypt_data(input_object.registered_info_format, new_data_model)
        new_object.save()

        return new_object.id

    def get(self, tid=None, data_id=None, schema_out=None, user_session=None):
        """
        ```in
        tid = (I)
        data_id = (I)
        ```

        ```out
        res = !threebot.registry.entry.data.1
        ```
        """
        res = self.threebot_data_model.get(obj_id=data_id)
        # verify if  encrypted data or not
        if not res.registered_info:
            if tid in res.readers or tid in res.authors:
                encrypted_data_list = []
                decrypted_data_list = res.registered_info_encrypted
                for data in decrypted_data_list:
                    encrypted_data = self.__decrypt_data(res.registered_info_format, data.data_)
                    encrypted_data_list.append(encrypted_data)
                return encrypted_data_list
            else:
                raise Exception("You are not authorized to few this data")
        else:
            encrypted_data = self.__decrypt_data(res.registered_info_format, res.registered_info)
            return encrypted_data

    def schema_register(self, schema_url=None, schema_text=None, schema_out=None, user_session=None):
        """

        make sure the registrar knows about the schema's used
        return: md5 of the schema

        ```in
        schema_url = ""
        schema_text = ""
        ```
        """
        schema = j.data.schema.get_from_text(schema_text, schema_url)

        return schema._md5

    def find_encrypted(
        self,
        tid=None,
        schema_url=None,
        country_code=None,
        format=None,
        category=None,
        topic=None,
        description=None,
        schema_out=None,
        user_session=None,
    ):
        """
        ```in
        tid = (I)
        #search arguments
        schema_url = ""  #jumpscale schema url
        country_code = ""
        format = "website,blog,wiki,doc,solutionpackage,threebotpackage" (E)
        category = "publicity,info,knowledge,code,spec,config,varia" (E)
        topic = "travel,food,it,spirituality,health,education,finance,varia" (E)
        description = ""
        ```

        only return if < 50 results

        ```out
        res = (LO) !threebot.registry.entry.data.1
        ```
        :return:
        """
        # will only return data user allowed to
        res = []
        table = self.threebot_data_model._index_.sql_table_name
        query = f'SELECT * FROM {table} \
            WHERE (country_code="{country_code}") \
            OR (format="{format}") \
            OR (category="{category}") \
            OR (topic="{topic}")'

        query = self.threebot_data_model.query(query)
        results = query.fetchall()
        for item in results:
            model = self.threebot_data_model.get(obj_id=item[0])
            if model.registered_info_encrypted:
                if tid in model.readers or tid in model.authors:
                    for item in model.registered_info_encrypted:
                        decrypted_data = self.__decrypt_data(model.registered_info_format, item.data_)
                        if not decrypted_data in res:
                            res.append(decrypted_data)

        if len(res) > 50:
            raise j.exceptions.Input("Can not return results is > 50")

        return res

    def __encrypt_data(self, serializer_type, decrypted_data):
        if serializer_type == "JSXSCHEMA":
            encrypted_data = j.data.serializers.jsxdata.dumps(decrypted_data)

        if serializer_type == "YAML":
            encrypted_data = j.data.serializers.yaml.dumps(decrypted_data)

        if serializer_type == "JSON":
            encrypted_data = j.data.serializers.json.dumps(decrypted_data)

        if serializer_type == "msgpack":
            encrypted_data = j.data.serializers.msgpack.dumps(decrypted_data)

        return encrypted_data

    def __decrypt_data(self, serializer_type, encrypted_data):
        if serializer_type == "JSXSCHEMA":
            decrypted_data = j.data.serializers.jsxdata.loads(encrypted_data)

        if serializer_type == "YAML":
            decrypted_data = j.data.serializers.yaml.loads(encrypted_data)

        if serializer_type == "JSON":
            decrypted_data = j.data.serializers.json.loads(encrypted_data)

        if serializer_type == "msgpack":
            decrypted_data = j.data.serializers.msgpack.loads(encrypted_data)

        return decrypted_data

    def find_formatted(
        self,
        registered_info_format=None,
        schema_url=None,
        country_code=None,
        format=None,
        category=None,
        topic=None,
        description=None,
        schema_out=None,
        user_session=None,
    ):
        """

        only works for non encrypted
        will return the data as requested

        ```in
        registered_info_format = "jsxschema,yaml,json,msgpack,unstructured" (E)
        #search arguments
        schema_url = ""  #jumpscale schema url
        country_code = ""
        format = "website,blog,wiki,doc,solutionpackage,threebotpackage" (E)
        category = "publicity,info,knowledge,code,spec,config,varia" (E)
        topic = "travel,food,it,spirituality,health,education,finance,varia" (E)
        description = ""
        ```
        ```out
        res = (S)
        ```
        only return if < 50 results

        :param schema_url:
        :param user_session:
        :return:
        """
        # find the data
        # if found: see if there was a jumpscale schema used
        # if jumpscale schema
        # deserialize the data if needed and put in jumpscale object
        # serialize the coming from the jumpscaleobject to the format asked for
        # return the data
        # if not jumpscale schema
        # deserialize & re-serialize if needed to make sure the return format is the right one

        res = []
        table = self.threebot_data_model._index_.sql_table_name
        query = f'SELECT * FROM {table} \
            WHERE (country_code="{country_code}") \
            OR (format="{format}") \
            OR (category="{category}") \
            OR (topic="{topic}")'

        query = self.threebot_data_model.query(query)
        results = query.fetchall()

        for item in results:
            # TODO: Check
            # # find the data
            # if found: see if there was a jumpscale schema used
            # if jumpscale schema
            # deserialize the data if needed and put in jumpscale object
            # serialize the coming from the jumpscaleobject to the format asked for
            # return the data
            # if not jumpscale schema
            # deserialize & re-serialize if needed to make sure the return format is the right one

            output = None
            model = self.threebot_data_model.get(obj_id=item[0])
            if model.registered_info:
                encry_data = None
                decry_data = self.__decrypt_data(str(model.registered_info_format), model.registered_info)
                if registered_info_format == "JSXSCHEMA":
                    encry_data = self.__encrypt_data(registered_info_format, decry_data)
                    output = str(self.__decrypt_data(registered_info_format, encry_data))
                else:
                    output = self.__encrypt_data(registered_info_format, decry_data._ddict)

                if not output in res:
                    res.append(output)

        if len(res) > 50:
            raise j.exceptions.Input("Can not return results is > 50")

        out = schema_out.new()
        out.res = res
        return out

    def validate_signature(
        self, tid=None, verifykey=None, payload=None, signature=None, schema_out=None, user_session=None
    ):
        """
        ```in
        tid = (I)
        name = (S)
        email = (S)
        payload = (S)
        signature = (BIN)
        verifykey = (BIN)
        ```

        ```out
        is_valid = (B)
        ```
        """

        nacl = j.data.nacl.get()
        is_valid = nacl.verify(payload, verify_key=verifykey, signature=signature)
        return is_valid
