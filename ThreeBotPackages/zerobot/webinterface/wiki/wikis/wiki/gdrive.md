# Gdrive
This actor with the name of `wiki_gdrive_manager` provides a way to get a download link for gdrive documents, this link is served by current running 3bot.

Note that this actors need a service account to be set, see [service account setup](https://github.com/threefoldtech/jumpscaleX_threebot/blob/development/docs/wikis/tech/README.md#setting-up-gdrive-and-service-account) documentation for more.


## file_get(doctype, guid1, guid1)

Will return an object with `res` that contains a relative link to the file.

Accepts the following parameters:

- `doctype`: document type, one of document spreadsheets, presentation and slide.
- `guid1`: the GUID of the document
- `guid2`: the GUID of sub-items like a slide in a presentation


## Examples

```
JSX> cl = j.clients.gedis.get(name="gdrive", port=8901, package_name="zerobot.webinterface")
JSX> cl.actors.wiki_gdrive_manager.file_get("document", "1z_B9_sPob88AwFWJbYAhu58T58m8YRj-IpcnrcGye5w")
```
