# Simple RPC js tester

## Prerequisites 

You will need to have Node.js installed in your OS. 
Visit [https://nodejs.org/en/download/package-manager#snap](https://nodejs.org/en/download/package-manager#snap) to see instructions how can you achieve that for a number of Operating Systems.

## About the code
This simple script stress tests given RPC by querying it for all transfers of a given ERC20 smart contract. Then it builds a list of unique addresses that historically had some of aforementioned ERC20 tokens in their wallets.

## How to run it

Install necessary packages
```
npm i
```

Run the app
```
node test1.js
```

## What to expect:


## How to change parameters

config can be found in .env file:
```
RPC=http://YOUR_RPC_HOSTNAME.local:8545
SMART_CONTRACT_ETH=0x7DD9c5Cba05E151C895FDe1CF355C9A1D5DA6429
```

RPC in this example is hosted in the local network on a machine supporting mdns. 

Sample smartcontract above is the address of GLM ERC20 token.
