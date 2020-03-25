## MinIO deployment

#### This package is used to deploy MinIO on a machine and create multiple zdb for the storage cluster using a chatflow:
MinIO is a high performance object storage. With the assist of the chatflow the user will deploy a machine with MinIO along with the number of zdbs needed for storage.

* **URL**: *{host}/tfgrid_solutions/minio/chat/minio_deploy*
* **Inputs**
   - **Ip version** : (IPv4 or IPv6) Version of the machine that will be used to access MinIO. If unsure, chooose IPv4.
   - **db password** : password used for all zdb storage
   - **disk type for storage** : (SSD or HDD) disk type to be used by zdb databases where storage will take place
   - **database mode** : (seq or user) mode in which all zdb databases will run with
   - **access key & secret** : access key and secret pair that will be used to access MinIO deployed. This should be kept safely as it will provide access to the deployed infrastructure.
   - **cpu needed** : Number of cpu needed
   - **memory size** : Memory size needed example 2048
   - **number of data drives and parity drives** : number of drives needed and hence the number of zdbs to be created. Take care of the ratio between the number of data drives and the number of parity drives ([more info about drives](https://docs.min.io/docs/minio-erasure-code-quickstart-guide.html))
   - **IP range** : Configure network manually by choosing an IP range to use or the deployer can choose for you and generate an IP range automatically
    - **Network name** : a name for the network to deploy on,  if left empty it will be a generated name
    - **IP Address** : choose the ip address for your MinIO machine.

* **User setup:**
    - register user threebot on explorer `kosmos "j.tools.threebot.init_my_threebot(name=3bot_NAME,email=EMAIL)"` **Note**: name of 3bot is (your 3bot name).3bot , email is your 3bot email
    - Install [wireguard](https://www.wireguard.com/install/)



After the deployment of MinIO is complete,  a url will be returned that can be used to access it.

#### Login Page
Once accessing the url the following is shown once redirected to MinIO login(access key and secret are to be used here)
![](login.png)

#### MinIO UI
Once logged in using the previous page, you can upload and use the browser to navigate through all your items
![](upload.png)
