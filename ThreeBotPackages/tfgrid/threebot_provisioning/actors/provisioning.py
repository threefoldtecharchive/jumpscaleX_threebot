from Jumpscale import j


class provisioning(j.baseclasses.threebot_actor):
    def _init(self, **kwargs):
        self.token = j.clients.digitalocean.get("provisioning").token_

    @j.baseclasses.actor_method
    def threebot_create(self, name, schema_out=None, user_session=None):
        """
        ```in
        name = (S)
        do_token = (S)
        do_project_name = (S)
        ssh_key = (S)
        ```
        """
        deployer = j.me.encryptor.tools_deploy.get()
        machine = deployer.machines.get_available()
        machine.threebot_deploy()

    @j.baseclasses.actor_method
    def threebot_registration(self, name, doublename, email, description, schema_out=None, user_session=None):
        """
        ```in
        name = (S)
        doublename = (S)
        email = (S)
        description = (S)
        ```
        """
        container = j.me.encryptor.tools_deploy.get_by_double_name(doublename)
        client = container.threebot_client
        client.actors.registration.register(doublename, email, description)
