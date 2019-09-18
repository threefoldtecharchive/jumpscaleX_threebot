# ff content

## questions

is it a blog or a wiki ? if it is a wiki then we need acl
if it is a blog then let's use the blog we have

## Module Requirements

This module will allow :

- publish content that will be accessible through http
- editing published content
- removed content
- search for content
- link content ?
- **what else do we need\*** ?

## Technical Requirements

What kind of info do we need to interface the 3bot with the freeflow content ?.

- content
- tags
- meta data
- link ?

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
