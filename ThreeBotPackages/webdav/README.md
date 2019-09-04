# webdav over BCDBFS

### if you want to add Authentication (not needed for now)

```
user_mapping = {}

def addUser(realmName, user, password, description, roles=[]):
    realmName = "/" + realmName.strip(r"\/")
    userDict = user_mapping.setdefault(realmName, {}).setdefault(user, {})
    userDict["password"] = password
    userDict["description"] = description
    userDict["roles"] = roles
    if user_mapping == {}:
        addUser("", "root", "root", "")

```

then add the following configuration in the `app.py`

```
"simple_dc": {"user_mapping": user_mapping
```
