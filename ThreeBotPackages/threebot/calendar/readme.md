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

## Calendar

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

**add_event**
- input
```
{
    "args":{
      "event": {
        "description":"desco",
        "title": "title",
        "location": "locas",
        "dtstart": 1571933731,
        "dtend": 1571933750,
        "calendar_id": "f74cc3e7-be95-4eaf-a48d-02edfa777754"
      }
    }
}

```

- output

```
{
    "item_id": "a23672a5-4bce-4282-89e6-8487adf38bf9.ics",
    "user_id": "admin",
    "calendar_id": "f74cc3e7-be95-4eaf-a48d-02edfa777754",
    "content": "BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//PYVOBJECT//NONSGML Version 1//EN\r\nBEGIN:VEVENT\r\nUID:a23672a5-4bce-4282-89e6-8487adf38bf9\r\nDTSTART:20191024T161531Z\r\nDTEND:20191024T161550Z\r\nDESCRIPTION:desco\r\nDTSTAMP:20191024T163030Z\r\nLOCATION:locas\r\nSUMMARY:title\r\nEND:VEVENT\r\nEND:VCALENDAR\r\n",
    "epoch": 1571934630,
    "dtstart": 1571933731,
    "dtend": 1571933750,
    "type": "VEVENT",
    "timezone": "UTC",
    "title": "title",
    "description": "desco",
    "location": "locas",
    "attachments": [],
    "id": 3
}
```

**get_event**

- input
```
{
    "args":{
    
    	"event_id": "a23672a5-4bce-4282-89e6-8487adf38bf9.ics"
    }
}
```

- output
```
{
    "item_id": "a23672a5-4bce-4282-89e6-8487adf38bf9.ics",
    "user_id": "admin",
    "calendar_id": "f74cc3e7-be95-4eaf-a48d-02edfa777754",
    "content": "BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//PYVOBJECT//NONSGML Version 1//EN\r\nBEGIN:VEVENT\r\nUID:a23672a5-4bce-4282-89e6-8487adf38bf9\r\nDTSTART:20191024T161531Z\r\nDTEND:20191024T161550Z\r\nDESCRIPTION:desco\r\nDTSTAMP:20191024T163030Z\r\nLOCATION:locas\r\nSUMMARY:title\r\nEND:VEVENT\r\nEND:VCALENDAR\r\n",
    "epoch": 1571934630,
    "dtstart": 1571933731,
    "dtend": 1571933750,
    "type": "VEVENT",
    "timezone": "UTC",
    "title": "title",
    "description": "desco",
    "location": "locas",
    "attachments": [],
    "id": 3
}
```

**list_events**

list/filters
choose one or more of these fields provided to filter against
you can filter by 
- start/end datetimes  (epochs)
- timezone
- location
- description
- title
```
{
    "args":{
      "event": {
        "calendar_id": "f5f05de8-d354-4dc3-96c1-1ab62f427c70",
        "title": "title2",
        "dtstart": 157193373,
        "dtend":1571933750,
        "timezone": "UTC",
         "location": "locas2",
         "description": "desco2"

      }
    }
}

```

- example

```
{
    "args":{
      "event": {
        "calendar_id": "f74cc3e7-be95-4eaf-a48d-02edfa777754"
      }
    }
}
```

- output
```
{
    "events": [] # Not found!
}
```

**delete_event**

- input
```
{
    "args":{
    
    	"event_id": "a23672a5-4bce-4282-89e6-8487adf38bf9.ics",
    	"calendar_id": "f74cc3e7-be95-4eaf-a48d-02edfa777754"
    }
}

```

**edit_event**

- input
```
{
    "args":{
      "event": {
        "description":"desco3",
        "title": "title3",
        "location": "locas3",
        "dtstart": 1571933731,
        "dtend": 1571933750,
        "calendar_id": "f5f05de8-d354-4dc3-96c1-1ab62f427c70",
        "item_id": "caa7d6bf-dfbc-4f65-99a4-ae3ed010adf2.ics",
        "timezone": "Africa/Cairo"
      }
    }
}
```

