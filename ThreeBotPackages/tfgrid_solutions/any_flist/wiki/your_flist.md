## your flist deploy

#### This package is used to deploy any flist in a container on the grid using a chatflow:
Your deployed a container will have started from container flist.

* **URL**: {host}/tfgrid_solutions/any_flist/chat/your_flist
* **Inputs**:
   - **Flist link** : the link of your flist to be deployed. For example: https://hub.grid.tf/usr/example.flist
   - **ssh key** : add your public ssh key `~/.ssh/id_rsa.pub`, if your flist supports using the ssh key from the env variables provided to allow future ssh access
   - **environment variables**: set environment variables on your deployed container, enter comma-separated variable=value For example: var1=value1, var2=value2. Leave empty if not needed
   - **Inetractive**:  choose whether you prefer to access to your container through the web browser (coreX) or not.
   - **IP version**: choose whether you prefer to access your ubuntu container using IPv4 or IPv6. If unsure, chooose IPv4
   - **IP range**: Configure network to manually by choosing an IP range to use or the deployer can choose for you and generate an IP range automatically
   - **Network name**: a name for the network to deploy on,  if left empty it will be a generated name
   - **IP Address**: choose the ip address for your ubuntu machine.
* **User setup** 
    - register user threebot on explorer ```kosmos "j.tools.threebot.init_my_threebot(name=3bot_NAME,email=EMAIL)"``` Note: name of 3bot is (your 3bot name).3bot , email is your 3bot email
    - Install [wireguard](https://www.wireguard.com/install/)


After the deployment of the flist is complete, a url will be returned that can be used to access the container through web browser (corex) or by ssh if your flist support this after up your wireguard configuration.

## Screenshots:
- creating flist with https://hub.grid.tf/tf-bootable/ubuntu:18.04
![](2.png)