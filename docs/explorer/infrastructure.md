# Explorer Infrastructure

## Infrastructure overview

### **TODO: add infrastructure image**


The infrastructure of the explorer network is used for threebot registration, reservations, and communication between threebots within the network. There are two private networks that will be created:

1. **Redis private network** : a private wireguard network to sync all the redis slaves in the DNS machines with the main redis master in the explorer machine

2. **Main private network**: a private wireguard network that will include the DNS machines and the threebot machines registered to provide communication between all threebots created with each other

### Components


### Flow

### Domains

## Explorer Machine [Main machine]

This is the main explorer machine that will handle all registrations of a new threebot being added to the network and reservations in the future. Explorer threebot is running on it with phonebook, gridmanager, and gateway actors loaded. It also contains the main redis data (master) that other DNS machines (slaves) sync with.

### Redis master

### Explorer Wireguard server

### Phonebook threebot actor

### Gridmanager threebot actor

### Gateway threebot actor

## DNS Machines

### TCPRouter

### CoreDNS

### Redis slave

### Routing Wireguard server

## Threebot machines

### Threebot Server

### Threebot identity and registration
