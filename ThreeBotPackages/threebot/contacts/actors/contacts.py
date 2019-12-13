from Jumpscale import j


class contacts(j.baseclasses.threebot_actor):
    def _init(self, *args, **kwargs):
        bcdb = j.data.bcdb.get("contacts")
        self.contact_model = bcdb.model_get(url="threebot.contacts.contact.1")

    def _get_contact(self, contact_id):
        try:
            return self.contact_model.get(contact_id)
        except j.exceptions.NotFound:
            raise j.exceptions.NotFound("Contact %s not found" % contact_id)

    def _validate_contact(self, contact):
        for field in ["firstname", "lastname"]:
            if not getattr(contact, field):
                raise j.exceptions.Value("%s is required" % field)

    @j.baseclasses.actor_method
    def put(self, contact, schema_out=None, user_session=None):
        """
        ```in
        contact = (O) !threebot.contacts.contact.1
        ```

        ```out
        contact  = (O) !threebot.contacts.contact.1
        ```
        """
        self._validate_contact(contact)

        if getattr(contact, "id"):
            self._get_contact(contact.id)
            self.contact_model.set_dynamic(contact._ddict, obj_id=contact.id)
        else:
            contact = self.contact_model.new(contact)
            contact.save()

        res = schema_out.new()
        res.contact = contact
        return res

    @j.baseclasses.actor_method
    def get(self, contact_id, schema_out=None, user_session=None):
        """
        ```in
        contact_id = (I)
        ```

        ```out
        contact = (O) !threebot.contacts.contact.1
        ```
        """
        return self._get_contact(contact_id)

    @j.baseclasses.actor_method
    def list(self, firstname, lastname, schema_out=None, user_session=None):
        """
        ```in
        firstname = (S)
        lastname = (S)
        ```

        ```out
        contacts = (LO) !threebot.contacts.contact.1
        ```
        """

        out = schema_out.new()
        for contact in self.contact_model.iterate():
            if firstname != "" and contact.firstname != firstname:
                continue
            if lastname != "" and contact.lastname != lastname:
                continue
            out.contacts.append(contact)
        return out

    @j.baseclasses.actor_method
    def remove(self, contact_id, schema_out=None, user_session=None):
        """
        ```in
        contact_id = (I)
        ```

        ```out
        success = (B)
        ```
        """
        contact = self._get_contact(contact_id)
        contact.delete()

        out = schema_out.new()
        out.success = True
        return out

    # share or send ?
    @j.baseclasses.actor_method
    def share(self, contact, schema_out=None, user_session=None):
        pass

    # done by list?
    @j.baseclasses.actor_method
    def list_by_name(self, name, schema_out=None, user_session=None):
        pass

    # done by list?
    @j.baseclasses.actor_method
    def search_by_name(self, name, schema_out=None, user_session=None):
        pass

    # todo implement global search
    @j.baseclasses.actor_method
    def search(self, text, schema_out=None, user_session=None):
        pass
