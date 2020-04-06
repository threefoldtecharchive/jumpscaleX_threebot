
## Ubuntu deploy
### ubuntu:
A free and open-source Linux distribution based on Debian.
Ubuntu is officially released in three editions: Desktop, Server, and Core(for internet of things devices and robots).

#### This package is used to deploy a ubuntu in a container on the grid using a chatflow:
Your deployed a ubuntu container will have started from container flist.

* **URL**: {host}/tfgrid_solutions/ubuntu/chat/ubuntu_deploy
* **Inputs**:
   - **container name** a name of your conatiner to help you to get it again with reservation id.
   - **Ubuntu version**: choose ubuntu version flist for your container
   - **cpu needed** : Number of cpu needed
   - **memory size** : Memory size needed example 2048
   - **ssh key** : add your public ssh key `~/.ssh/id_rsa.pub`, if your flist supports using the ssh key from the env variables provided to allow future ssh access
   - **environment variables**: set environment variables on your deployed container, enter comma-separated variable=value For example: var1=value1, var2=value2. Leave empty if not needed
   - **Expiration time**: a network expiration time (minutes=m ,hour=h, day=d, week=w, month=M)
   - **IP Address**: choose the ip address for your ubuntu machine.
* **User setup** 
    - register user threebot on explorer ```kosmos "j.tools.threebot.init_my_threebot(name=3bot_NAME,email=EMAIL)"``` Note: name of 3bot is (your 3bot name).3bot , email is your 3bot email
    - Install [wireguard](https://www.wireguard.com/install/)


After the deployment of the ubuntu is complete, a url will be returned that can be used to access the container through web browser (corex) after up your wireguard configuration.

## Screenshots:

  * chatflow steps:
    ![step1](ubuntu1.png)
    ![step2](ubuntu2.png)
    ![step3](ubuntu3.png)
    ![step4](ubuntu4.png)
    ![step5](ubuntu5.png)
    ![step6](ubuntu6.png)
    ![step7](ubuntu7.png)
    ![step8](ubuntu8.png)
    ![step9](ubuntu9.png)
    ![step10](ubuntu10.png)
    ![step11](ubuntu11.png)
    
    
  * When accessing the link provided and directed to the ubuntu deployed, you will be directed to corex of the machine shown in the following:
![ubuntu deploy](1.png)