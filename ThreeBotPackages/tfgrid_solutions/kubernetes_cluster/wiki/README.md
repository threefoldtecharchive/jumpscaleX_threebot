## Kubernetes cluster deployment

#### This package is used to deploy a Kubernetes cluster with zdb using a chatflow:
A Kubernetes cluster is a set of node machines for running containerized applications. At a minimum, a cluster contains a worker node and a master node.

* **URL**: *{host}/tfgrid_solutions/kubernetes_cluster/chat/kubernetes_cluster_deploy*
* **Inputs**
   - **Ip version** : (IPv4 or IPv6) Version of the machine that will be used to access the cluster. If unsure, chooose IPv4.
   - **number of workers** : number of worker nodes to be deployed, the cluster size will then be the number of workers + 1(master node)
   - **ssh keys** : ssh keys which will be used to allow access for the ssh key holders to the deployed cluster. They should be in a file where each ssh key is on a seperate line
   - **cluster secret** : the secret that will be used to access the cluster deployed. Please keep it safe.
   - **IP range** : Configure network manually by choosing an IP range to use or the deployer can choose for you and generate an IP range automatically
    - **Network name** : a name for the network to deploy on,  if left empty it will be a generated name

* **User setup:**
    - register user threebot on explorer `kosmos "j.tools.threebot.init_my_threebot(name=3bot_NAME,email=EMAIL)"` **Note**: name of 3bot is (your 3bot name).3bot , email is your 3bot email
    - Install [wireguard](https://www.wireguard.com/install/)



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
