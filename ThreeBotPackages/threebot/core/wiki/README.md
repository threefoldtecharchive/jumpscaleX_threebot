# Core

is the core of a threebot, the model which makes everything work in our digital life.



## circle based

all 3bot.ro are part of a circle.
Circle is a 3bot.ro by itself and has ACL.

## 3bot root objects (3bot.ro)

- +- all have property: name, description, owner, contributors

### circle

- Group of people working together on a topic or set of topics.
- all rootobjects below belong to a circle

### story

- A description of change on a circle.
- It has a start & end.
- Its measurable, so we know when succesful.
- Has an owner, the person who makes sure story is well defined & done in time.
- some properties: priority, severity, status, deadline, owner, contributors, tags
- It has one or more checklists inside, which are requests which need to be checked off for story to be succesful.
- Also linked to kanban. Has also a datafield attached to it.

### request

- Can be bug, feature request, question, support request, change request, lead, prospect (type)
- some properties: priority, severity, status, deadline, owner, contributors, tags
- Also linked to kanban. Has also a datafield attached to it.

### funnel (collection)

- shows requests in grid overview
- easy filtering on the requests
- aim is to see all going on and priotize the requests
- some properties: status, deadline, owner, contributors, tags

### kanban (collection)

- Swimlanes based overview of stories or requests
    - swimlines are customizable but default: 'new', 'to start', 'in progress', 'blocked', 'verification'
    - define which types of rootobjects accepted: default stories & requests
- some properties: status, deadline, owner, contributors, tags
- Has also a datafield attached to it.

### message

- a piece of information which is only relevant on the moment around when its written
- links to timeline only
- can be linked to thread (is reply on message)
- some properties: status, expiration, owner, contributors

### thread

- Group of comments, can be linked to circle, request, kanban, story, document, timeline, book, explorer, message, ...
- Can be more than 1 comment on top level, then replies on comments of comments of comments, ...
- can see who made the comment
- a comment can have [ilink] inside

### timeline (collection)

- time based view of root objects
- some properties: priority, severity, status, deadline, owner, contributors, tags, type 
- aim is to make it easy per timeline to filter on properties & time
- each timeline defines what it can hold
    - based on properties (filter)
- replaces chats, ...
- can be linked to: kanban, book, funnel, circle, explorer (the collection obj)

### profile (collection)

- profile information
- info like to put on linkedin/facebook
- links to docs, files, ...
- has a unique property to be able to give fine graned ACL access on the properties of profile and its sub objects

### document

- markdown based document (images, links, ...)
- types: news, blog, knowledge, tutorial, training, process, notes
- some properties: priority, status, expiration, owner, contributors, tags
- Can be linked to kanban. Has also a datafield attached to it.
- has macro capabilities: include, link, ... to make it easy to extend functionality

### faq (collection)

- links requests (questions) on a nice layout
- questions -> answers
- question = request type question
- answer = link to a document
- thread: comments linked to the answer 
- some properties: topicname, status, expiration, owner, contributors, tags
- can be more than 1 faq on a circle ofcourse


### event

- properties:
    - date, duration
    - attendies, organizers
    - status
- ...

### agenda (collection)

- list of events in 1 calendar or other representation
- some properties: name, status, expiration, owner, contributors, tags

### file

- links to a physical file e.g. pdf, image, ...
- stored in DB as blocks (hashed,deduped) per 3bot per file

### book (collection)

- book view of document objects
- index structure defines what is shown where (ordered per section & then subsections (only 3 levels)
- uses tags to find objects inside & full text search
- some properties: status, expiration, owner, contributors, tags, type 

### explorer (collection)

- folder based structure
- each folder has items inside
- each item is linked to any of the objects above
- allows webdav / ftp / ... file based access
- when files are the binary form
    - when non files show as json representation

## security

- all security done for now on circle level or collection objects (faq, funnel, ...)
    - ONLY jumpscale acl on circle object is used for that
- each threebot rootobject has @property circle to make it super easy to verify if someone has access on e.g. circle level