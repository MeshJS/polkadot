import { IPolkadotWallet } from "../../interfaces";
import { ApiPromise, Keyring } from '@polkadot/api';
import { KeyringPair } from '@polkadot/keyring/types';
import { u8aToHex } from '@polkadot/util'

export type CreatePolkadotEmbeddedWalletOptions = {
  api: ApiPromise;
  // TODO: support different methods to initialise keyring
  keyring: {
    keyType: 'sr25519' | 'ed25519';
    phrase: string;
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

export class EmbeddedWallet extends IPolkadotWallet {
  declare public readonly account: KeyringPair
  signData(payload: string) {
    return Promise.resolve(u8aToHex(this.account.sign(payload)))
  }

  constructor(options: CreatePolkadotEmbeddedWalletOptions) {
    const _keyring = new Keyring({ type: options.keyring.keyType })
    const account = _keyring.addFromUri(buildDerivation(options.keyring.phrase, options.keyring.hardDerivation, options.keyring.softDerivation));
    super(options.api, account);
  }
}
