from Jumpscale import j
import time
from Jumpscale.servers.gedis.GedisChatBot import StopChatFlow



class NetworkDeploy(j.servers.chatflow.get_class()):
    steps = [
        "network_reservation",
        "network_info"
    ]

    @j.baseclasses.chatflow_step(title="Deploy Network")
    def network_reservation(self):
        user_form_data = {}
        user_info = self.user_info()

        j.sal.reservation_chatflow.validate_user(user_info)
        user_form_data["chatflow"] = "network"
        network_name = self.string_ask("Please enter a network name", allow_empty=False, field="name")
        user_form_data["Currency"] = self.single_choice(
            "Please choose a currency that will be used for the payment", ["FreeTFT", "TFT"], field="currency"
        )
        if not user_form_data["Currency"]:
            user_form_data["Currency"] = "TFT"

        expiration = self.datetime_picker("Please enter network expiration time.", field="expiration")
        user_form_data["Solution expiration"] = j.data.time.secondsToHRDelta(expiration - j.data.time.epoch)

        ips = ["IPv6", "IPv4"]
        ipversion = self.single_choice(
            "How would you like to connect to your network? IPv4 or IPv6? If unsure, choose IPv4", ips, field="ipversion"
        )

        # create new reservation
        reservation = j.sal.zosv2.reservation_create()
        ip_range = j.sal.reservation_chatflow.ip_range_get(self)
        res = j.sal.reservation_chatflow.solution_model_get(network_name, "tfgrid.solutions.network.1", user_form_data)
        reservation = j.sal.reservation_chatflow.reservation_metadata_add(reservation, res)
        
        # Check if reservation failed
        while True:
            self.config = j.sal.reservation_chatflow.network_create(
                network_name,
                reservation,
                ip_range,
                j.me.tid,
                ipversion,
                expiration=expiration,
                currency=user_form_data["Currency"],
                bot=self,
            )
            try:
                j.sal.reservation_chatflow.reservation_register_and_pay(self.config["reservation_create"], self)
                break
            except StopChatFlow as e:
                if "wireguard listen port already in use" in e.msg:
                    j.sal.zosv2.reservation_cancel(self.config["rid"])
                    time.sleep(5)
                    continue
                raise

        j.sal.reservation_chatflow.reservation_save(
            self.config["rid"], network_name, "tfgrid.solutions.network.1", user_form_data
        )

    @j.baseclasses.chatflow_step(title="Network Information", disable_previous=True)
    def network_info(self):
        message = """
            ### Use the following template to configure your wireguard connection. This will give you access to your network.
            #### Make sure you have <a target="_blank" href="https://www.wireguard.com/install/">wireguard</a> installed
            Click next
            to download your configuration
        """

        self.md_show(j.core.text.strip(message))

        filename = "wg-{}.conf".format(self.config["rid"])
        self.download_file(self.config["wg"], filename)

        message = """
            ### In order to have the network active and accessible from your local/container machine. To do this, execute this command:
            #### ```wg-quick up /etc/wireguard/{}```
            Click next
        """.format(filename)

        self.md_show(j.core.text.strip(message))


chat = NetworkDeploy
