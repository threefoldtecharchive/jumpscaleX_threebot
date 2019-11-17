## Service account
Service account is used by daemons or servers to interact with google apis, when there's no user/web browser interaction is available.

Follow the following steps at [google console](https://console.developers.google.com/flows/enableapi?apiid=gdrive.googleapis.com):

- Create project
- Create credentials (type service account)
You need to enable and download credentials files using  or go to [Python Quickstart](https://developers.google.com/slides/quickstart/python) and choose enable slides API then download configurations.
- Download credentials (as json and save it anywhere on your filesystem)

click on link to service account (not easy to see), then copy this file to `/sandbox/var/cred.json`

It's better to enable drive, slide, sheets and doc apis too, you can find and enable differnt google apis in [this library](https://console.developers.google.com/apis/library). 

### Screenshots describing how to get credentials for slides api

Using [Google console](https://console.developers.google.com/flows/enableapi?apiid=slides.googleapis.com)

![](images/select_project_google.png)

![](images/select_service_account.png)

![](images/createserviceaccount.png)

choose broad enough rights e.g. owner

![](images/serviceaccount_finish.png)

create key

![](images/create_key.png)

select json

will be automatically downloaded, then copy it to `/sandbox/var/cred.json`


### Accessing private files using service accounts

By default, service accounts won't be able to access your private files or documents, either you share them with service account email (you can get it from console or from credential file `client_email` field), or ask your domain admin to enable domain-wide delegation of authority to your service account, more info can be found [here](https://developers.google.com/drive/api/v3/about-auth#perform_g_suite_domain-wide_delegation_of_authority), and full steps are [here](https://developers.google.com/identity/protocols/OAuth2ServiceAccount#delegatingauthority).