- output

```
{
    "item_id": "caa7d6bf-dfbc-4f65-99a4-ae3ed010adf2.ics",
    "user_id": "",
    "calendar_id": "f5f05de8-d354-4dc3-96c1-1ab62f427c70",
    "content": "",
    "epoch": 0,
    "dtstart": 1571933731,
    "dtend": 1571933750,
    "type": "",
    "timezone": "Africa/Cairo",
    "title": "title3",
    "description": "desco3",
    "location": "locas3",
    "attachments": []
}
```



## Addressbook

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
 
 
**add**

- input
```
{
    "args":{
      "addressbook": {
        "description":"description3",
        "color": "#123abc",
        "display_name": "Calendar3"
      }
    }
    }
```

- output

```
{
    "addressbook": {
        "addressbook_id": "f728abc6-eaa0-4ced-a3ce-91f4e309eb2a",
        "user_id": "admin",
        "props": "{\"CR:addressbook-description\": \"description3\", \"D:displayname\": \"Calendar3\", \"tag\": \"VADDRESSBOOK\", \"{http://inf-it.com/ns/ab/}addressbook-color\": \"#123abc\", \"displayname\": \"Calendar3\"}",
        "cache": "",
        "items": [],
        "type": "addressbook",
        "display_name": "Calendar3",
        "description": "description3",
        "color": "#123abc",
        "id": 7
    }
}
```

**get**

- input

```
{
    "args":{
    
    	"addressbook_id": "f728abc6-eaa0-4ced-a3ce-91f4e309eb2a"
    }
}
```

- output

```
{
    "addressbook_id": "f728abc6-eaa0-4ced-a3ce-91f4e309eb2a",
    "user_id": "admin",
    "props": "{\"CR:addressbook-description\": \"description3\", \"D:displayname\": \"Calendar3\", \"tag\": \"VADDRESSBOOK\", \"{http://inf-it.com/ns/ab/}addressbook-color\": \"#123abc\", \"displayname\": \"Calendar3\"}",
    "cache": "",
    "items": [],
    "type": "addressbook",
    "display_name": "Calendar3",
    "description": "description3",
    "color": "#123abc",
    "id": 7
}

```

**list**

- output

```
{
    "addressbooks": [
        {
            "addressbook_id": "a37f360e-0cec-4ce6-a83f-0baed49fc6b1",
            "user_id": "as",
            "props": "{\"CR:addressbook-description\": \"description\", \"D:displayname\": \"Calendar1\", \"tag\": \"VADDRESSBOOK\", \"{http://inf-it.com/ns/ab/}addressbook-color\": \"#123abc\"}",
            "cache": "",
            "items": [],
            "type": "addressbook",
            "display_name": "",
            "description": "",
            "color": "",
            "id": 5
        },
        {
            "addressbook_id": "e76780b9-e302-cf02-ca3a-c0b3e78b17be",
            "user_id": "admin",
            "props": "{\"CR:addressbook-description\": \"dodo\", \"D:displayname\": \"soso\", \"tag\": \"VADDRESSBOOK\", \"{http://inf-it.com/ns/ab/}addressbook-color\": \"#0f4026ff\"}",
            "cache": "",
            "items": [],
            "type": "addressbook",
            "display_name": "",
            "description": "",
            "color": "",
            "id": 6
        },
        {
            "addressbook_id": "f728abc6-eaa0-4ced-a3ce-91f4e309eb2a",
            "user_id": "admin",
            "props": "{\"CR:addressbook-description\": \"description3\", \"D:displayname\": \"Calendar3\", \"tag\": \"VADDRESSBOOK\", \"{http://inf-it.com/ns/ab/}addressbook-color\": \"#123abc\", \"displayname\": \"Calendar3\"}",
            "cache": "",
            "items": [],
            "type": "addressbook",
            "display_name": "Calendar3",
            "description": "description3",
            "color": "#123abc",
            "id": 7
        }
    ]
}

```

