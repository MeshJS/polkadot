# mesh-polkadot

[meshjs.dev](https://meshjs.dev/)

## Notes


- API is currently exposing polkadot.js types directly. We should re-define those locally so the API is independent of the underlying library used
- Add some functionality similar to getNetworkId in Cardano to determine information about which chain we are connected to
- Consider switching underlying library to papi
  - Requires cli to download metadata from node and generate ts types
  - Generating ts code has some issues as the users will have to make sure their build system is compatible