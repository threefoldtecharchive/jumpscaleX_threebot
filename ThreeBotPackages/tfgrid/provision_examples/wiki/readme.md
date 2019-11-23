# Provisioning examples

This package contains some examples scripts how to provision capacity on the TFGrid.

## Ubuntu container

`ubuntu_ssh.py` script consists of the provisioning of a network containing 1 node and 1 external user.  
The scrip will show you how to look for a node with a public IPv6 address and deploy a container on the node.
The container starts an ssh server so the external user can then SSH into the container.

## 0-DBs

`zdb.py` script consists of the provisioning of 3 0-DB namespace on 3 different nodes.
The script will show you how to search for nodes with the required capacity, then will provision a 0-DB namespace on each node.  
Once the 0-DB namespace ready, you will be able to start storing data to it.

## 3 Container network

`multi_nodes.py` script consist of the provisioning of a network containing 3 nodes and 1 external user.
The script will show you how to define a full mesh between the 3 nodes and allow the external user to enter the network using one of the node as entry point and relay for all the other nodes.  
The same SSH container as in `ubuntu_ssh.py` will be deployed on the 3 nodes so the user can then join any of them and test the connectivity of all the containers between them.

## CoreX

In When deploying a container, you always have the option to enable coreX.  
CoreX is a process manager for container that also provide a web interface to your process. So you can watch the logs or interact directly into your container.
To enable coreX, set the `interactive` field in the container workload definition to `True`.
Then you can reach the coreX interface on the port `7681.  Jumpscale also provide a client to talk to the coreX rest API to easily manage the process of the container.

Example how to start the `top` command using coreX

```python
corex = j.clients.new('container1',addr='...',port=7681)
corex.process_start('/usr/bin/top')
{'status': 'success', 'pid': 255298, 'id': 39056608}

corex.process_list()
[{'pid': 255298, 'command': '/usr/bin/top', 'state': 'running', 'id': 39056608, 'status': 0}]
```
