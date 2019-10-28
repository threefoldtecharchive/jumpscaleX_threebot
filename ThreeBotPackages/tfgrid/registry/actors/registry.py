from Jumpscale import j
import binascii
from io import BytesIO

JSBASE = j.baseclasses.object
NONE = 2147483647


class registry(j.baseclasses.threebot_actor):
    def _init(self, *args, **kwargs):
        self.bcdb = self._bcdb_get("threebot_phonebook")
        self.registration_model = ...

    def register(self, author=0, object=None, signature_hex=None, schema_out=None, user_session=None):
        """
        register an object of the type threebot.registry.entry.data.1
        can be given in multiple formats

        signature hex is done on the capnp output of the object

        ```in
        author = (I)  #tid of the author
        object = (O)  !threebot.registry.entry.data.1
        signature_hex = "" (S)
        ```

        ```out
        result = (I)
        ```

        :return: return the id of the object
        """

        # TODO: need to verify if author is correct (use user_session tid or author if specified
        # verification happens by means of signature, signature was done on data

        return

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

    def schema_register(self,schema_url=None,schema_text=None,schema_out=None, user_session=None):
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

    def find_encrypted(self, schema_url=None,...schema_out=None, user_session=None):
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

    def find_formatted(self, registered_info_format=None, schema_url=None,...schema_out=None, format=,user_session=None):
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

        #find the data
        #if found: see if there was a jumpscale schema used
        #if jumpscale schema
            # deserialize the data if needed and put in jumpscale object
            # serialize the coming from the jumpscaleobject to the format asked for
            # return the data
        #if not jumpscale schema
            # deserialize & re-serialize if needed to make sure the return format is the right one
