# calendar

## Module Requirements

This module will allow :

- add/modify/delete an event based on a date and a time
- list events based on a period (define by a From and To date-time)
- **do we need periodicity** ?
- **do we need notifications** ?
- **do we need several calendar** ?
- **do we need handle timezone** ?

## Technical Requirements

What kind of info do we need on an event ?.

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

## RUN

to start the threebot server manually

```bash
kosmos -p 'j.servers.threebot.default.start(background=False,web=False)'
```
