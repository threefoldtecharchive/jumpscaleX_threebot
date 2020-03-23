## Threebot reservation

This package is used to deploy a threebot on a machine using a a chatflow
* **URL**: {IP}/tfgrid/threebot_provisioning/chat/threebot_reservation
* **description**: This wizard will help you deploy or restore your 3bot.
* **User inputs**:
   - Deploy a new 3bot (if you don't have any 3bot container) or Restore my 3bot (if you already have one and you want to restore it)
   - **ssh key** : add your public ssh key `~/.ssh/id_rsa.pub` that's help to connect using ssh
   - **corex user**: add a username for your 3bot (this will allow you secure access to the 3bot from your web browser) using coreX
   - **corex password**: add a password for your 3bot (this will allow you secure access to the 3bot from your web browser) using coreX
   - **Ip version**: choose what your prefer to access your 3bot using IPv4 or IPv6? If unsure, chooose IPv4
   - **IP range**: choose what your prefer Configure IP range myself (will redirect you to page to add your ip range) , Choose IP range for me (will generate IP range for you)
   - **Network name**: ask for add a network name. if you leave it empty it will be generated name
   - **IP Address**: ask for choose the ip address for your 3bot machine.
   - **Backup password**: if you want your 3bot to be automatically backed up (in s3) to restore it again write password for that (Save it for restore again)
* **User setup** 
    - register user threebot on explorer ```kosmos "j.tools.threebot.init_my_threebot()"``` Note: name of 3bot is (your 3bot name).3bot
    - Install [wireguard](https://www.wireguard.com/install/)


After the deployment of the threebot is complete,  a url will be returned that can be used to access it after up your wireguard configuration.