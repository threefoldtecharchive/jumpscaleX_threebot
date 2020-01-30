# Stellar Faucet

A faucet for receiving Threefold Stellar tokens (TFT) on the Stellar testnet.

## Requirements

You need following knowledge to start this server.

- `distributorsecret`: is the secret key of the distributor account which holds all the Stellar TFT's.
- `issueraddress`: is the address (public key) of the Stellar TFT issuer.
- `amount`: is the amount of token you wish to drip with each transfer in this faucet.

## Running

- install frontend dependencies `cd faucet-frontend && npm install`
- build frontend `npm run build`
- execute following:
```
kosmos

#set following environment variables
j.core.myenv.config['distributorsecret'] = $distributorsecret
j.core.myenv.config['issuer'] = $issueraddress
j.core.myenv.config['amount'] = $amount

j.core.myenv.state_save()

j.servers.threebot.start()
```
- server will start at `172.17.0.2/threefold/stellar_faucet/`

## Actors

See [actors](../actors). We have one actor that has one method:

`transfer`: transfers tokens from our distributor account to an address on the Stellar testnet.
