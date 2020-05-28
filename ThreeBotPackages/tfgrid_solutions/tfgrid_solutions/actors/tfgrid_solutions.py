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

        ```out
        solutions = (LO) !tfgrid.solutions.1

        @url = tfgrid.solutions.1
        name = ""
        reservation = (S)
        type = ""
        form_info = (S)
        ```
        """

        # Update the solutions from the explorer
        j.sal.reservation_chatflow.solutions_explorer_get()

        solutions = []
        urls = [
            "tfgrid.solutions.minio.1",
            "tfgrid.solutions.flist.1",
            "tfgrid.solutions.kubernetes.1",
            "tfgrid.solutions.ubuntu.1",
            "tfgrid.solutions.network.1",
            "tfgrid.solutions.exposed.1",
            "tfgrid.solutions.delegated_domain.1",
            "tfgrid.solutions.4to6gw.1",
            "tfgrid.solutions.gitea.1",
        ]

        if solution_type == "all":
            for url in urls:
                solutions += j.sal.reservation_chatflow.solutions_get(url)
        else:
            url = "tfgrid.solutions." + solution_type + ".1"
            solutions += j.sal.reservation_chatflow.solutions_get(url)
        out = schema_out.new()
        out.solutions = solutions  # each item is [{name:(S),reservation:(O),type:(S)}]
        return out

    @j.baseclasses.actor_method
    def solution_delete(self, solution_type=None, solution_name=None, schema_out=None, user_session=None):
        """
        ```in
        solution_type = "" (S)
        solution_name = "" (S)
        ```

        ```out
        solutions = (B)

        ```
        """
        if solution_type:
            url = "tfgrid.solutions." + solution_type + ".1"
            j.sal.reservation_chatflow.reservation_cancel_for_solution(url, solution_name)
            return True
        return False

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
        farmers_payment = (dict)

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
