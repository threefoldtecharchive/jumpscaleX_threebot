from Jumpscale import j
import binascii
from io import BytesIO


class tft_explorer(j.baseclasses.threebot_actor):
    def _init(self, *args, **kwargs):
        bcdb = j.data.bcdb.get("contact")
        self.tft_ex_t = bcdb.model_get(url="contact.request.1")

    def add(self, contact, schema_out=None, user_session=None):
        """
        ```in
        event = (O) !calendar.people.1
        ```

        ```out
        !calendar.people.1
        ```

        """

    def remove(self, contact, schema_out=None, user_session=None):

    def update(self, contact, schema_out=None, user_session=None):
    
    #share or send ?
    def share(self, contact, schema_out=None, user_session=None):

    def list_by_name(self, name, schema_out=None, user_session=None): 

    def search_by_name(self, name, schema_out=None, user_session=None): 
    def search(self, text, schema_out=None, user_session=None): 
