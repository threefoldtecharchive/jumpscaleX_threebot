## Network deployment

#### This package is used to deploy network and generate wireguard to use it in any solutions:

* **URL**: *{host}/tfgrid_solutions/network/chat/network_deploy*
* **Inputs**
    - **Network name** : a name for the network to deploy on,  if left empty it will be a generated name
    - **Expiration time**: a network expiration time (minutes=m ,hour=h, day=d, week=w, month=M)
    - **Ip version** : (IPv4 or IPv6) Version of the entrypoint node.
    - **IP range** : Configure network manually by choosing an IP range to use or the deployer can choose for you and generate an IP range automatically
    - **Network name** : a name for the network to deploy on,  if left empty it will be a generated name

* **User setup:**
    - register user threebot on explorer `kosmos "j.me.encryptor.tools.init_my_threebot(name=3bot_NAME,email=EMAIL)"` **Note**: name of 3bot is (your 3bot name).3bot , email is your 3bot email
    - Install [wireguard](https://www.wireguard.com/install/)

#### Screenshots
   * chatflow steps:
   ![Step1](network1.png)
   ![Step2](network2.png)
   ![Step3](network3.png)
   ![Step4](network4.png)
   ![Step5](network5.png)
   ![Step6](network6.png)
   ![Step7](network7.png)