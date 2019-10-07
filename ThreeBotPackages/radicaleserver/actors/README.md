# Radicale actor

This actor acts as a client to communicate with a caldav server(particularly radicale server).

## Example usage

```python
# client being a gedis client instance
radicale = client.actors.radicale
# Need to login first before sending any other requests
radicale.login("username", "password")
radicale.list_calendars()
# ['cal1id', 'cal2id']

radicale.add_calendar("name_of_calendar", "calendar_id_auto_if_none")

radicale.get_calendar("calender_id)

# {'name': 'name_of_calendar',
# 'id': 'calender_id',
# 'url': 'http://127.0.0.1:8851/name_of_calendar/calender_id/',
# 'events': []}

radicale.add_event("calender_id", "event_uid", "summary of event", "epoch start time", "epoch end time")

# {'calendar_id': 'calender_id',
# 'uid': 'event_uid',
# 'summary': 'summary of event',
# 'dtstart': {epoch start time},
# 'dtend': {epoch end time},
# 'raw': 'BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//PYVOBJECT//NONSGML Version #1//EN\nBEGIN:VEVENT\nUID:event_uid\nDTSTART:20191007T104430Z\nDTEND:20191007T104530Z\nDTSTAMP:20191007T104430Z\nSUMMARY:summary of event\nEND:VEVENT\nEND:VCALENDAR\n'}

```

