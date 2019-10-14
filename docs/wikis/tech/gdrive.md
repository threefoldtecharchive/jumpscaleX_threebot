# Gdrive tool

This tool provides endpoints for downloading and serving gdrive docs or slide which can be used from wikis directly.

## Available endpoints

`/wiki/gdrive/doc/{doc_guid}`: downloads gdrive doc and redirect to it
`/wiki/gdrive/slide/{presentation_guid}/{slide_guid}`: downloads the full presentation and redirect to the given slide
`/gdrive/sheet/{sheet_guid}`: downloads the spread sheet as pdf and redirect to it

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

## more info

see https://github.com/threefoldtech/jumpscaleX_core/blob/development/docs/tools/wiki/docsites/macros/slideshow.md


