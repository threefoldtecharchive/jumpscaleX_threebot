# Macro
A macro is a python function that get the document used in and any other parameters as input and return a new output.

It should be placed into a python module with the same name, see [current macros](https://github.com/threefoldtech/jumpscaleX_core/tree/development/JumpscaleCore/tools/threegit/macros).

All macros are loaded by default from this path `jumpscaleX_core/JumpscaleCore/tools/threegit/macros`.


## Example

Here is a simple example for sum macro:

```python
# sum.py
def sum(doc, a, b, **kwargs):
    a = int(a)
    b = int(b)
    return str(a + b)
```

## Testing

You you can add an example document in [examples](https://github.com/threefoldtech/jumpscaleX_threebot/tree/development/docs/wikis/examples/docs):

```
## Sum of 1 + 1

!!!sum(1, 1)
```

Then, simply load it using `jsx wiki-load` like:

```
jsx wiki-load -u https://github.com/threefoldtech/jumpscaleX_threebot/tree/development/docs/wikis/examples/docs -n examples -f
```

Then open your browser with 3bot/container hostname at https:<hostname>/wiki/examples#/<your_document_name>, if there're any errors, they should appear there too.
