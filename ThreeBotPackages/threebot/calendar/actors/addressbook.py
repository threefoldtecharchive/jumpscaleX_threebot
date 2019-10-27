import uuid
import datetime
from Jumpscale import j
import vobject




class addressbook(j.baseclasses.threebot_actor):
    def _init(self, **kwargs):
        self.base_url = "http://{}:{}@127.0.0.1:8851"
        self.client = None
        bcdb = j.data.bcdb.get("caldav")
        self.book_model = bcdb.model_get(url="tf.caldav.addressbook.1")
        self.contact_model = bcdb.model_get(url="tf.caldav.contact.1")

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

    def add(self, addressbook, schema_out=None, user_session=None):
        """
        ```in
        addressbook = (O) !tf.caldav.addressbook.1
        ```
        ```out
        addressbook = (O) !tf.caldav.addressbook.1
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
        props['CR:addressbook-description'] = addressbook.description
        props["displayname"] = addressbook.display_name
        props["{http://inf-it.com/ns/ab/}addressbook-color"] = addressbook.color
        a.props = j.data.serializers.json.dumps(props)
        a.save()

        output = schema_out.new()
        output.addressbook = a
        return output

    def get(self, addressbook_id, schema_out=None, user_session=None):
        """
        ```in
        addressbook_id = (S)
        ```
        ```out
        calendar = !tf.caldav.addressbook.1
        ```
        """
        self._verify_client()
        addressbooks = self.book_model.find(addressbook_id=addressbook_id)
        if not addressbooks:
            raise j.exceptions.NotFound(f"Couldn't find addressbook with id: {addressbook_id}")
        return addressbooks[0]

    def delete(self, addressbook_id, user_session=None):
        """
        ```in
        addressbook_id = (S)
        ```
        """
        self._verify_client()
        addressbooks = self.book_model.find(addressbook_id=addressbook_id)
        if addressbooks:
            self.client.delete_abook(f'/{self.user}/{addressbook_id}')

    def list(self, schema_out=None, user_session=None):
        """
        ```out
        addressbooks = (LO) !tf.caldav.addressbook.1
        ```
        """
        self._verify_client()
        output = schema_out.new()
        output.addressbooks = self.book_model.find()
        return output

    def add_contact(self, contact, schema_out=None, user_session=None):
        """
        ```in
        contact = (O) !tf.caldav.contact.1
        ```
        ```out
        contact = (O) !tf.caldav.contact.1
        ```
        """
        self._verify_client()

        vcard = vobject.vCard()

        uid_ = str(uuid.uuid4())

        # uid
        vcard.add('uid')
        vcard.uid.value = uid_

        # names
        vcard.add('n')
        vcard.n.value = vobject.vcard.Name(family=contact.familyname, given=contact.givenname)

        # full name
        vcard.add('fn')
        vcard.fn.value = contact.givenname + ' ' + contact.familyname

        # notes
        if contact.notes:
            vcard.add('NOTE')
            vcard.note.value = contact.notes

        # spouse
        if contact.spouse:
            spouse = vcard.add('X-EVOLUTION-SPOUSE')
            spouse.value = contact.spouse

        # birthday
        if contact.birthday:
            bd = vcard.add('bday')
            bd.value = datetime.datetime.fromtimestamp(contact.birthday).date().strftime('%Y-%m-%d')

        # anniversary
        if contact.anniversary:
            an = vcard.add('X-EVOLUTION-ANNIVERSARY')
            an.value = datetime.datetime.fromtimestamp(contact.anniversary).date().strftime('%Y-%m-%d')

        # nickname
        if contact.nickname:
            nm = vcard.add('NICKNAME')
            nm.value = contact.nickname

        # categories
        if contact.categories:
            cats = vcard.add('CATEGORIES')
            cats.value = contact.categories

        # calendar
        if contact.calendar_url:
            cal = vcard.add('CALURI')
            cal.value = contact.calendar_url

        # facebook
        if contact.facebook:
            fb = vcard.add('FBURL')
            fb.value = contact.facebook

        # job

        org = vcard.add('org')
        org.value = [contact.job.company, contact.job.department, contact.job.office]

        # title
        if contact.job.title:
            t = vcard.add('title')
            t.value = contact.job.title

        if contact.job.profession:
            profession = vcard.add('pro')
            profession.value = contact.job.profession

        if contact.job.profession:
            role = vcard.add('role')
            role.value = contact.job.profession

        if contact.job.assistant:
            assistant = vcard.add('X-EVOLUTION-ASSISTANT')
            assistant.value = contact.job.assistant

        if contact.job.manager:
            man = vcard.add('X-EVOLUTION-MANAGER')
            man.value = contact.job.manager

        # homepage
        if contact.homepage:
            hp = vcard.add('URL')
            hp.value = contact.homepage

        # blog
        if contact.blog:
            b = vcard.add('x-evolution-blog-url')
            b.value = contact.blog

        # video chat
        if contact.videchat:
            vc = vcard.add('x-evolution-video-url')
            vc.value = contact.videchat

        # emails
        for email in contact.emails:
            e = vcard.add('email')
            e.value = email.email
            e.type_param = email.type

        # telephones
        for telephone in contact.telephones:
            t = vcard.add('tel')
            t.value = telephone.telephone
            t.type_param = [telephone.type, 'VOICE']

        # Instant messaging
        for im in contact.ims:
            i = vcard.add(f"X-{im.type}")
            i.value = im.username

        for ma in contact.mailaddresses:
            a = vcard.add('ADR')
            a.type_param = ma.type
            a.value = vobject.vcard.Address(
                street=ma.street,
                city=ma.city,
                region=ma.region,
                code = ma.code,
                country=ma.country,
                box=ma.box,
                extended=ma.extended
            )

        res = self.client.upload_new_card(vcard.serialize(), f'/{self.user}/{contact.addressbook_id}/{uid_}')

        item_id = res[0].split('/')[-1]

        c = self.contact_model.find(item_id=item_id)[0]
        c.contact_id = uid_
        c.title = contact.title
        c.givenname = contact.givenname
        c.familyname = contact.familyname
        c.categories = contact.categories
        c.emails = contact.emails
        c.nickname = contact.nickname
        c.telephones = contact.telephones
        c.certificates = contact.certificates
        c.mailaddresses = contact.mailaddresses
        c.anniversary = contact.anniversary
        c.birthday = contact.birthday
        c.spouse = contact.spouse
        c.notes = contact.notes
        c.picture = contact.picture
        c.job = contact.job
        c.calendar_url = contact.calendar_url
        c.facebook = contact.facebook
        c.homepage = contact.homepage
        c.blog = contact.blog
        c.videchat = contact.videchat
        c.save()
        return c

    def get_contact(self, contact_id, schema_out=None, user_session=None):
        """
        ```in
        contact_id = (S)
        ```
        ```out
        contact = (O) !tf.caldav.contact.1
        ```
        """
        self._verify_client()
        contacts = self.contact_model.find(contact_id=contact_id)
        if not contacts:
            raise j.exceptions.NotFound(f"Couldn't find contact with id: {contact_id}")
        return contacts[0]

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
        self.client.delete_vcard(f'/{self.user}/{contact.addressbook_id}/{contact.item_id}', None)

    def find_vcards(self, text, addressbook_href, schema_out=None, user_session=None):
        """
        ```in
        text = (S)
        addressbook_href = (S)

        ```
        ```out
        vcards = (LS)
        ```
        text to search with
        addressbook_href: user/addressbook_id for the addressbook you want to search in
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
        vcard is vcard in standard format
        href is user/addressbook_id/vcard_id
        """
        if not etag:
            etag = None
        self.update_vcard(vcard, href, etag)
        return True
