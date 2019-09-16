from Jumpscale import j


class painter(j.baseclasses.threebot_actor):
    """
    """

    def echo(self, msg):
        return msg

    def count(self, a, b):
        return int(a) + int(b)

    def example1(self, addr, schema_out):
        """
        ```out
        !jumpscale.test.ibiza.wallet
        ```
        """
        w = schema_out.new()
        w.addr = addr
        return w

    def example2(self, wallet, schema_out):
        """
        ```in
        wallet = (O) !jumpscale.test.ibiza.wallet
        ```

        ```out
        !jumpscale.test.ibiza.wallet
        ```

        """
        w = wallet
        return w

    def example3(self, a, b, c, schema_out):
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

    def example4(self, wallet, schema_out):
        """
        ```in
        wallet = (O) !jumpscale.test.ibiza.wallet
        ```

        ```out
        result = (O) !jumpscale.test.ibiza.wallet
        custom = (S)
        ```
        """
        w = schema_out.new()
        w.result.ipaddr = wallet.ipaddr
        w.result.addr = wallet.addr
        w.result.jwt = wallet.jwt
        w.custom = "custom"
        return w
