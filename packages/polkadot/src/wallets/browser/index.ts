import { Signer, SubmittableExtrinsic } from "@polkadot/api/types";
import { Hash } from "@polkadot/types/interfaces"
import { IPolkadotWallet } from "../../interfaces";
import { web3Accounts, web3Enable, web3FromAddress } from '@polkadot/extension-dapp';
import { InjectedAccount } from "@polkadot/extension-inject/types"
import { ApiPromise } from "@polkadot/api";
import { ContractPromise } from '@polkadot/api-contract';
import { Codec } from "@polkadot/types/types";
import { ContractCallOutcome } from "@polkadot/api-contract/types";

export type CreatePolkadotBrowserWalletOptions = {
  // networkId: 0 | 1;
  api: ApiPromise;
  account: InjectedAccount;
  signer: Signer;
};


export class BrowserWallet implements IPolkadotWallet {
  readonly api: ApiPromise;
  readonly contracts: { [name: string]: ContractPromise }
  readonly account: InjectedAccount;

  constructor(options: CreatePolkadotBrowserWalletOptions) {
    this.api = options.api;
    this.api.setSigner(options.signer);
    this.account = options.account;
    this.contracts = {}
  }

  // TODO: should we return the pair here or only the account? The signer can be derived for that, but it would require
  // another async call after initialisation (like wallet.setOwnSigner())

  // TODO change this to an interface like mesh-wallet/browser-wallet. Alloy querying for all extensions and accounts and then construct the instance with an enable call
  static async connectWallet (originName: string = 'mesh-sdk') : Promise<[InjectedAccount, Signer]> {
    try {
      const extensions = await web3Enable(originName);
      if (extensions.length === 0) {
        throw new Error('No extension installed');
      }

      const accounts = await web3Accounts();

      if (accounts.length === 0) {
        throw new Error('No accounts found');
      }
      // finds an injector for an address
      const injector = await web3FromAddress(accounts[0]!.address);

      return [accounts[0]!, injector.signer];
    } catch (err: any) {
      throw(`Wallet connection failed: ${err.message}`);
    }
  };

  // TODO: support different ways of loading contracts
  loadContract(name: string, abi: string, address: string) {
    const contract = new ContractPromise(this.api, abi, address);
    // TODO: check if name already exists on this.contracts
    this.contracts[name] = contract;
  }

  async awaitTx(tx: SubmittableExtrinsic<'promise'>): Promise<Hash> {
    return tx.signAndSend(this.account.address)
  }

  async query(query: Promise<ContractCallOutcome>): Promise<Codec> {
    const { result, output } = await query

    // check if the call was successful
    if (result.isOk && output) {
      return output
    } else {
      throw result.asErr
    }
  }
}
