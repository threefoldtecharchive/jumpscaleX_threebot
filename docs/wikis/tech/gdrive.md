# Gdrive tool

This tool provides endpoints for downloading and serving gdrive docs or slide which can be used from wikis.
It is integrated by default with open publish tool.

## available endpoints

- `/wiki/gdrive/doc/{doc_guid}`: downloads gdrive doc and redirect to it
- `/wiki/gdrive/slide/{presentation_guid}/{slide_guid}`: downloads the full presentation and redirect to the given slide
- `/wiki/gdrive/sheet/{sheet_guid}`: downloads the spread sheet as pdf and redirect to it

## How to Configure
1- configure the main instance of gdrive client and make sure to provide a credentials file with the correct permissions
```python
cl = j.clients.gdrive.main
cl.credfile = "{path_to_cred_file}"
cl.save()
```

2- create the needed dirs to store the files
```bash
mkdir -p /sandbox/var/gdrive/static/{doc,slide,sheet}
```

## Setting up service account for google apis

See how to setup a [service account](service_account.md) for different google apis, as it's required by other macros.


