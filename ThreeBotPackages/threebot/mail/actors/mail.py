from Jumpscale import j
import binascii
from io import BytesIO


class mail(j.baseclasses.threebot_actor):
    def _init(self, *args, **kwargs):
        bcdb = j.data.bcdb.get("mail")
        self.tft_ex_t = bcdb.model_get(url="mail.body.1")

    def send(self, to, body, schema_out=None, user_session=None):
        """
        ```in
        event = (O) !calendar.request.1
        ```

        ```out
        !tft.explorer.transaction.1
        ```

        """
    def get(self, date_from, date_to=None, schema_out=None, user_session=None):
    def get_latest(self, pagination_amount, page_num, schema_out=None, user_session=None):
    def reply(self, mail, reply, schema_out=None, user_session=None):
    def search(self,sender, full_text, date_from, date_to=None schema_out=None, user_session=None):
    def add_read_account(self, username, password,recovery_mail, schema_out=None, user_session=None):
    def add_post_account(self, username, password,recovery_mail, schema_out=None, user_session=None):
    def set_config(self, group_by, schema_out=None, user_session=None):
    def add_to_spam(self, mail,  schema_out=None, user_session=None):
    def add_to_trash(self, mail,  schema_out=None, user_session=None):
    def archive(self, mail,  schema_out=None, user_session=None):
    def clean_trash(self,schema_out=None, user_session=None):
