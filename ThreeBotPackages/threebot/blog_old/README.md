# Blog

## User Stories

As a 3bot owner I want to publish a blog through the 3botApp so
that my blog will be stored on my 3bot and will be accessible from the internet to everybody

As a 3bot owner I want to publish a blog article through the 3botApp so
that my blog will be stored on my 3bot and will be accessible from the internet to everybody

As a 3bot owner I want to edit some blog articles through the 3botApp so
that my updated blog post will be stored on my 3bot and will be accessible from the internet to everybody

As a 3bot owner I want to delete a blog post through the 3botApp so
that my blog post will be erased of my 3bot and will not be accessible anymore

## Module Requirements

This module will allow :

- publish your personal blog
- add text content to your blog
- add media content (files/videos audio ?)
- assign meta data to the blog
- assign tags to a blog post
- get a list of all tags assigned to posts
- search through a list

## Technical Requirements

The content will be markdown template ?
The blog ui is based on svelte

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
