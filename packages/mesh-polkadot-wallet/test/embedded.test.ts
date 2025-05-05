import { EmbeddedWallet } from "../src/embedded";

describe("EmbeddedWallet privateKey", () => {
  const walletMnemonic = new EmbeddedWallet({
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

  beforeAll(async () => {
    await walletMnemonic.init();
  });

  afterAll(async () => {
    await walletMnemonic.disconnect();
  });

  it("should be able to init wallet", async () => {
    expect(await walletMnemonic.isInitialized()).toBe(true);
  });

  it("sign transaction", async () => {
    const unsignedTx = "";
    expect(await walletMnemonic.verifySignature(unsignedTx)).toBe(false);

    const signedTx = await walletMnemonic.signTx(unsignedTx);
    expect(await walletMnemonic.verifySignature(signedTx)).toBe(true);
  });
});
