from Jumpscale import j
import binascii
from io import BytesIO


class contact(j.baseclasses.threebot_actor):
    def _init(self, *args, **kwargs):
        bcdb = j.data.bcdb.get("contacts")
        self.model = bcdb.model_get(url="contact.request.1")

    def add(self, contact, schema_out=None, user_session=None):
        """
        ```in
        contact = (O) !calendar.people.1
        ```

        """
        print(contact)
        contact.save()

        response = {"result": "saved"}
        return j.data.serializers.json.dumps(response)

    def get(self, schema_out=N):
        contacts = self.model.find()

        res = []

        for c in contacts:
            # print("User: ", user)
            print(c)
            res.append("test")

        return j.data.serializers.json.dumps(res)

    def remove(self, contact, schema_out=None, user_session=None):
        pass

    def update(self, contact, schema_out=None, user_session=None):
        pass

    # share or send ?
    def share(self, contact, schema_out=None, user_session=None):
        pass

    def list_by_name(self, name, schema_out=None, user_session=None):
        pass

    def search_by_name(self, name, schema_out=None, user_session=None):
        pass

    def search(self, text, schema_out=None, user_session=None):
        pass
