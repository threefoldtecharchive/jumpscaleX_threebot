## Github Webhooks

This package is used to define webhook handlers for github push events.

By default, the packages pulls the repos after each push and executes user specified handlers (functions) on each push.

### Setting up a secret
To define a webhook on github, please check https://developer.github.com/webhooks/creating.

If you specified a secret in github webhook you can add it to ```jumpscale_config.toml``` as ```GITHUB_WEBHOOK_SECRET```

### How to define a handler for certian repository in your code (optional):
Sometimes, you don't need only to pull the repository on push events, but also doing any other action, you can do so by registering your handler, which will get called in case of any push events.

1- Define a handler function. It can be as simple as: 
```python
 f = lambda payload: print(payload)
```
- ```payload``` is the payload sent by github.

2- Register your handler function with the repo full name like below:
```bash
JSX> j.tools.packages.github_webhooks.register_handler("threefoldtech/jumpscaleX_core", f)
```
- You can add multiple handlers for the same repo using the ```register_handler``` method

3- In your github webhook settings set the url to ```https://<ip>/webhooks/github``` or ```http://<ip>/webhooks/github```
- in case you are using https you need to disable ssl validation on github webhook settings.
