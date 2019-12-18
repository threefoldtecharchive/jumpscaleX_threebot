from Jumpscale import j
import binascii
from io import BytesIO


class tft_explorer(j.baseclasses.threebot_actor):
    def _init(self, *args, **kwargs):
        bcdb = j.data.bcdb.get("tft_explorer")
        # load all models
        # self._model_chain_facts = bcdb.model_get(url="tft.explorer.chain.aggregated.facts.1")
        self._model_chain_context = bcdb.model_get(url="threefold.tft_explorer.tft.explorer.chain.context.1")
        # self._model_object = bcdb.model_get(url="tft.explorer.object.1")
        # self._model_block = bcdb.model_get(url="tft.explorer.block.1")
        # self._model_block_facts = bcdb.model_get(url="tft.explorer.block.facts.1")
        # self._model_transaction = bcdb.model_get(url="tft.explorer.transaction.1")
        # self._model_output = bcdb.model_get(url="tft.explorer.output.1")
        # self._model_contract_atomic_swap = bcdb.model_get(url="threefold.tft_explorer.tft.explorer.contract.atomic.swap.1")
        # self._model_wallet_balance = bcdb.model_get(url="tft.explorer.wallet.balance.1")
        # self._model_wallet_info_ss = bcdb.model_get(url="tft.explorer.wallet.info.ss.1")
        # self._model_wallet_info_ms = bcdb.model_get(url="tft.explorer.wallet.info.ms.1")

    @j.baseclasses.actor_method
    def set_chain_context(self, consensus_change_id, height, timestamp, block_id, schema_out=None, user_session=None):
        """
        ```in
        consensus_change_id = (S)
        height = (I)
        timestamp = (D)
        block_id = (S)
        ```
        """
        chain_ctx = self._model_chain_context.find()
        if not chain_ctx:
            chain_ctx = self._model_chain_context.new()
        else:
            chain_ctx = chain_ctx[0]
        chain_ctx.consensus_change_id = consensus_change_id
        chain_ctx.height = height
        chain_ctx.timestamp = timestamp
        chain_ctx.block_id = block_id
        chain_ctx.save()

    @j.baseclasses.actor_method
    def get_chain_context(self, schema_out=None, user_session=None):
        """
        ```out
        consensus_change_id = (S)
        height = (I)
        timestamp = (D)
        block_id = (S)
        ```
        """
        chain_ctx_out = schema_out.new()
        chain_ctx = self._model_chain_context.find()
        if chain_ctx:
            chain_ctx = chain_ctx[0]
            chain_ctx_out.consensus_change_id = chain_ctx.consensus_change_id
            chain_ctx_out.height = chain_ctx.height
            chain_ctx_out.timestamp = chain_ctx.timestamp
            chain_ctx_out.block_id = chain_ctx.block_id
        return chain_ctx_out