**delete**

- input

```
{
    "args":{
    
    	"addressbook_id": "f728abc6-eaa0-4ced-a3ce-91f4e309eb2a"
    }
}
```

**add_contact**

- input

```
{"args":{
            "contact": {
            	"addressbook_id": "a33dce82-b348-4c9d-b340-7dd48ab2c69c",
                "title": "vvvvvvvvvvvvvv",
                "familyname": "haaaaaaa",
				"givenname": "Hamdy",
                "categories": ["category1, category2", "category3"],
                "nickname": "hackoback",
                "homepage": "homepage.com",
				"videchat": "www.videochat.com/user",
				"blog": "myblog.com",
				"facebook": "myfacebook.com",
				"calendar_url": "mycalendar.com",
				"anniversary": 1572182495,
                "notes": "noooooooootes",
				"spouse":"spouse",
				"birthday": 1572182495,

		
                "emails": [
                    {"email": "hamdy.a.farag@gmail.com", "type": "Home"},
                    {"email": "hamdy.a.farag@gmail.com", "type": "Work"},
                    {"email": "hamdy.a.farag@gmail.com", "type": "Other"}
                ],
                "telephones": [
                    {"telephone": "1234567", "type": "Home"},
                    {"telephone": "1234567", "type": "Business"},
                     {"telephone": "1234567", "type": "Other"}
                ],
                "ims": [
                    {"type": "Skype", "username": "hamdy.a.farag"},
                    {"type": "Yahoo", "username": "hamdy.a.farag"}
                ],

                "mailaddresses": [
                    {"street": "street", "city": "city", "code": "code", "region": "state", "country": "country",
                     "box": "box 123", "type":"home"}],
                "job": {"manager": "manager", "profession": "profession", "company": "company", "office": "office",
                        "assistant": "assistant", "title": "title", "department": "department"}            
            }
    }
}
```

- output

```
{
    "item_id": "64C1B263-39515CC6-339CC5DB.vcf",
    "user_id": "admin",
    "addressbook_id": "a33dce82-b348-4c9d-b340-7dd48ab2c69c",
    "content": "BEGIN:VCARD\r\nVERSION:3.0\r\nUID:17c85f0b-eac4-4500-b3d9-0be6ffa3d211\r\nADR;TYPE=home:box 123;;street;city;state;code;country\r\nBDAY:201910-27\r\nCALURI:mycalendar.com\r\nCATEGORIES:category1\\, category2,category3\r\nEMAIL;TYPE=Home:hamdy.a.farag@gmail.com\r\nEMAIL;TYPE=Work:hamdy.a.farag@gmail.com\r\nEMAIL;TYPE=Other:hamdy.a.farag@gmail.com\r\nFBURL:myfacebook.com\r\nFN:Hamdy haaaaaaa\r\nN:haaaaaaa;Hamdy;;;\r\nNICKNAME:hackoback\r\nNOTE:noooooooootes\r\nORG:company;department;office\r\nPRO:profession\r\nROLE:profession\r\nTEL;TYPE=Home,VOICE:1234567\r\nTEL;TYPE=Business,VOICE:1234567\r\nTEL;TYPE=Other,VOICE:1234567\r\nTITLE:title\r\nURL:homepage.com\r\nX-EVOLUTION-ANNIVERSARY:2019-10-27\r\nX-EVOLUTION-ASSISTANT:assistant\r\nX-EVOLUTION-BLOG-URL:myblog.com\r\nX-EVOLUTION-MANAGER:manager\r\nX-EVOLUTION-SPOUSE:spouse\r\nX-EVOLUTION-VIDEO-URL:www.videochat.com/user\r\nX-SKYPE:hamdy.a.farag\r\nX-YAHOO:hamdy.a.farag\r\nEND:VCARD\r\n",
    "epoch": 1572187306,
    "type": "VCARD",
    "title": "vvvvvvvvvvvvvv",
    "givenname": "Hamdy",
    "familyname": "haaaaaaa",
    "categories": [
        "category1, category2",
        "category3"
    ],
    "nickname": "hackoback",
    "emails": [
        {
            "email": "hamdy.a.farag@gmail.com",
            "type": "Home"
        },
        {
            "email": "hamdy.a.farag@gmail.com",
            "type": "Work"
        },
        {
            "email": "hamdy.a.farag@gmail.com",
            "type": "Other"
        }
    ],
    "telephones": [
        {
            "telephone": "1234567",
            "type": "Home"
        },
        {
            "telephone": "1234567",
            "type": "Business"
        },
        {
            "telephone": "1234567",
            "type": "Other"
        }
    ],
    "ims": [],
    "certificates": [
        {
            "type": "pgp",
            "text": "heeeeeeeeeey"
        },
        {
            "type": "x.509",
            "text": "ssssssss"
        }
    ],
    "mailaddresses": [
        {
            "street": "street",
            "city": "city",
            "code": "code",
            "region": "state",
            "country": "country",
            "box": "box 123",
            "extended": "",
            "type": "home"
        }
    ],
    "job": {
        "manager": "manager", 
        "profession": "profession",
         "company": "company",
          "office": "office",
           "assistant": "assistant",
            "title": "title",
             "department": "department"
    },
    "anniversary": 1572182495,
    "birthday": 1572182495,
    "spouse": "spouse",
    "notes": "noooooooootes",
    "picture": {
        "name": "",
        "content": "xaadadad",
        "encoding": "binary"
    },
    "calendar_url": "mycalendar.com",
    "facebook": "myfacebook.com",
    "homepage": "homepage.com",
    "blog": "myblog.com",
    "videchat": "www.videochat.com/user",
    "id": 3
}

```

