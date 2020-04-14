## Github Webhooks

This package exposes an endpoints for github webhooks, by default, it pulls the repository once it receives a push event from github.

Also, if needed, any component can register a handler (functions) for specific reposiotry events, and this handler will be called on every push event.

### Setup
To define a webhook on github, please check https://developer.github.com/webhooks/creating.

On github settings for your repository you need to set:
* Payload URL: Use`/webhooks/github`, example: `http://example.com/webhooks/github`
* Secret: use any secret

On your 3bot:
* Add the same secret in github settings to ```jumpscale_config.toml``` as ```GITHUB_WEBHOOK_SECRET```

### Defining a handler for a specific repository (optional):
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


