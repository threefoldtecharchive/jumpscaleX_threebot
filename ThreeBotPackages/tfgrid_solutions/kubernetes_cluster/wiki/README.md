## Kubernetes cluster deployment

#### This package is used to deploy a Kubernetes cluster with zdb using a chatflow:
A Kubernetes cluster is a set of node machines for running containerized applications. At a minimum, a cluster contains a worker node and a master node.

* **URL**: *{host}/tfgrid_solutions/kubernetes_cluster/chat/kubernetes_cluster_deploy*
* **Inputs**
   - **container name** a name of your conatiner to help you to get it again with reservation id.
   - **number of workers** : number of worker nodes to be deployed, the cluster size will then be the number of workers + 1(master node)
   - **ssh keys** : ssh keys which will be used to allow access for the ssh key holders to the deployed cluster. They should be in a file where each ssh key is on a seperate line
   - **Expiration time**: a network expiration time (minutes=m ,hour=h, day=d, week=w, month=M)
   - **cluster secret** : the secret that will be used to access the cluster deployed. Please keep it safe.
   - **IP range** : Configure network manually by choosing an IP range to use or the deployer can choose for you and generate an IP range automatically
    - **Network name** : a name for the network to deploy on,  if left empty it will be a generated name

* **User setup:**
    - register user threebot on explorer `kosmos "j.me.encryptor.tools.init_my_threebot(name=3bot_NAME,email=EMAIL)"` **Note**: name of 3bot is (your 3bot name).3bot , email is your 3bot email
    - Install [wireguard](https://www.wireguard.com/install/)


### Screenshots:
  * chatflow steps:
  ![Step1](k8s1.png)
  ![Step2](k8s2.png)
  ![Step3](k8s3.png)
  ![Step4](k8s4.png)
  ![Step5](k8s5.png)
  ![Step6](k8s6.png)
  ![Step7](k8s7.png)
  ![Step8](k8s8.png)
  
After the deployment of the Kubernetes cluster is complete, the user with the ssh keys will have access to the deployed cluster.

Once the user added the wireguard configuration and made sure it is up and running on their machine, they can ssh to the machine using
```bash
ssh rancher@IP_OF_CONTAINER
```
To verify the nodes created on the machine after ssh
```bash
kubectl get nodes
```
![](nodes.png)
