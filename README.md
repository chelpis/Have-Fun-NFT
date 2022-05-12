# HEAVE FUN NFT

## Intorduction
_**Have Fun NFT**_ is a EVM compatible smart contract which based on ERC721 with metadata and enumerable extensions with simple access control feature. The smart contract provides only 4 external functions, `airdrop`, `setMaxSupply`, `setTokenURIPrefix`, `congratulateTarget`.
- `airdrop`: will mint all the remaining tokens to the `Target` address which is set while contract is deploying.
- `setMaxSupply`: the max supply of the token collection can be set at most once a year, (e.g. `max supply = initial max supply + year passed after contract deployed`).
- `congratulateTarget`: what ever message send to the function will result in emitting an `Congrats` event
- `setTokenURIPrefix`

Not too surprised, `transferFrom`, `safeTransferFrom`, `approve`, `setApprovalForAll` are all banned.

## Usage
### Prerequisite
install dependencies
```
    npm i
```

### Compile
```
    npx hardhat compile
```

### Test
```
    npm run test
```

### Deploy
Setup enviornment variables in a `.env` file
`.env` example:
```
MAINNET_URL=<ETH_MAINNET_RPC_URL>
ROPSTEN_URL=<ETH_ROPSTEN_RPC_URL>
POLYGON_MAINNET_URL=<POLYGON_MAINNET_RPC_URL>
POLYGON_MUMBAI_URL=<POLYGON_MUMBAI_RPC_URL>

PRIVATE_KEY=0000000000000000000000000000000000000000000000000000000000000001
TOKEN_NAME="FOO"
TOKEN_SYMBOL="foo"
MAX_SUPPLY=3
TARGET=0x9592cCA31616D28f01Ef65d8a6C6B345D419C3cb
CHELPIS=0xa07AE3051e0be0a6eb90f4009e1E85a156fAff95,0xca78cb29d19afac0d9eb064b3bec8ad7fb4aba97

DEPLOYED_ADDRESS=0xed6f6071099b2F244392A517A4039F9350AdAaEB
TOKEN_URI_PREFIX="https://example.com/"
```

Deploy contract
```
    npm run deploy [-- --network <NETWORK_NAME>]
```

Set Token URI Prefix
```
    npm run seturi [-- --network <NETWORK_NAME>]
```
