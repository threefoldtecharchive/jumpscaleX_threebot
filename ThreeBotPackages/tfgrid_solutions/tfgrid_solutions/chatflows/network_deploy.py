from Jumpscale import j
import time
from Jumpscale.servers.gedis.GedisChatBot import StopChatFlow


class NetworkDeploy(j.servers.chatflow.get_class()):
    steps = ["network_reservation", "network_info"]
    model = j.threebot.packages.tfgrid_solutions.tfgrid_solutions.bcdb_model_get("tfgrid.solutions.network.1")

    @j.baseclasses.chatflow_step(title="Deploy Network")
    def network_reservation(self):
        user_form_data = {}
        user_info = self.user_info()

        j.sal.reservation_chatflow.validate_user(user_info)
        user_form_data["chatflow"] = "network"
        network_name = j.sal.reservation_chatflow.network_name_add(self, self.model)

        user_form_data["Currency"] = self.single_choice(
            "Please choose a currency that will be used for the payment",
            ["FreeTFT", "TFT"],
            default="TFT",
            required=True,
        )

        expiration = self.datetime_picker(
            "Please enter network expiration time.",
            required=True,
            min_time=[3600, "Date/time should be at least 1 hour from now"],
            default=j.data.time.epoch + 3900,
        )
        user_form_data["Solution expiration"] = j.data.time.secondsToHRDelta(expiration - j.data.time.epoch)

        ips = ["IPv6", "IPv4"]
        ipversion = self.single_choice(
            "How would you like to connect to your network? IPv4 or IPv6? If unsure, choose IPv4", ips, required=True
        )
        # Check if reservation failed
        farms = j.sal.reservation_chatflow.farm_names_get(1, self)
        access_node = j.sal.reservation_chatflow.nodes_get(
            1, farm_names=farms, currency=user_form_data["Currency"], ip_version=ipversion
        )[0]

        # create new reservation
        reservation = j.sal.zosv2.reservation_create()
        ip_range = j.sal.reservation_chatflow.ip_range_get(self)
        res = j.sal.reservation_chatflow.solution_model_get(network_name, "tfgrid.solutions.network.1", user_form_data)
        reservation = j.sal.reservation_chatflow.reservation_metadata_add(reservation, res)

        while True:
            self.config = j.sal.reservation_chatflow.network_create(
                network_name,
                reservation,
                access_node,
                ip_range,
                j.me.tid,
                ipversion,
                expiration=expiration,
                currency=user_form_data["Currency"],
                bot=self,
            )
            try:
                j.sal.reservation_chatflow.reservation_register_and_pay(self.config["reservation_create"], bot=self)
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

        self.md_show(j.core.text.strip(message), md=True, html=True)

        filename = "wg-{}.conf".format(self.config["rid"])
        self.download_file(msg=f'<pre>{self.config["wg"]}</pre>', data=self.config["wg"], filename=filename, html=True)

        message = f"""
### In order to have the network active and accessible from your local/container machine. To do this, execute this command:
#### ```wg-quick up /etc/wireguard/{filename}```
# Click next
        """

        self.md_show(message, md=True)


chat = NetworkDeploy
