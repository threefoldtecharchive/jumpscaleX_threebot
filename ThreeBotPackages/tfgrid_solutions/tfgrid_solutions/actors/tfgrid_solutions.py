import json
from Jumpscale import j


class tfgrid_solutions(j.baseclasses.threebot_actor):
    def _init(self, **kwargs):
        assert self.package.gedis_server
        self._gedis_server = self.package.gedis_server

    def _to_schema(self, schema_out, solutions):
        out = schema_out.new()
        out.solutions = solutions
        return out

    @j.baseclasses.actor_method
    def solutions_list(self, solution_type="all", schema_out=None, user_session=None):
        """
        ```in
        solution_type = "all" (S)
        ```
        """
        listings = {
            "network": j.sal.chatflow_solutions.list_network_solutions,
            "ubuntu": j.sal.chatflow_solutions.list_ubuntu_solutions,
            "flist": j.sal.chatflow_solutions.list_flist_solutions,
            "minio": j.sal.chatflow_solutions.list_minio_solutions,
            "kubernetes": j.sal.chatflow_solutions.list_kubernetes_solutions,
            "gitea": j.sal.chatflow_solutions.list_gitea_solutions,
            "4to6gw": j.sal.chatflow_solutions.list_4to6gw_solutions,
            "delegated_domain": j.sal.chatflow_solutions.list_delegated_domain_solutions,
            "exposed": j.sal.chatflow_solutions.list_exposed_solutions,
            "monitoring": j.sal.chatflow_solutions.list_monitoring_solutions,
        }

        solutions = []
        if solution_type in listings:
            solutions = listings[solution_type]()

        return {"solutions": solutions}

    @j.baseclasses.actor_method
    def solution_cancel(self, wids, schema_out=None, user_session=None):
        try:
            j.sal.chatflow_solutions.cancel_solution(wids)
        except Exception as e:
            raise str(e)

    @j.baseclasses.actor_method
    def payments_list(self, payment_id=None, rid=None, schema_out=None, user_session=None):
        """
        ```in
        payment_id = "" (S)
        rid = "" (S)
        ```

        ```out
        payments = (LO) !tfgrid.payment.1

        @url = tfgrid.payment.1
        rid = ""
        explorer = ""
        currency = ""
        escrow_address = ""
        escrow_asset = ""
        total_amount = ""
        transaction_fees = ""
        payment_source = ""
        farmers_payments = (dict)
        time = (T)

        ```
        """
        model = j.clients.bcdbmodel.get(url="tfgrid.solutions.payment.1")
        payments = []
        if payment_id:
            payment = model.find(id=payment_id)
            if payment:
                payments.append(payment)
        else:
            for payment in model.find():
                if payment.explorer == j.clients.explorer.default.url:
                    if rid and payment.rid != rid:
                        continue
                    payments.append(payment)
        out = schema_out.new()
        out.payments = payments
        return out
