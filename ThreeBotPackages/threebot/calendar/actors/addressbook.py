import vobject
import datetime
from Jumpscale import j


class addressbook(j.baseclasses.threebot_actor):
    def _init(self, **kwargs):
        self.base_url = "http://127.0.0.1:8851"
        self.client = None

    def login(self, username, password, addressbook=None, user_session=None):
        """
        ```in
        username = (S)
        password = (S)
        ```
        """
        self.client = j.clients.carddav.get(
            resource=f"http://172.17.0.2:8851/{username}", user=username, passwd=password
        )
        self.username = username

    def _verify_client(self):
        if not self.client:
            raise j.exceptions.Runtime("Use login method to enable the actor")

    def list_addressbooks(self, schema_out=None, user_session=None):
        """
        ```out
        addressbooks = (dict)
        ```
        returns dict of addressbooks {hrefs:etags}
        """
        self._verify_client()
        addressbooks = self.client.list_abooks()
        output = schema_out.new()
        output.addressbooks = addressbooks
        return output

    def add_addressbook(self, name, description, href=None, user_session=None):
        """
        ```in
        name = (S)
        description = (S)
        href = (S)
        ```
        """
        self._verify_client()
        self.client.create_abook(name, description, href)
        return True

    def get_addressbook(self, addressbook_id, schema_out=None, user_session=None):
        """
        ```in
        addressbook_id = (S)
        ```
        ```out
        addressbook = (dict)
        ```
        returns dict of addressbook vcards {hrefs: etags}
        """
        self._verify_client()
        addressbook = self.client.get_abook(addressbook_id)
        output = schema_out.new()
        output.addressbook = addressbook
        return output

    def get_addressbook_meta(self, addressbook_id, schema_out=None, user_session=None):
        """
        ```in
        addressbook_id = (S)
        ```
        ```out
        addressbook = (dict)
        ```
        returns dict of addressbook vcards {hrefs: etags}
        """
        self._verify_client()
        addressbook = self.client.get_abook(addressbook_id, get_meta=True)
        output = schema_out.new()
        output.addressbook = addressbook
        return output


    def delete_addressbook(self, href, user_session=None):
        """
        ```in
        href = (S)
        ```
        """
        self._verify_client()
        self.client.delete_abook(href)
        return True

    def add_vcard(self, vcard, href, user_session=None):
        """
        ```in
        vcard = (S)
        href = (S)
        ```
        Adds a new vcard to an address book
        """
        self._verify_client()
        self.client.upload_new_card(vcard, href)
        return True

    def get_vcard(self, href, user_session=None):
        """
        ```in
        href = (S)
        ```
        """
        self._verify_client()
        return self.client.get_vcard(href)

    def delete_vcard(self, href, etag=None, user_session=None):
        """
        ```in
        href = (S)
        etag = (S)
        ```
        if etag is provided will only delete if etag is matched
        """
        self._verify_client()
        if not etag:
            etag = None
        self.client.delete_vcard(href, etag)
        return True
    
    def find_vcards(self, text, addressbook_href, schema_out=None, user_session=None):
        """
        ```in
        text = (S)
        addressbook_href = (S)

        ```
        ```out
        vcards = (LS)
        ```
        """
        self._verify_client()
        if not addressbook_href:
            vcards = []
        else:
            vcards = self.client.find_vcards(text, addressbook_href)
        output = schema_out.new()
        output.vcards = vcards
        return output

    def update_vcard(self, vcard, href, etag=None, user_session=None):
        """
        ```in
        vcard = (S)
        href = (S)
        etag = (S)
        ```
        if etag is provided will only update if etag is matched
        """
        if not etag:
            etag = None
        self.update_vcard(vcard, href, etag)
        return True
