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

    def register(self, author=0, input_object=None, signature_hex=None, schema_out=None, user_session=None):
        """
        register an object of the type threebot.registry.entry.data.1
        can be given in multiple formats

        signature hex is done on the capnp output of the object

        ```in
        author = (I)  #tid of the author
        input_object = (O)  !threebot.registry.entry.data.1
        signature_hex = "" (S)
        ```

        ```out
        result = (I)
        ```

        :return: return the id of the object
        """
        # need to verify if author is correct (use user_session tid or author if specified)
        # verification happens by means of signature, signature was done on data

        # verifiy the  data is signed with the input signature
        verifiy_data = j.data.nacl.payload_verify(input_object._data, signature=signature_hex, die=True)

        if not verifiy_data:
            raise j.exceptions.Input("threebot cannot be registered, signature wrong")

        # verify author id is correct
        if user_session.threebot_id:
            threebot_id = user_session.threebot_id

        if author != 0:
            threebot_id = author

        assert threebot_id in input_object.authors

        # register the data
        # new_data_model = threebot_data_model.new() # for non jumpscale schema

        # data_format = input_object.registered_info_format
        input_object.save()

        return input_object.id

    def get(self, tid=None, id=None, schema_out=None, user_session=None):
        """
        ```in
        tid = (I)
        id = (I)
        ```

        ```out
        !threebot.registry.entry.1
        ```
        """
        entry_model = self.registration_model.get(id=id)

    def schema_register(self, schema_url=None, schema_text=None, schema_out=None, user_session=None):
        """

        make sure the registrar knows about the schema's used

        ```in
        schema_url = ""
        schema_text = ""
        ```

        ```out
        schema_md5=""
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
        (LO) !threebot.registry.entry.data.1
        ```
        :return:
        """
        # will only return data user allowed to
        output = []
        table = self.threebot_data_model._index_.sql_table_name
        query = self.threebot_data_model.query(
            f"SELECT * FROM {table} WHERE country_code={country_code} OR format={format} OR category={category} OR topic={topic} OR description={description}"
        )
        results = query.fetchall()
        for item in results:
            if item.registered_info_encrypted.data:
                if item.registered_info_encrypted.tid == tid:
                    output.append(self.threebot_data_model.find(id=item[0]))

        if output < 50:
            return output

        raise j.exceptions.Input("Can not return results is > 50")

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
        registered_info_format = "yaml,json,msgpack,unstructured" (E)
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
        (LS)
        ```

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

        output = []
        table = self.threebot_data_model._index_.sql_table_name
        query = self.threebot_data_model.query(
            f"SELECT * FROM {table} WHERE country_code={country_code} OR format={format} OR category={category} OR topic={topic} OR description={description}"
        )
        results = query.fetchall()

        for item in results:
            if not item.registered_info_encrypted.data:
                item_model = self.threebot_data_model.find(id=item[0])
                if item_model.schema_url:
                    item_out = j.data.serializers.jsxdata.dumps(item_model)
                    # TODO: return the asked format

        if output < 50:
            return output

        raise j.exceptions.Input("Can not return results is > 50")