**get_contact**

- input

```
{"args":{
	"contact_id": "f0821e27-3056-44f7-b353-1f36d2e0d861"
}
}

```

- output

```
{
    "item_id": "636FA12C-815FE445-6666F3D.vcf",
    "contact_id": "f0821e27-3056-44f7-b353-1f36d2e0d861",
    "user_id": "admin",
    "addressbook_id": "3d831e3a-0bd7-4d71-a43e-5b3b69c3e4bc",
    "content": "BEGIN:VCARD\r\nVERSION:3.0\r\nUID:f0821e27-3056-44f7-b353-1f36d2e0d861\r\nADR;TYPE=home:box 123;;street;city;state;code;country\r\nBDAY:2019-10-27\r\nCALURI:mycalendar.com\r\nCATEGORIES:category1\\, category2,category3\r\nEMAIL;TYPE=Home:hamdy.a.farag@gmail.com\r\nEMAIL;TYPE=Work:hamdy.a.farag@gmail.com\r\nEMAIL;TYPE=Other:hamdy.a.farag@gmail.com\r\nFBURL:myfacebook.com\r\nFN:Hamdy haaaaaaa\r\nN:haaaaaaa;Hamdy;;;\r\nNICKNAME:hackoback\r\nNOTE:noooooooootes\r\nORG:company;department;office\r\nPRO:profession\r\nROLE:profession\r\nTEL;TYPE=Home,VOICE:1234567\r\nTEL;TYPE=Business,VOICE:1234567\r\nTEL;TYPE=Other,VOICE:1234567\r\nTITLE:title\r\nURL:homepage.com\r\nX-EVOLUTION-ANNIVERSARY:2019-10-27\r\nX-EVOLUTION-ASSISTANT:assistant\r\nX-EVOLUTION-BLOG-URL:myblog.com\r\nX-EVOLUTION-MANAGER:manager\r\nX-EVOLUTION-SPOUSE:spouse\r\nX-EVOLUTION-VIDEO-URL:www.videochat.com/user\r\nX-SKYPE:hamdy.a.farag\r\nX-YAHOO:hamdy.a.farag\r\nEND:VCARD\r\n",
    "epoch": 1572191582,
    "type": "VCARD",
    "title": "vvvvvvvvvvvvvv",
    "givenname": "Hamdy",
    "familyname": "haaaaaaa",
    "categories": [
        "category1, category2",
        "category3"
    ],
    "nickname": "hackoback",
    "emails": [
        {
            "email": "hamdy.a.farag@gmail.com",
            "type": "Home"
        },
        {
            "email": "hamdy.a.farag@gmail.com",
            "type": "Work"
        },
        {
            "email": "hamdy.a.farag@gmail.com",
            "type": "Other"
        }
    ],
    "telephones": [
        {
            "telephone": "1234567",
            "type": "Home"
        },
        {
            "telephone": "1234567",
            "type": "Business"
        },
        {
            "telephone": "1234567",
            "type": "Other"
        }
    ],
    "ims": [],
    "certificates": [
        {
            "type": "pgp",
            "text": "heeeeeeeeeey"
        },
        {
            "type": "x.509",
            "text": "ssssssss"
        }
    ],
    "mailaddresses": [
        {
            "street": "street",
            "city": "city",
            "code": "code",
            "region": "state",
            "country": "country",
            "box": "box 123",
            "extended": "",
            "type": "home"
        }
    ],
    "job": {
        "manager": "manager",
        "profession": "profession",
        "company": "company",
        "office": "office",
        "assistant": "assistant",
        "title": "title",
        "department": "department",
        "role": ""
    },
    "anniversary": 1572182495,
    "birthday": 1572182495,
    "spouse": "spouse",
    "notes": "noooooooootes",
    "picture": {
        "name": "",
        "content": "xaadadad",
        "encoding": "binary"
    },
    "calendar_url": "mycalendar.com",
    "facebook": "myfacebook.com",
    "homepage": "homepage.com",
    "blog": "myblog.com",
    "videchat": "www.videochat.com/user",
    "id": 3
}

```

