FROM paritypr/zombienet:latest

RUN zombie setup polkadot polkadot-parachain -y

ENV PATH="${PATH}:/home/nonroot/zombie-net"

COPY test/test-network.toml /home/nonroot/zombie-net/devnet.toml

CMD ["node", "zombie", "-p", "native", "spawn", "/home/nonroot/zombie-net/devnet.toml"]
