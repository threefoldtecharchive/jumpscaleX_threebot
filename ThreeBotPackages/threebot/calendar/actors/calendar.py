from Jumpscale import j
import binascii
from io import BytesIO


class calendar(j.baseclasses.threebot_actor):
    def _init(self, *args, **kwargs):
        bcdb = j.data.bcdb.get("calendar")
        self.tft_ex_t = bcdb.model_get(url="calendar.1")

    # Do we need these fonctions if we go through caldav ?
    """ def add(self, event, schema_out=None, user_session=None):

    def remove(self, event, schema_out=None, user_session=None):

    def update(self, event, schema_out=None, user_session=None):

    def accept(self, event, schema_out=None, user_session=None):

    def list_by_period(self, event, schema_out=None, user_session=None):  """
