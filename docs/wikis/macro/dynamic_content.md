# Dynamic content

This macro is used to generate [inline html](../html.md) by fetching/rendering the content from an actor dynamically.


### Syntax:

```
!!!dynamic_content("threebot.package", "actor", "method", arg1=...)
```

or using toml (inside a code block)

````
```
!!!dynamic_content
package = "threebot.package_name"
actor = "actor"
method = "method"
arg1 = ...
```
````

#### Other options

- `markdown`: if set to `True`, it will render the returned content as markdown instead of `html`.

### Examples


Given an actor that with `hello` method:

```python
from Jumpscale import j


class html_test(j.baseclasses.threebot_actor):
    def hello(self, name, user_session, schema_out=None):
        """
        :param name: name to say hello to

        ```in
        name = (S)
        ```

        ```out
        content = (S)
        ```
        """
        out = schema_out.new()
        out.content = f"Hello <h3>{name}</h3>"
        return out

    def hello_markdown(self, name, user_session, schema_out=None):
        """
        :param name: name to say hello to

        ```in
        name = (S)
        ```

        ```out
        content = (S)
        ```
        """
        out = schema_out.new()
        out.content = f"_markdown test_ Hello `{name}`"
        return out
```

We can call hello every time the page/document gets loaded as follows:


````
```
!!!dynamic_content
pacakge = "zerobot.wiki_examples"
actor = "html_test"
method = "hello"
name_ = "John doe"
```
````

The output will be as follows inside the document:

```html
Hello <h3>John doe</h3>
```


To render returned content as **markdown**, use `markdown` option:

````
```
!!!dynamic_content
pacakge = "zerobot.wiki_examples"
actor = "html_test"
method = "hello_markdown"
name_ = "John doe"
markdown = True
```
````
