import { ContractPromise } from "@polkadot/api-contract";
import { IPolkadotWallet } from "../../interfaces";
import { Keyring } from '@polkadot/api';

export type CreatePolkadotEmbeddedWalletOptions = {
  // networkId: 0 | 1;
  api: any;
  keyring: {
    keyType: 'sr25519' | 'ed25519';
    phrase: string; // TODO: support different methods to initialise keyring
    hardDerivation?: string;
    softDerivation?: string;
  }
};

const buildDerivation = (phrase: string, hardDerivation?: string, softDerivation?: string) => {
  let r = phrase
  if (hardDerivation) {
    r = `${r}//${hardDerivation}`
  }
  if (softDerivation) {
    r = `${r}/${softDerivation}`
  }
  return r
}

export class EmbeddedWallet implements IPolkadotWallet {
  // private readonly _networkId: 0 | 1;
  readonly api: any
  readonly contracts: Map<string, ContractPromise>
  private readonly _keyring: Keyring
  private readonly _keypair: any

  constructor(options: CreatePolkadotEmbeddedWalletOptions) {
    this.api = options.api;
    this._keyring = new Keyring({type: options.keyring.keyType})
    this._keypair = this._keyring.addFromUri(buildDerivation(options.keyring.phrase, options.keyring.hardDerivation, options.keyring.softDerivation));
    this.contracts = new Map();
  }

  loadContract(name: string, abi: string, address: string) {
    const contract = new ContractPromise(this.api, abi, address);
    this.contracts.set(name, contract);
  }
}
