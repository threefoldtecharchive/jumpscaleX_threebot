# calendar

## User Storie

As a 3bot owner I want to display and manage(add,modify,delete) a web calendar through the 3botApp so
that my calendar data will be stored on my 3bot but still accessible from my 3bot app

## Module Requirements

This module will allow :

- add a calendar
- add/modify/delete an event based on a date and a time
- add/modify/delete an alarm to an event
- list events based on a period (define by a From and To date-time)
- list all events of a calendar

## Technical Requirements

We will use the iCalendar [specs](https://www.kanzaki.com/docs/ical/) for the calendar, events and alarm objects.
We should be able to access the calendar through caldav.

Nice to have : grant other user/3bot read/write access to one calendar

- peoples attached
- location
- description
- link to ffconnect ?
- title

## Threebot Actors and Models

For external entities to be able to access that threebot tft explorer we must define some methods to be called via redis protocol.
This is what we call actors and lives in the actors folder. To have an overview on how to call it please refer to the test method in the factory file.
The structure of data during those client /server exchanges are called models and are defined as schema in the models folder.

to sum up an external client would call this threebot actors method through redis protocol exchanging data according to the models.

![3Bot module example with mail module](../doc/images/3bot_actors_models.jpg)

## RUN

to start the threebot server manually

```bash
kosmos -p 'j.servers.threebot.default.start(background=False,web=False)'
```

# actors

**`login`**

- input
 ```
 {
    "args": {
        "username": "admin",
        "password": "admin"
    }
 }
 ```


**`add_calendar`**

- input

     ```
     {
    "args":{
      "calendar": {
        "description":"description",
        "color": "#123abc",
        "display_name": "Calendar1"
      }
    }
}
    ```
- output
    ```
   {
    "calendar": {
        "calendar_id": "56785aa9-95bd-4e0f-872f-b621e80d1915",
        "user_id": "admin",
        "props": "{\"D:displayname\": \"Calendar1\", \"tag\": \"VCALENDAR\", \"C:calendar-description\": \"description\", \"ICAL:calendar-color\": \"#123abc\"}",
        "cache": "",
        "items": [],
        "type": "calendar",
        "display_name": "",
        "description": "description",
        "color": "#123abc",
        "id": 3
    }
}
    ```
**`list`**
- output
```

{
    "calendars": [

        {
            "calendar_id": "56785aa9-95bd-4e0f-872f-b621e80d1915",
            "user_id": "admin",
            "props": "{\"D:displayname\": \"Calendar1\", \"tag\": \"VCALENDAR\", \"C:calendar-description\": \"description\", \"ICAL:calendar-color\": \"#123abc\"}",
            "cache": "",
            "items": [],
            "type": "calendar",
            "display_name": "",
            "description": "description",
            "color": "#123abc",
            "id": 3
        }
    ]
}
```

***get**
- input
```
{
    "args":{
      "calendar_id": "e43050ae-bb01-42bd-8be5-9ecbc5ea98b7"
    	
    }
}
```

- output
```
{
    "calendar_id": "e43050ae-bb01-42bd-8be5-9ecbc5ea98b7",
    "user_id": "admin",
    "props": "{\"D:displayname\": \"Hi Jimber\", \"tag\": \"VCALENDAR\", \"C:calendar-description\": \"test@jimber.org\", \"ICAL:calendar-color\": \"tests@jimber.org\"}",
    "cache": "",
    "items": [],
    "type": "calendar",
    "display_name": "",
    "description": "test@jimber.org",
    "color": "tests@jimber.org",
    "id": 2
}
```

***delete**
- input
```
{
    "args":{
      "calendar_id": "e43050ae-bb01-42bd-8be5-9ecbc5ea98b7"
    	
    }
}
```


