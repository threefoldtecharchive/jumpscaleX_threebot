## Github Webhooks

This package is used to define webhook handlers for github push events.

By default, the packages pulls the repos after each push and executes user specified handlers (functions) on each push.

### How to define a handler:
1- Define a handler function. It can be as simple as: 
```python
 f = lambda payload: print(payload)
```
- ```payload``` is the payload sent by github.

2- Register your handler function with the repo full name like below:
```bash
JSX> j.tools.packages.github_webhooks.register_handler("threefoldtech/jumpscaleX_core", f)
```

3- If you specified a secret in github webhook you can add it to ```jumpscale_config.toml``` as ```GITHUB_WEBHOOK_SECRET```


(to define a webhook on github, please check https://developer.github.com/webhooks/creating/)