**update_contact**

- input 

"contact_id" field is important
```

{"args":{
            "contact": {
            	"addressbook_id": "9f2d5092-6c1f-4137-aaa9-a62b3c399227",
            	"contact_id": "afd92c4d-2423-46ee-81b7-b3c9bc513591",
                "title": "vvvvvvvvvvvvvv",
                "familyname": "Hamdy",
				"givenname": "Hamdy",
                "categories": ["category1, category2", "category3"],
                "nickname": "hackoback",
                "homepage": "homepage.com",
				"videchat": "www.videochat.com/user",
				"blog": "myblog.com",
				"facebook": "myfacebook.com",
				"calendar_url": "mycalendar.com",
				"anniversary": 1572182495,
                "notes": "noooooooootes",
				"spouse":"spouse",
				"birthday": 1572182495,

		"picture": {"content": "xaadadad", "encoding": "binary"},
                "emails": [
                    {"email": "hamdy.a.farag@gmail.com", "type": "Home"},
                    {"email": "hamdy.a.farag@gmail.com", "type": "Work"},
                    {"email": "hamdy.a.farag@gmail.com", "type": "Other"}
                ],
                "telephones": [
                    {"telephone": "1234567", "type": "Home"},
                    {"telephone": "1234567", "type": "Business"},
                     {"telephone": "1234567", "type": "Other"}
                ],
                "ims": [
                    {"type": "Skype", "username": "hamdy.a.farag"},
                    {"type": "Yahoo", "username": "hamdy.a.farag"}
                ],
                "certificates": [{"type": "pgp", "text": "heeeeeeeeeey"}, {"type": "x.509", "text": "ssssssss"}],
                "mailaddresses": [
                    {"street": "street", "city": "city", "code": "code", "region": "state", "country": "country",
                     "box": "box 123", "type":"home"}],
                "job": {"manager": "manager", "profession": "profession", "company": "company", "office": "office",
                        "assistant": "assistant", "title": "title", "department": "department"}            
       }
	}
}
```

- output

