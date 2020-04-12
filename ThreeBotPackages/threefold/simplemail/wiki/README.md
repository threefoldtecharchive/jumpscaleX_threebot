# Simple Mail Package

## Info

A simple mail server to receive, save, search and send emails with html, txt and content also attachments.
Very simple inbox server base mainly on inbox.py [here](https://github.com/abunsen/inbox.py) with few changes.
Emails are stored in bcdb and very easy to search.
Attachments are saved in file system under `/sandbox/mail_attachments`

**Note**

Mail server is configured using (host ip / domain, port) in package.py start method

see: `/sandbox/code/github/threefoldtech/jumpscaleX_libs/JumpscaleLibs/servers/simplemail/README.md`

## Installation

- Start 3bot server
- Install and start the package
- Get gedis client and act with the actors

```python
cl = j.servers.threebot.local_start_3bot()
j.threebot.packages.threefold.simplemail.start()
gedis = j.clients.gedis.get("pm", port=8901, package_name="zerobot.admin")
gedis.actors.package_manager.package_add(path="/sandbox/code/github/threefoldtech/jumpscaleX_threebot/ThreeBotPackages/threefold/simplemail")
gedis.reload()
```

## Usage (actors)

### Send a mail

**Params**

- server_address > The address of the mail server you want to send to (usually a 3bot ip / domain)
- server_port = 25 > smtp mail server port (default: 25)
- email_from > your mail name
- email_to > the mail you want to send to
- subject > email subject
- body > email body
- html_body > email html content
- attachment_paths > if you need to send attachments will be a list of your local files

- Examples

```python
simplemail_client = j.clients.gedis.get("simplemail", port=8901, package_name="threefold.simplemail")
simplemail_client.actors.simplemail.send_mail(server_address="localhost", server_port=25, email_from='nothamada@hamada.com', email_to='hamada@hamada.com', subject='test send', body='hello fromhamada body', html_body='<h1>hello</h1>', attachment_paths=['/test_file_69.55.49.129', '/tmp/0_g6189c97173_0_0.png.meta'])
simplemail_client.actors.simplemail.send_mail(server_address="localhost", server_port=25, email_from='waleed@hamada.com', email_to='waleed@hamada.com', subject='waleed', body='test hello from me dell', html_body='<h1>actions</h1>', attachment_paths=['/.dockerenv', '/tmp/0_g6189c97173_0_0.png.meta'])
```

### List all mails (pretty printed)

```python
simplemail_client.actors.simplemail.list()
```

example output
```bash
JSX> simplemail_client.actors.simplemail.list()
[## threefold.simplemail.email.1
ID: 1
 - email_from          : nothamada@hamada.com
 - email_to            : hamada@hamada.com
 - subject             : test send
 - attachments         :
    - /sandbox/mail_attachments/test send/2020-01-12_23-12-37_/test_file_69.55.49.129
    - /sandbox/mail_attachments/test send/2020-01-12_23-12-37_/tmp/0_g6189c97173_0_0.png.meta
 - body                : hello fromhamada body
 - htmlbody            : <h1>hello</h1>
 - date                : 2020-01-12_23-12-37
, ## threefold.simplemail.email.1
ID: 2
 - email_from          : waleed@hamada.com
 - email_to            : waleed@hamada.com
 - subject             : waleed
 - attachments         :
    - /sandbox/mail_attachments/waleed/2020-01-12_23-12-41_/.dockerenv
    - /sandbox/mail_attachments/waleed/2020-01-12_23-12-41_/tmp/0_g6189c97173_0_0.png.meta
 - body                : test hello from me dell
 - htmlbody            : <h1>actions</h1>
 - date                : 2020-01-12_23-12-41
]
```

### List all mails as json

```python
result = simplemail_client.actors.simplemail.list_json()
j.data.serializers.json.loads(result)
```

example output
```bash
JSX> j.data.serializers.json.loads(result)
[{'from_email': 'nothamada@hamada.com', 'to_email': 'hamada@hamada.com', 'subject': 'test send', 'attachments': ['/sandbox/mail_attachments/test send/2020-01-12_22-28-50_/test_file_69.55.49.129', '/sandbox/mail_attachments/test send/2020-01-12_22-28-50_/tmp/0_g6189c97173_0_0.png.meta'], 'body': 'hello from hamada body', 'htmlbody': '<h1>hello</h1>', 'date': '2020-01-12_22-28-50', 'id': 1}, {'from_email': 'waleed@hamada.com', 'to_email': 'waleed@hamada.com', 'subject': 'waleed', 'attachments': ['/sandbox/mail_attachments/waleed/2020-01-12_22-29-39_/.dockerenv', '/sandbox/mail_attachments/waleed/2020-01-12_22-29-39_/tmp/0_g6189c97173_0_0.png.meta'], 'body': 'test hello from me dell', 'htmlbody': '<h1>actions</h1>', 'date': '2020-01-12_22-29-39', 'id': 2}]
```

### Search in mails (pretty printed)

you can search with

- email_from
- email_to
- subject
- body
- htmlbody
- date

or parts of it

example search:

```python
simplemail_client.actors.simplemail.search(email_to="waleed@hamada.com", subject="waleed")
```

### Search in mails (return json)

```python
result = simplemail_client.actors.simplemail.search_json(email_to="waleed@hamada.com", subject="waleed")
j.data.serializers.json.loads(result)
```

### Save mail

save_mail the mail handler which is used by inbox server and saves in bcdb
