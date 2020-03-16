from Jumpscale import j
import binascii
from io import BytesIO

JSBASE = j.baseclasses.object
NONE = 2147483647


class registry(j.baseclasses.threebot_actor):
    def _init(self, *args, **kwargs):

        self.package = j.threebot.packages.tfgrid.registry

        self.registration_model = self.package.bcdb_model_get(url="tfgrid.registry.entry.1")
        self.threebot_data_model = self.package.bcdb_model_get(url="tfgrid.registry.entry.data.1")
        self.threebot_encrypted_data_model = self.package.bcdb_model_get(url="tfgrid.registry.entry.data_encrypted.1")

    @j.baseclasses.actor_method
    def get_meta_entry_data(self, schema_out=None, user_session=None):
        """
        returns meta data about the register schema in text format.
        """

        return self.threebot_data_model.schema.text

    @j.baseclasses.actor_method
    def get_meta_encrypted_data(self, schema_out=None, user_session=None):
        """
        returns meta data about the register schema in text format.
        """

        return self.threebot_encrypted_data_model.schema.text

    @j.baseclasses.actor_method
    def register(
        self, authors=None, verifykey=None, input_object=None, signature_hex=None, schema_out=None, user_session=None
    ):
        """
        register an object of the type tfgrid.registry.entry.data.1
        can be given in multiple formats

        signature hex is done on the capnp output of the object

        ```in
        authors = (LI)  #tid of the author
        input_object = (O)  !tfgrid.registry.entry.data.1
        signature_hex = "" (S)
        verifykey = (BIN)
        ```

        :return: return the id of the object
        """
        # verify author id is correct
        if not authors:
            authors = []

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
            raise j.exceptions.Input("Registry cannot be registered, wrong signature")

        # register the data
        new_data_model = None
        if input_object:
            if input_object.registered_info:
                new_data_model = self.__decode_data(input_object.registered_info_format, input_object.registered_info)
            else:
                new_data_model = input_object.registered_info_encrypted

        new_object = self.package.bcdb_model_get(url="tfgrid.registry.entry.data.1").new()
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
            new_object.registered_info = self.__encode_data(input_object.registered_info_format, new_data_model)
        new_object.save()

        return new_object.id

    @j.baseclasses.actor_method
    def get(self, tid=None, data_id=None, schema_out=None, user_session=None):
        """
        ```in
        tid = (I)
        data_id = (I)
        ```

        ```out
        res = !tfgrid.registry.entry.data.1
        ```
        """
        res = self.threebot_data_model.get(obj_id=data_id)
        # verify if  encoded data or not
        if not res.registered_info:
            if tid in res.readers or tid in res.authors:
                encoded_data_list = []
                decoded_data_list = res.registered_info_encrypted
                for data in decoded_data_list:
                    encoded_data = self.__decode_data(res.registered_info_format, data.data_)
                    encoded_data_list.append(encoded_data)
                return encoded_data_list
            else:
                raise Exception("You are not authorized to few this data")
        else:
            encoded_data = self.__decode_data(res.registered_info_format, res.registered_info)
            return encoded_data

    @j.baseclasses.actor_method
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

    @j.baseclasses.actor_method
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
        location_longitude=None,
        location_latitude=None,
        user_session=None,
    ):
        """
        ```in
        tid = (I)
        #search arguments
        schema_url = ""  #jumpscale schema url
        country_code = ""
        format = "None,website,blog,wiki,doc,solutionpackage,threebotpackage" (E)
        category = "None,publicity,info,knowledge,code,spec,config,varia" (E)
        topic = "None,travel,food,it,spirituality,health,education,finance,varia" (E)
        location_longitude = (F)
        location_latitude = (F)
        description = ""
        ```

        only return if < 50 results

        ```out
        res = (LO) !tfgrid.registry.entry.data.1
        ```
        :return:
        """
        # will only return data user allowed to
        res = []
        table = self.threebot_data_model._index_.sql_table_name
        country_code, format, category, topic = self.__prepare_parameters_for_sql_query(
            country_code, format, category, topic, location_latitude, location_longitude
        )
        query = f'SELECT * FROM {table} \
            WHERE (country_code LIKE "{country_code}") \
            AND (format LIKE "{format}") \
            AND (category LIKE "{category}") \
            AND (location_latitude LIKE "{location_latitude}") \
            AND (location_longitude LIKE "{location_longitude}") \
            AND (topic LIKE "{topic}")'

        query = self.threebot_data_model.query(query)
        results = query.fetchall()
        for item in results:
            model = self.threebot_data_model.get(obj_id=item[0])
            if model.registered_info_encrypted:
                if tid in model.readers or tid in model.authors:
                    for item in model.registered_info_encrypted:
                        decoded_data = self.__decode_data(model.registered_info_format, item.data_)
                        if not decoded_data in res:
                            res.append(decoded_data)
        if len(res) > 50:
            raise j.exceptions.Input("Can not return results is > 50")

        return res

    def __prepare_parameters_for_sql_query(
        self, country_code=None, format=None, category=None, topic=None, location_longitude=None, location_latitude=None
    ):
        if not country_code:
            country_code = "%"
        if not format or format == "None":
            format = "%"
        if not category or category == "None":
            category = "%"
        if not topic or topic == "None":
            topic = "%"
        if not location_longitude:
            location_longitude = "%"
        if not location_latitude:
            location_latitude = "%"
        return country_code, format, category, topic

    def __encode_data(self, serializer_type, decoded_data):
        if serializer_type == "JSXSCHEMA":
            encoded_data = j.data.serializers.jsxdata.dumps(decoded_data)

        if serializer_type == "YAML":
            encoded_data = j.data.serializers.yaml.dumps(decoded_data)

        if serializer_type == "JSON":
            encoded_data = j.data.serializers.json.dumps(decoded_data)

        if serializer_type == "msgpack":
            encoded_data = j.data.serializers.msgpack.dumps(decoded_data)

        return encoded_data

    def __decode_data(self, serializer_type, encoded_data):
        if serializer_type == "JSXSCHEMA":
            decoded_data = j.data.serializers.jsxdata.loads(encoded_data)

        if serializer_type == "YAML":
            decoded_data = j.data.serializers.yaml.loads(encoded_data)

        if serializer_type == "JSON":
            decoded_data = j.data.serializers.json.loads(encoded_data)

        if serializer_type == "msgpack":
            decoded_data = j.data.serializers.msgpack.loads(encoded_data)

        return decoded_data

    @j.baseclasses.actor_method
    def find_formatted(
        self,
        registered_info_format=None,
        schema_url=None,
        country_code=None,
        format=None,
        category=None,
        topic=None,
        location_longitude=None,
        location_latitude=None,
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
        format = "None,website,blog,wiki,doc,solutionpackage,threebotpackage" (E)
        category = "None,publicity,info,knowledge,code,spec,config,varia" (E)
        topic = "None,travel,food,it,spirituality,health,education,finance,varia" (E)
        location_longitude = (F)
        location_latitude = (F)
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
        country_code, format, category, topic = self.__prepare_parameters_for_sql_query(
            country_code, format, category, topic, location_longitude, location_latitude
        )
        query = f'SELECT * FROM {table} \
            WHERE (country_code LIKE "{country_code}") \
            AND (format LIKE "{format}") \
            AND (category LIKE "{category}") \
            AND (topic LIKE "{topic}") \
            AND (location_longitude LIKE "{location_longitude}") \
            AND (location_latitude LIKE "{location_latitude}")'
        query = self.threebot_data_model.query(query)
        results = query.fetchall()

        decoded_data_list = []
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
                encoded_data = None
                # decode the data to from the format that the data was saved with
                decoded_data = self.__decode_data(str(model.registered_info_format), model.registered_info)
                decoded_data_list.append(decoded_data)
        if registered_info_format == "JSXSCHEMA":
            for item in decoded_data_list:
                encoded_data = self.__encode_data(registered_info_format, item)
                res.append(str(self.__decode_data(registered_info_format, encoded_data)))
        else:
            decoded_data_list = [item._ddict for item in decoded_data_list]
            res = self.__encode_data(registered_info_format, decoded_data_list)

        out = schema_out.new()
        out.res = res
        return out

    def validate_signature(self, tid=None, verifykey=None, payload=None, signature=None):
        nacl = j.data.nacl.get()
        is_valid = nacl.verify(payload, verify_key=verifykey, signature=signature)
        return is_valid
