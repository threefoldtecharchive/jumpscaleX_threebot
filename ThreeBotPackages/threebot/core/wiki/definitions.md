# definitions

## 3bot_ro

ThreeBot root object.
Has an id, is what get's stored in our BCDB.

Every rootobject identified by 2 id's: 3botid+objid 
Objid is unique per 3bot

## datafield

is a dict based data structure which can be attached to most rootobjects. Gets serialized more dense, but allows experience developers to add custom data. BE CAREFUL HOW AND IF TO USE THIS.

## ilink = Intelligent Link

links to any circle, rootobject, ...

formats

- @3botname/objid  e.g. @kristof.ibiza/10
- @3botid/objid e.g. @33/12
- @3botname/circlename/objtype/name 
    - e.g. @kristof.ibiza/threefold-support/doc/onboarding_process
- @3botid/circlename/objtype/name 

this is put in normal markdown link format e.g. [](kristof.ibiza/threefold-support/doc/onboarding_process)
there can be link name in [] 

## include

![](kristof.ibiza/threefold-support/doc/onboarding_process)

## names format e.g. circlename/objtype/name

- allways lowercase and only: ```[0-9,a-z,-,_]```

