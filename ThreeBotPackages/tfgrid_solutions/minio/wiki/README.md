## MinIO deployment

#### This package is used to deploy MinIO on a machine and create multiple zdb for the storage cluster using a chatflow:
MinIO is a high performance object storage. With the assist of the chatflow the user will deploy a machine with MinIO along with the number of zdbs needed for storage.

* **URL**: *{host}/tfgrid_solutions/minio/chat/minio_deploy*
* **Inputs**
    **container name** a name of your conatiner to help you to get it again with reservation id.
   - **db password** : password used for all zdb storage
   - **disk type for storage** : (SSD or HDD) disk type to be used by zdb databases where storage will take place
   - **database mode** : (seq or user) mode in which all zdb databases will run with
   - **access key & secret** : access key and secret pair that will be used to access MinIO deployed. This should be kept safely as it will provide access to the deployed infrastructure.
   - **cpu needed** : Number of cpu needed
   - **memory size** : Memory size needed example 2048
   - **number of data drives and parity drives** : number of drives needed and hence the number of zdbs to be created. Take care of the ratio between the number of data drives and the number of parity drives ([more info about drives](https://docs.min.io/docs/minio-erasure-code-quickstart-guide.html))
    - **Expiration time**: a network expiration time (minutes=m ,hour=h, day=d, week=w, month=M)
    - **IP Address** : choose the ip address for your MinIO machine.

* **User setup:**
    - register user threebot on explorer `kosmos "j.tools.threebot.init_my_threebot(name=3bot_NAME,email=EMAIL)"` **Note**: name of 3bot is (your 3bot name).3bot , email is your 3bot email
    - Install [wireguard](https://www.wireguard.com/install/)




After the deployment of MinIO is complete,  a url will be returned that can be used to access it.

### Screenshots:
   -![Step1](minio1.png)
   -![Step2](minio2.png)
   -![Step3](minio3.png)
   -![Step4](minio4.png)
   -![Step5](minio5.png)
   -![Step6](minio6.png)
   -![Step7](minio7.png)
   -![Step8](minio9.png)
   -![Step9](minio10.png)
   -![Step10](minio11.png)
   -![Step11](minio12.png)
   -![Step12](minio13.png)
   -![Step13](minio14.png)
   -![Step14](minio15.png)
   -![Step15](minio16.jpg)
#### Login Page
Once accessing the url the following is shown once redirected to MinIO login(access key and secret are to be used here)
![](login.png)

#### MinIO UI
Once logged in using the previous page, you can upload and use the browser to navigate through all your items
![](upload.png)
