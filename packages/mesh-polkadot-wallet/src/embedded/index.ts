import { ApiPromise, WsProvider, Keyring } from "@polkadot/api";
import { IPolkadotWallet } from "../../interfaces";
import { GenericExtrinsic } from "@polkadot/types";
import { KeypairType } from "@polkadot/util-crypto/types";
import { KeyringPair } from "@polkadot/keyring/types";

export type CreatePolkadotEmbeddedWalletOptions = {
  wsProvider: string;
  keypairType: KeypairType;
  key: EmbeddedWalletKeyType;
};

export type KeyType = {
  keypairType: KeypairType;
  type: "mnemonic";
};

// TODO: Explore all the possible key types
export type EmbeddedWalletKeyType =
  | {
      type: "mnemonic";
      words: string[];
    }
  | {
      type: "keypair";
      publicKey: Uint8Array;
      secretKey: Uint8Array;
    };

export class EmbeddedWallet implements IPolkadotWallet {
  private readonly _wsProvider: WsProvider;
  private _api?: ApiPromise;

  private readonly _keyring: Keyring;
  private readonly _keyringPair: KeyringPair;

  constructor(options: CreatePolkadotEmbeddedWalletOptions) {
    this._wsProvider = new WsProvider(options.wsProvider);
    this._keyring = new Keyring({ type: options.keypairType });

    switch (options.key.type) {
      case "mnemonic": {
        this._keyringPair = this._keyring.addFromMnemonic(
          options.key.words.join(" "),
        );
        break;
      }
      case "keypair": {
        this._keyringPair = this._keyring.addFromPair({
          publicKey: options.key.publicKey,
          secretKey: options.key.secretKey,
        });
        break;
      }
    }
  }

  /**
   * Initialise a wallet, connecting to a network
   */
  async init() {
    this._api = await ApiPromise.create({ provider: this._wsProvider });
  }

  async isInitialized(): Promise<boolean> {
    return this._api !== undefined;
  }

  async signTx(serialisedTx: string): Promise<string> {
    if (this._api === undefined) {
      throw new Error("Polkadot API not initialised.");
    }
    const extrinsic = new GenericExtrinsic(this._api.registry, serialisedTx);
    const nonce = await this._api.rpc.system.accountNextIndex(
      this._keyringPair.address,
    );
    const blockHash = await this._api.rpc.chain.getFinalizedHead();

    const signed = extrinsic.sign(this._keyringPair, {
      genesisHash: this._api.genesisHash.toU8a(),
      blockHash,
      nonce: nonce.toBigInt(),
      runtimeVersion: this._api.runtimeVersion,
    });

    return signed.toHex();
  }

  async verifySignature(serialisedTx: string): Promise<boolean> {
    if (this._api === undefined) {
      throw new Error("Polkadot API not initialised.");
    }
    const extrinsic = new GenericExtrinsic(this._api.registry, serialisedTx);

    return extrinsic.isSigned;
  }
}
