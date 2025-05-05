import { ApiPromise } from "@polkadot/api"
import { ContractPromise } from "@polkadot/api-contract";
import { SubmittableExtrinsic } from "@polkadot/api/types";
import { Hash } from "@polkadot/types/interfaces"
import { Account } from "../types";
import { DeriveBalancesAll } from "@polkadot/api-derive/balances/types"


export abstract class IPolkadotWallet {
  // getParachainId(): Promise<number>;
  // initialiseTypedApi<D>(nodeApi: any /*D extends ChainDefinition*/, ws: string): any //TypedApi<D extends ChainDefinition>
  constructor(
    readonly api: ApiPromise,
    readonly account: Account
  ) {};
  contracts: Record<string, ContractPromise> = {};
  loadContract(id: string, abi: string, address: string): void {
    const contract = new ContractPromise(this.api, abi, address);
    // TODO: check if id already exists on this.contracts
    this.contracts[id] = contract;
  };
  signAndSubmit(tx: SubmittableExtrinsic<'promise'>): Promise<Hash> {
    return tx.signAndSend(this.account.address);
  };
  getBalance(): Promise<DeriveBalancesAll> {
    return this.api.derive.balances.all(this.account.address)
  }
  /**
   * Signs the supplied payload which must be hex-encoded.
   * Returns a hex-encoded string
   *
   * @returns SignerResult
   */
  abstract signData(payload: string): Promise<string>
}

export type Wallet = {
  name: string;
  version: string;
}