```
{
    "item_id": "BC50EAD3-27D15244-F4CAB9BE.vcf",
    "contact_id": "afd92c4d-2423-46ee-81b7-b3c9bc513591",
    "user_id": "admin",
    "addressbook_id": "9f2d5092-6c1f-4137-aaa9-a62b3c399227",
    "content": "BEGIN:VCARD\r\nVERSION:3.0\r\nUID:afd92c4d-2423-46ee-81b7-b3c9bc513591\r\nADR;TYPE=home:box 123;;street;city;state;code;country\r\nBDAY:2019-10-27\r\nCALURI:mycalendar.com\r\nCATEGORIES:category1\\, category2,category3\r\nEMAIL;TYPE=Home:hamdy.a.farag@gmail.com\r\nEMAIL;TYPE=Work:hamdy.a.farag@gmail.com\r\nEMAIL;TYPE=Other:hamdy.a.farag@gmail.com\r\nFBURL:myfacebook.com\r\nFN:Hamdy Hamdy\r\nN:Hamdy;Hamdy;;;\r\nNICKNAME:hackoback\r\nNOTE:noooooooootes\r\nORG:company;department;office\r\nPRO:profession\r\nROLE:profession\r\nTEL;TYPE=Home,VOICE:1234567\r\nTEL;TYPE=Business,VOICE:1234567\r\nTEL;TYPE=Other,VOICE:1234567\r\nTITLE:title\r\nURL:homepage.com\r\nX-EVOLUTION-ANNIVERSARY:2019-10-27\r\nX-EVOLUTION-ASSISTANT:assistant\r\nX-EVOLUTION-BLOG-URL:myblog.com\r\nX-EVOLUTION-MANAGER:manager\r\nX-EVOLUTION-SPOUSE:spouse\r\nX-EVOLUTION-VIDEO-URL:www.videochat.com/user\r\nX-SKYPE:hamdy.a.farag\r\nX-YAHOO:hamdy.a.farag\r\nEND:VCARD\r\n",
    "epoch": 1572257043,
    "type": "VCARD",
    "title": "vvvvvvvvvvvvvv",
    "givenname": "Hamdy",
    "familyname": "Hamdy",
    "categories": [
        "category1, category2",
        "category3"
    ],
    "nickname": "hackoback",
    "emails": [
        {
            "email": "hamdy.a.farag@gmail.com",
            "type": "Home"
        },
        {
            "email": "hamdy.a.farag@gmail.com",
            "type": "Work"
        },
        {
            "email": "hamdy.a.farag@gmail.com",
            "type": "Other"
        }
    ],
    "telephones": [
        {
            "telephone": "1234567",
            "type": "Home"
        },
        {
            "telephone": "1234567",
            "type": "Business"
        },
        {
            "telephone": "1234567",
            "type": "Other"
        }
    ],
    "ims": [],
    "certificates": [
        {
            "type": "pgp",
            "text": "heeeeeeeeeey"
        },
        {
            "type": "x.509",
            "text": "ssssssss"
        }
    ],
    "mailaddresses": [
        {
            "street": "street",
            "city": "city",
            "code": "code",
            "region": "state",
            "country": "country",
            "box": "box 123",
            "extended": "",
            "type": "home"
        }
    ],
    "job": {
        "manager": "manager",
        "profession": "profession",
        "company": "company",
        "office": "office",
        "assistant": "assistant",
        "title": "title",
        "department": "department",
        "role": ""
    },
    "anniversary": 1572182495,
    "birthday": 1572182495,
    "spouse": "spouse",
    "notes": "noooooooootes",
    "picture": {
        "name": "",
        "content": "xaadadad",
        "encoding": "binary"
    },
    "calendar_url": "mycalendar.com",
    "facebook": "myfacebook.com",
    "homepage": "homepage.com",
    "blog": "myblog.com",
    "videchat": "www.videochat.com/user",
    "id": 3
}
```

*list_contacts**

list/filters
you can filter by all fields
if you provide addressbook_id field only,  then you get all contacts in this addressbook

- input

```
{"args":{
            "contact": {
            	"addressbook_id": "4823d37b-32d7-4434-baa5-529dec6a7f46",          	
                "blog": "myblog.com"
       
            }
    }
}
```

