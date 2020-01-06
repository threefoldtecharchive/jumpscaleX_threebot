import uuid
import datetime
from Jumpscale import j


class addressbook(j.baseclasses.threebot_actor):
    def _init(self, **kwargs):
        self.base_url = "http://{}:{}@127.0.0.1:8851"
        self.client = None
        self.book_model = self.bcdb.model_get(url="threebot.calendar.addressbook.1")
        self.contact_model = self.bcdb.model_get(url="threebot.calendar.contact.1")
        self.addressbook_model = self.bcdb.model_get(url="threebot.calendar.addressbook.1")

    def _get_vcard_from_contact(self, contact):
        import vobject

        vcard = vobject.vCard()

        uid_ = str(uuid.uuid4())

        # uid
        vcard.add("uid")
        vcard.uid.value = uid_

        # names
        vcard.add("n")
        vcard.n.value = vobject.vcard.Name(family=contact.familyname, given=contact.givenname)

        # full name
        vcard.add("fn")
        vcard.fn.value = contact.givenname + " " + contact.familyname

        # notes
        if contact.notes:
            vcard.add("NOTE")
            vcard.note.value = contact.notes

        # spouse
        if contact.spouse:
            spouse = vcard.add("X-EVOLUTION-SPOUSE")
            spouse.value = contact.spouse

        # birthday
        if contact.birthday:
            bd = vcard.add("bday")
            bd.value = datetime.datetime.fromtimestamp(contact.birthday).date().strftime("%Y-%m-%d")

        # anniversary
        if contact.anniversary:
            an = vcard.add("X-EVOLUTION-ANNIVERSARY")
            an.value = datetime.datetime.fromtimestamp(contact.anniversary).date().strftime("%Y-%m-%d")

        # nickname
        if contact.nickname:
            nm = vcard.add("NICKNAME")
            nm.value = contact.nickname

        # categories
        if contact.categories:
            cats = vcard.add("CATEGORIES")
            cats.value = contact.categories

        # calendar
        if contact.calendar_url:
            cal = vcard.add("CALURI")
            cal.value = contact.calendar_url

        # facebook
        if contact.facebook:
            fb = vcard.add("FBURL")
            fb.value = contact.facebook

        # job

        org = vcard.add("org")
        org.value = [contact.job.company, contact.job.department, contact.job.office]

        # title
        if contact.job.title:
            t = vcard.add("title")
            t.value = contact.job.title

        if contact.job.profession:
            profession = vcard.add("pro")
            profession.value = contact.job.profession

        if contact.job.profession:
            role = vcard.add("role")
            role.value = contact.job.profession

        if contact.job.assistant:
            assistant = vcard.add("X-EVOLUTION-ASSISTANT")
            assistant.value = contact.job.assistant

        if contact.job.manager:
            man = vcard.add("X-EVOLUTION-MANAGER")
            man.value = contact.job.manager

        # homepage
        if contact.homepage:
            hp = vcard.add("URL")
            hp.value = contact.homepage

        # blog
        if contact.blog:
            b = vcard.add("x-evolution-blog-url")
            b.value = contact.blog

        # video chat
        if contact.videchat:
            vc = vcard.add("x-evolution-video-url")
            vc.value = contact.videchat

        # emails
        for email in contact.emails:
            e = vcard.add("email")
            e.value = email.email
            e.type_param = email.type

        # telephones
        for telephone in contact.telephones:
            t = vcard.add("tel")
            t.value = telephone.telephone
            t.type_param = [telephone.type, "VOICE"]

        # Instant messaging
        for im in contact.ims:
            i = vcard.add(f"X-{im.type}")
            i.value = im.username

        for ma in contact.mailaddresses:
            a = vcard.add("ADR")
            a.type_param = ma.type
            a.value = vobject.vcard.Address(
                street=ma.street,
                city=ma.city,
                region=ma.region,
                code=ma.code,
                country=ma.country,
                box=ma.box,
                extended=ma.extended,
            )

        return vcard

    @j.baseclasses.actor_method
    def login(self, username, password, user_session=None):
        """
        ```in
        username = (S)
        password = (S)
        ```
        currentlly any username and password will work
        """

        url = self.base_url.format(username, password)
        self.client = j.clients.carddav.get(resource=url, user=username)
        self.user = username

    def _verify_client(self):
        if not self.client:
            raise j.exceptions.Runtime("Use login method to enable the actor")

    @j.baseclasses.actor_method
    def add(self, addressbook, schema_out=None, user_session=None):
        """
        ```in
        addressbook = (O) !threebot.calendar.addressbook.1
        ```
        ```out
        addressbook = (O) !threebot.calendar.addressbook.1
        ```
        """
        self._verify_client()
        uuid_ = str(uuid.uuid4())
        self.client.create_abook(addressbook.display_name, addressbook.description, uuid_, addressbook.color)
        a = self.book_model.find(addressbook_id=uuid_)[0]
        a.color = addressbook.color
        a.description = addressbook.description
        a.display_name = addressbook.display_name
        props = j.data.serializers.json.loads(a.props)
        props["CR:addressbook-description"] = addressbook.description
        props["displayname"] = addressbook.display_name
        props["{http://inf-it.com/ns/ab/}addressbook-color"] = addressbook.color
        a.props = j.data.serializers.json.dumps(props)
        a.save()

        output = schema_out.new()
        output.addressbook = a
        return output

    @j.baseclasses.actor_method
    def get(self, addressbook_id, schema_out=None, user_session=None):
        """
        ```in
        addressbook_id = (S)
        ```
        ```out
        calendar = !threebot.calendar.addressbook.1
        ```
        """
        self._verify_client()
        addressbooks = self.book_model.find(addressbook_id=addressbook_id)
        if not addressbooks:
            raise j.exceptions.NotFound(f"Couldn't find addressbook with id: {addressbook_id}")
        return addressbooks[0]

    @j.baseclasses.actor_method
    def delete(self, addressbook_id, user_session=None):
        """
        ```in
        addressbook_id = (S)
        ```
        """
        self._verify_client()
        addressbooks = self.book_model.find(addressbook_id=addressbook_id)
        if addressbooks:
            self.client.delete_abook(f"/{self.user}/{addressbook_id}")

    def list(self, schema_out=None, user_session=None):
        """
        ```out
        addressbooks = (LO) !threebot.calendar.addressbook.1
        ```
        """
        self._verify_client()
        output = schema_out.new()
        output.addressbooks = self.book_model.find()
        return output

    @j.baseclasses.actor_method
    def add_contact(self, contact, schema_out=None, user_session=None):
        """
        ```in
        contact = (O) !threebot.calendar.contact.1
        ```
        ```out
        contact = (O) !threebot.calendar.contact.1
        ```
        """
        self._verify_client()

        vcard = self._get_vcard_from_contact(contact)
        uid_ = vcard.uid.value
        res = self.client.upload_new_card(vcard.serialize(), f"/{self.user}/{contact.addressbook_id}/{uid_}")

        item_id = res[0].split("/")[-1]

        return self.contact_model.find(item_id=item_id)[0]

    @j.baseclasses.actor_method
    def get_contact(self, contact_id, schema_out=None, user_session=None):
        """
        ```in
        contact_id = (S)
        ```
        ```out
        contact = (O) !threebot.calendar.contact.1
        ```
        """
        self._verify_client()
        contacts = self.contact_model.find(contact_id=contact_id)
        if not contacts:
            raise j.exceptions.NotFound(f"Couldn't find contact with id: {contact_id}")
        return contacts[0]

    @j.baseclasses.actor_method
    def delete_contact(self, contact_id, user_session=None):
        """
        ```in
        contact_id = (S)
        ```
        """
        self._verify_client()
        contacts = self.contact_model.find(contact_id=contact_id)
        if not contacts:
            raise j.exceptions.NotFound(f"Couldn't find contact with id: {contact_id}")
        contact = contacts[0]
        self.client.delete_vcard(f"/{self.user}/{contact.addressbook_id}/{contact.item_id}", None)

    @j.baseclasses.actor_method
    def list_contacts(self, contact, schema_out=None, user_session=None):
        """
        ```in
        contact = (O) !threebot.calendar.contact.1
        ```
        ```out
        contacts = (LO) !threebot.calendar.contact.1
        ```
        """
        output = schema_out.new()
        addressbooks = self.addressbook_model.find(addressbook_id=contact.addressbook_id)
        if not addressbooks:
            return output

        addressbook = addressbooks[0]
        result = []
        for item in addressbook.items:

            if contact.title and contact.title != item.title:
                continue
            if contact.familyname and contact.familyname != item.familyname:
                continue
            if contact.givenname and contact.givenname != item.givenname:
                continue
            if contact.nickname and contact.nickname != item.nickname:
                continue
            if contact.homepage and contact.homepage != item.homepage:
                continue
            if contact.videchat and contact.videchat != item.videchat:
                continue
            if contact.blog and contact.blog != item.blog:
                continue
            if contact.facebook and contact.facebook != item.facebook:
                continue
            if contact.calendar_url and contact.calendar_url != item.calendar_url:
                continue
            if contact.anniversary and contact.anniversary != item.anniversary:
                continue
            if contact.notes and contact.notes != item.notes:
                continue
            if contact.spouse and contact.spouse != item.spouse:
                continue
            if contact.birthday and contact.birthday != item.birthday:
                continue
            if contact.contact_id and contact.contact_id != item.contact_id:
                continue

            if contact.categories:
                for category in contact.categories:
                    if category in item.categories:
                        break
                else:
                    continue

            if contact.emails:
                for email in contact.emails:
                    if email.email in [x.email for x in item.emails]:
                        break
                else:
                    continue

            if contact.telephones:
                for telephone in contact.telephones:
                    if telephone.telephone in [x.telephone for x in item.telephones]:
                        break
                else:
                    continue

            if contact.ims:
                for im in contact.ims:
                    if im.type and im.type in [x.type for x in item.ims]:
                        break
                    if im.username and im.username in [x.username for x in item.ims]:
                        break
                else:
                    continue

            if contact.job.manager and contact.job.manager != item.job.manager:
                continue
            if contact.job.profession and contact.job.profession != item.job.profession:
                continue
            if contact.job.company and contact.job.company != item.job.company:
                continue
            if contact.job.office and contact.job.office != item.job.office:
                continue
            if contact.job.assistant and contact.job.assistant != item.job.assistant:
                continue
            if contact.job.title and contact.job.title != item.job.title:
                continue
            if contact.job.department and contact.job.department != item.job.department:
                continue

            if contact.mailaddresses:
                for add in contact.mailaddresses:
                    if add.street and add.street in [x.street for x in item.mailaddresses]:
                        break
                    if add.city and add.city in [x.city for x in item.mailaddresses]:
                        break
                    if add.country and add.country in [x.country for x in item.mailaddresses]:
                        break
                    if add.code and add.code in [x.code for x in item.mailaddresses]:
                        break
                    if add.region and add.region in [x.region for x in item.mailaddresses]:
                        break
                    if add.box and add.box in [x.box for x in item.mailaddresses]:
                        break
                    if add.code and add.code in [x.code for x in item.mailaddresses]:
                        break
                else:
                    continue

            result.append(item)
        output.contacts = result
        return output

    @j.baseclasses.actor_method
    def update_contact(self, contact, schema_out=None, user_session=None):
        """
        ```in
        contact = (O) !threebot.calendar.contact.1
        ```
        ```out
        contact = (O) !threebot.calendar.contact.1
        ```
        """
        contacts = self.contact_model.find(contact_id=contact.contact_id)
        if not contacts:
            raise j.exceptions.NotFound(f"Couldn't find contact with id: {contact.contact_id}")
        c = contacts[0]

        old = vobject.readOne(c.content)
        uid_ = old.uid.value

        vcard = self._get_vcard_from_contact(contact)
        # restore old UID
        vcard.uid.value = uid_
        self.client.update_vcard(vcard.serialize(), f"/{self.user}/{c.addressbook_id}/{c.item_id}", None)
        return self.contact_model.find(item_id=c.item_id)[0]
