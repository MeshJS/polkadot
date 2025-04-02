import { GenericExtrinsic } from "@polkadot/types";
import { EmbeddedWallet } from "../src/embedded";

describe("EmbeddedWallet privateKey", () => {
  const walletMnemonic = new EmbeddedWallet({
    networkId: 0,
    wsProvider: "ws://127.0.0.1:54321",
    keypairType: "ed25519",
    key: {
      type: "mnemonic",
      words: [
        "ramp",
        "over",
        "popular",
        "angry",
        "flock",
        "idle",
        "silent",
        "stove",
        "very",
        "hover",
        "hip",
        "juice",
        "dentist",
        "mask",
        "radar",
        "example",
        "layer",
        "tongue",
        "shift",
        "cement",
        "margin",
        "since",
        "floor",
        "clinic",
      ],
    },
  });

  it("should be able to init wallet", async () => {
    await walletMnemonic.init();
    expect(await walletMnemonic.isInitialized()).toBe(true);
  });

  it("sign transaction", async () => {
    await walletMnemonic.init();

    const unsignedTx = "";

    expect(await walletMnemonic.verifySignature(unsignedTx)).toBe(false);

    const signedTx = await walletMnemonic.signTx(unsignedTx);

    expect(await walletMnemonic.verifySignature(signedTx)).toBe(true);
  });
});