- output

```
{
    "contacts": [
        {
            "item_id": "6E3329F2-B3C643A-71FECBCC.vcf",
            "contact_id": "a878fc5e-1c48-43f2-9a7d-28fca02be9f7",
            "user_id": "admin",
            "addressbook_id": "4823d37b-32d7-4434-baa5-529dec6a7f46",
            "content": "BEGIN:VCARD\r\nVERSION:3.0\r\nUID:a878fc5e-1c48-43f2-9a7d-28fca02be9f7\r\nADR;TYPE=home:box 123;;street;city;state;code;country\r\nBDAY:2019-10-27\r\nCALURI:mycalendar.com\r\nCATEGORIES:category1,category2,category3\r\nEMAIL;TYPE=HOME:hamdy.a.farag@gmail.com\r\nEMAIL;TYPE=WORK:hamdy.a.farag@gmail.com\r\nEMAIL;TYPE=OTHER:hamdy.a.farag@gmail.com\r\nFBURL:myfacebook.com\r\nFN:Hamdy Hamdy\r\nLABEL;TYPE=HOME:street\\ncity\\, state\\ncode\\nbox 123\\ncountry\r\nN:Hamdy;Hamdy;;;\r\nNICKNAME:nicknamossssss\r\nNOTE:noooooooootes\r\nORG:company;department;office\r\nPRO:profession\r\nROLE:profession\r\nTEL;TYPE=HOME,VOICE:1234567\r\nTEL;TYPE=VOICE:1234567\r\nTEL;TYPE=VOICE:1234567\r\nTITLE:title\r\nURL:homepage.com\r\nX-EVOLUTION-ANNIVERSARY:2019-10-27\r\nX-EVOLUTION-ASSISTANT:assistant\r\nX-EVOLUTION-BLOG-URL:myblog.com\r\nX-EVOLUTION-FILE-AS:Hamdy\\, Hamdy\r\nX-EVOLUTION-MANAGER:manager\r\nX-EVOLUTION-SPOUSE:spouse\r\nX-EVOLUTION-VIDEO-URL:www.videochat.com/user\r\nX-MOZILLA-HTML:FALSE\r\nX-SKYPE;X-EVOLUTION-UI-SLOT=1:hamdy.a.farag\r\nX-YAHOO;X-EVOLUTION-UI-SLOT=2:hamdy.a.farag\r\nEND:VCARD\r\n",
            "epoch": 1572272159,
            "type": "VCARD",
            "title": "",
            "givenname": "Hamdy",
            "familyname": "Hamdy",
            "categories": [
                "category1",
                "category2",
                "category3"
            ],
            "nickname": "nicknamossssss",
            "emails": [
                {
                    "email": "hamdy.a.farag@gmail.com",
                    "type": "OTHER",
                    "id": 21
                }
            ],
            "telephones": [
                {
                    "telephone": "1234567",
                    "type": "VOICE",
                    "id": 24
                }
            ],
            "ims": [
                {
                    "username": "hamdy.a.farag",
                    "type": "Skype"
                }
            ],
            "certificates": [],
            "mailaddresses": [
                {
                    "street": "street",
                    "city": "city",
                    "code": "code",
                    "region": "state",
                    "country": "country",
                    "box": "box 123",
                    "extended": "",
                    "type": "home",
                    "id": 18
                }
            ],
            "job": {
                "manager": "manager",
                "profession": "profession",
                "company": "company",
                "office": "",
                "assistant": "assistant",
                "title": "title",
                "department": "department",
                "role": ""
            },
            "anniversary": 1572134400,
            "birthday": 1572134400,
            "spouse": "",
            "notes": "noooooooootes",
            "picture": {
                "name": "",
                "content": "",
                "encoding": ""
            },
            "calendar_url": "mycalendar.com",
            "facebook": "myfacebook.com",
            "homepage": "",
            "blog": "myblog.com",
            "videchat": "www.videochat.com/user",
            "id": 10
        }
    ]
}
```

