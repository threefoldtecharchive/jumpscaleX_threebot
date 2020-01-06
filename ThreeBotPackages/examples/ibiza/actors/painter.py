from Jumpscale import j


class painter(j.baseclasses.threebot_actor):
    """
    """

    @j.baseclasses.actor_method
    def echo(self, msg, schema_out=None, user_session=None):
        return msg

    @j.baseclasses.actor_method
    def count(self, a, b, schema_out=None, user_session=None):
        return int(a) + int(b)

    @j.baseclasses.actor_method
    def example1(self, addr, schema_out=None, user_session=None):
        """
        ```out
        !jumpscale.ibiza.ibiza.wallet
        ```
        """
        w = schema_out.new()
        w.addr = addr
        return w

    @j.baseclasses.actor_method
    def example2(self, wallet, schema_out=None, user_session=None):
        """
        ```in
        wallet = (O) !jumpscale.ibiza.ibiza.wallet
        ```

        ```out
        !jumpscale.ibiza.ibiza.wallet
        ```

        """
        w = wallet
        return w

    @j.baseclasses.actor_method
    def example3(self, a, b, c, schema_out=None, user_session=None):
        """
        ```in
        a = (S)
        b = (B)
        c = (I)
        ```

        ```out
        a = (S)
        b = (B)
        c = (I)
        ```
        """
        w = schema_out.new()
        w.a = a
        w.b = not b
        w.c = c
        return w

    @j.baseclasses.actor_method
    def example4(self, wallet, schema_out=None, user_session=None):
        """
        ```in
        wallet = (O) !jumpscale.ibiza.ibiza.wallet
        ```

        ```out
        result = (O) !jumpscale.ibiza.ibiza.wallet
        custom = (S)
        ```
        """
        w = schema_out.new()
        w.result.ipaddr = wallet.ipaddr
        w.result.addr = wallet.addr
        w.result.jwt = wallet.jwt
        w.custom = "custom"
        return w
