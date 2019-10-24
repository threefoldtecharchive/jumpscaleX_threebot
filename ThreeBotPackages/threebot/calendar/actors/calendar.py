import uuid

import caldav
import vobject
import datetime
from Jumpscale import j


class calendar(j.baseclasses.threebot_actor):
    def _init(self, **kwargs):
        self.base_url = "http://{}:{}@127.0.0.1:8851"
        self.client = None
        bcdb = j.data.bcdb.get("caldav")
        self.calendar_model = bcdb.model_get(url="tf.caldav.calendar.1")

    def _verfiy_time(self, dtstart, dtend, user_session=None):
        if not (dtstart and dtend):
            raise j.exceptions.Input("Need to set set both dtstart and dtend")
        if dtstart > dtend:
            raise j.exceptions.Input("dtstart needs to be before dtend")

    def login(self, username, password, user_session=None):
        """
        ```in
        username = (S)
        password = (S)
        ```
        """
        url = self.base_url.format(username, password)
        client = caldav.DAVClient(url)
        self.client = client.principal()

    def _verify_client(self):
        if not self.client:
            raise j.exceptions.Runtime("Use login method to enable the actor")

    def _get_calendar(self, cal_id, raise_error=True):
        for calendar in self.client.calendars():
            if j.sal.fs.getBaseName(calendar.canonical_url) == cal_id:
                return calendar
        if raise_error:
            raise j.exceptions.NotFound(f"Couldn't find calendar with id: {cal_id}")

    def _get_event_object(self, cal_id, uid, user_session=None):
        calendar = self._get_calendar(cal_id)
        try:
            event = calendar.event_by_uid(uid)
        except caldav.error.NotFoundError:
            raise j.exceptions.NotFound(f"Couldn't find event with uid: {uid}")
        return event

    def _get_event_dict(self, cal_id, uid):
        self._verify_client()
        event = self._get_event_object(cal_id, uid)

        event_dict = self._dictify_event(event)
        return event_dict

    def _dictify_event(self, event):
        event_dict = {
            "calendar_id": j.sal.fs.getBaseName(event.parent.canonical_url),
            "uid": event.vobject_instance.vevent.uid.value,
            "summary": event.vobject_instance.vevent.summary.value,
            "dtstart": int(event.vobject_instance.vevent.dtstart.value.timestamp()),
            "dtend": int(event.vobject_instance.vevent.dtend.value.timestamp()),
            "raw": event.data,
        }
        return event_dict

    def add(self, calendar, schema_out=None, user_session=None):
        """
        ```in
        calendar = (O) !tf.caldav.calendar.1
        ```
        ```out
        calendar = (O) !tf.caldav.calendar.1
        ```
        """
        self._verify_client()
        uuid_ = str(uuid.uuid4())
        self.client.make_calendar(calendar.display_name, uuid_)

        c = self.calendar_model.find(calendar_id=uuid_)[0]
        c.color = calendar.color
        c.description = calendar.description
        props = j.data.serializers.json.loads(c.props)
        props['C:calendar-description'] = calendar.description
        props["ICAL:calendar-color"] = calendar.color
        c.props = j.data.serializers.json.dumps(props)
        c.save()
        output = schema_out.new()
        output.calendar = c
        return output

    def get(self, calendar_id, schema_out=None, user_session=None):
        """
        ```in
        calendar_id = (S)
        ```
        ```out
        calendar = !tf.caldav.calendar.1
        ```
        """
        self._verify_client()
        calendars = self.calendar_model.find(calendar_id=calendar_id)
        if not calendars:
            raise j.exceptions.NotFound(f"Couldn't find calendar with id: {calendar_id}")
        return calendars[0]

    def delete(self, calendar_id, user_session=None):
        """
        ```in
        calendar_id = (S)
        ```
        """
        self._verify_client()
        calendar = self._get_calendar(calendar_id, raise_error=False)
        if calendar:
            calendar.delete()

    def list(self, schema_out=None, user_session=None):
        """
        ```out
        calendars = (LO) !tf.caldav.calendar.1
        ```
        """
        self._verify_client()
        output = schema_out.new()
        output.calendars = self.calendar_model.find()
        return output

    def add_event(self, cal_id, uid, summary, dtstart, dtend, schema_out=None, user_session=None):
        """
        ```in
        cal_id = (S)
        uid = (S)
        summary = (S)
        dtstart = (I)
        dtend = (I)
        ```
        ```out
        event = (dict)
        ```
        This actor method is used to add event (only used to add invitation)
        """
        self._verify_client()
        self._verfiy_time(dtstart, dtend)
        calendar = self._get_calendar(cal_id)
        cal_object = vobject.iCalendar()

        cal_object.add("vevent")
        cal_object.vevent.add("uid").value = uid
        cal_object.vevent.add("summary").value = summary

        utc = vobject.icalendar.utc
        start = cal_object.vevent.add("dtstart")
        start.value = datetime.datetime.fromtimestamp(dtstart, utc)
        end = cal_object.vevent.add("dtend")
        end.value = datetime.datetime.fromtimestamp(dtend, utc)

        output = schema_out.new()
        calendar.add_event(cal_object.serialize())
        output.event = self._get_event_dict(cal_id, uid)
        return output

    def search_events(self, cal_id, start, end, schema_out=None, user_session=None):
        """
        ```in
        cal_id = (S)
        start = (T)
        end = (T)
        ```
        ```out
        events = (LS)
        ```
        """
        calendar = self._get_calendar(cal_id)
        events = calendar.date_search(datetime.datetime.fromtimestamp(start), datetime.datetime.fromtimestamp(end))
        output = schema_out.new()
        output.events = [j.sal.fs.getBaseName(event.canonical_url).split(".")[0] for event in events]
        return output
        





    def get_event(self, cal_id, uid, schema_out=None, user_session=None):
        """
        ```in
        cal_id = (S)
        uid = (S)
        ```
        ```out
        event = (dict)
        ```
        """
        output = schema_out.new()
        output.event = self._get_event_dict(cal_id, uid)
        return output


    def delete_event(self, cal_id, uid, user_session=None):
        """
        ```in
        cal_id = (S)
        uid = (S)
        ```
        """
        self._verify_client()
        calendar = self._get_calendar(cal_id)
        try:
            event = calendar.event_by_uid(uid)
            event.delete()
        except caldav.error.NotFoundError:
            pass

    def list_events(self, cal_id, schema_out=None, user_session=None):
        """
        ```in
        cal_id = (S)
        ```
        ```out
        events = (LS)
        ```
        """
        self._verify_client()
        calendar = self._get_calendar(cal_id)
        output = schema_out.new()
        output.events = [j.sal.fs.getBaseName(event.canonical_url).split(".")[0] for event in calendar.events()]
        return output

    def edit_event(self, cal_id, uid, summary=None, dtstart=None, dtend=None, schema_out=None, user_session=None):
        """
        ```in
        cal_id = (S)
        uid = (S)
        summary = (S)
        dtstart = (I)
        dtend = (I)
        ```
        ```out
        event = (dict)
        ```
        """
        self._verify_client()
        self._verfiy_time(dtstart, dtend)
        data = locals()
        props = ["summary", "dtstart", "dtend"]
        calendar = self._get_calendar(cal_id)
        event = self._get_event_object(cal_id, uid)
        cal_object = vobject.readOne(event.data)
        for prop in props:
            value = data[prop]
            if value:
                if prop.startswith("dt"):
                    value = datetime.datetime.fromtimestamp(value, vobject.icalendar.utc)
                getattr(cal_object.vevent, prop).value = value
        event = calendar.add_event(cal_object.serialize())
        output = schema_out.new()
        output.event = self._get_event_dict(cal_id, uid)
        return output
