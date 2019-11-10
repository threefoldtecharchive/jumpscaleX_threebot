# Threefold Registery package

## Goal

Anyone can register any piece of information, structured or not. encrypted or not.
We can call it "bcdb public interface".

## Features

- Register anytype of information (website, blog, wiki, doc, solutionpackage, threebotpackage).
- Registered info could be encrypted or public.
- If data is encrypted only authors and readers can access it.
- Data is signed using `NACL` by the 3Bot's private key signature and verified with his verify key.
- Find any piece of information you want by many filters (country_code, format, category, topic)
- If data is public you can return it in the format you want.

## Testing

- Run `kosmos -p 'j.threebot.package.threefold.registry.test()'`

This will save some data public and encrypted and return them again

## Models

- Check the package models in `registry/models/threebot_registry_entry_data_encrypted_1.toml`

## Actor Methods

- Register

```python
def register(
    self, authors=[], verifykey=None, input_object=None, signature_hex=None, schema_out=None, user_session=None
):
    """
    register an object of the type threebot.registry.entry.data.1
    can be given in multiple formats

    signature hex is done on the capnp output of the object

    ```in
    authors = (LI)  #tid of the authors
    input_object = (O)  !threebot.registry.entry.data.1 # the input data
    signature_hex = "" (S) # the signed data
    verifykey = (BIN) # threebot's me verify key
    ```

    :return: return the id of the object
    """
```

- Get

```python
def get(self, tid=None, data_id=None, schema_out=None, user_session=None):
    """
    Get the data by id
    if it's encrypted you have to pass an authorized tid
    ```in
    tid = (I)
    data_id = (I)
    ```

    ```out
    res = !threebot.registry.entry.data.1
    ```
    """
```

- Schema_register

```python
def schema_register(self, schema_url=None, schema_text=None, schema_out=None, user_session=None):
    """

    make sure the registrar knows about the schema's used
    return: md5 of the schema

    ```in
    schema_url = ""
    schema_text = ""
    ```
    """
```

- find_encrypted

Find any encrypted data, you have to authorized [an author, or an authorized reader]

```python
def find_encrypted(
    self,
    tid=None,
    schema_url=None,
    country_code=None,
    format=None,
    category=None,
    topic=None,
    description=None,
    schema_out=None,
    user_session=None,
):
    """

    ```in
    tid = (I)
    #search arguments
    schema_url = ""  #jumpscale schema url
    country_code = ""
    format = "website,blog,wiki,doc,solutionpackage,threebotpackage" (E)
    category = "publicity,info,knowledge,code,spec,config,varia" (E)
    topic = "travel,food,it,spirituality,health,education,finance,varia" (E)
    description = ""
    ```

    only return if < 50 results

    ```out
    res = (LO) !threebot.registry.entry.data.1
    ```
    :return:
    """
```

- Find formatted

```python
def find_formatted(
        self,
        registered_info_format=None,
        schema_url=None,
        country_code=None,
        format=None,
        category=None,
        topic=None,
        description=None,
        schema_out=None,
        user_session=None,
    ):
        """

        only works for non encrypted
        will return the data as requested
        find data by filters

        ```in
        registered_info_format = "jsxschema,yaml,json,msgpack,unstructured" (E)
        #search arguments
        schema_url = ""  #jumpscale schema url
        country_code = ""
        format = "website,blog,wiki,doc,solutionpackage,threebotpackage" (E)
        category = "publicity,info,knowledge,code,spec,config,varia" (E)
        topic = "travel,food,it,spirituality,health,education,finance,varia" (E)
        description = ""
        ```
        ```out
        res = (S)
        ```
        only return if < 50 results

        :param schema_url:
        :param user_session:
        :return:
        """
```

- Validate signature

A helper method, to verify that author is correct, by verifying the signature on the data and the data with author's verify key

```python
def validate_signature(
    self, tid=None, verifykey=None, payload=None, signature=None, schema_out=None, user_session=None
):
    """
    ```in
    tid = (I)
    name = (S)
    email = (S)
    payload = (S)
    signature = (BIN)
    verifykey = (BIN)
    ```

    ```out
    is_valid = (B)
    ```
    """
```

## For end users and how to use the package

This package is exposed using ```TFGridRegistryClient``` client

Check: [docs here](https://github.com/threefoldtech/jumpscaleX_core/blob/development/JumpscaleCore/clients/tfgrid_registry/README.md)

```python
j.clients.tfgrid_registry
```

## Future Features

- std: only the author can modify/delete the info later
- can add co-authors to change/delete info
