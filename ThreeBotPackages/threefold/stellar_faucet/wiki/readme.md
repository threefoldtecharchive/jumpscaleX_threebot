# Stellar Faucet

A faucet for receiving Threefold Stellar tokens (TFT) on the Stellar testnet.

## Requirements

You need following knowledge to start this server.

- `secret`: is the secret key of the faucet account which holds the Stellar TFT's.
- `issuer`: is the address (public key) of the Stellar TFT issuer.
- `amount`: is the amount of token you wish to drip with each transfer in this faucet.

## Running

- install frontend dependencies `cd faucet-frontend && npm install`
- build frontend `npm run build`
- execute following:
```
kosmos

faucet = j.clients.stellar_faucet.new(
  name="faucet",
  secret=$secret,
  issuer=$issuer,
  amount=$amount
)

j.servers.threebot.start()
```
- server will start at `172.17.0.2/threefold/stellar_faucet/`

## Actors

See [actors](../actors). We have one actor that has one method:

`transfer`: transfers tokens from our distributor account to an address on the Stellar testnet.
