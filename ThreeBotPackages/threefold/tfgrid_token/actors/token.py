from Jumpscale import j


class token(j.baseclasses.threebot_actor):
    def _init(self, **kwargs):
        try:
            self.bcdb = j.data.bcdb.get("tf_grid_token")
        except:
            self.bcdb = j.data.bcdb.new("tf_grid_token")
        self.market = self.bcdb.model_get(url="tfgrid.market.1")
        self.capacity = self.bcdb.model_get(url="tfgrid.capacity.1")
        self.tokens = self.bcdb.model_get(url="tfgrid.token.price.1")

    def get_market(self, schema_out=None, user_session=None):
        """
        ```out
        market = (O) !tfgrid.market.1
        ```
        """
        out = self.market.new()
        self.market.set(out)
        return out

    def get_capacity(self, schema_out=None, user_session=None):
        """
        ```out
        capacity = (O) !tfgrid.capacity.1
        ```
        """
        out = self.capacity.new()
        self.capacity.set(out)
        return out

    def _find(self, price_timeframe):
        prices = self.tokens.find(timeframe=price_timeframe)
        if len(prices) <= 0:
            return None
        return prices

    def add(self, price, schema_out=None, user_session=None):
        """
        ```in
        price = (O) !tfgrid.token.price.1
        ```

        ```out
        price = (O) !tfgrid.token.price.1
        ```
        """
        return self.tokens.new(data=price).save()

    def delete_all(self, schema_out=None, user_session=None):
        """
        ```out
        nodes = (LO) !tfgrid.token.price.1
        ```
        """
        self.bcdb.destroy()

    def list(self, schema_out=None, user_session=None):
        """
        ```out
        prices = (LO) !tfgrid.token.price.1
        ```
        """
        output = schema_out.new()
        for node in self.tokens.iterate():
            output.prices.append(node)
        return output
