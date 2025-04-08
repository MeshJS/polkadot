import { ApiPromise } from "@polkadot/api"
import { ContractCallOutcome } from "@polkadot/api-contract/types";
import { SubmittableExtrinsic } from "@polkadot/api/types";
import { Hash } from "@polkadot/types/interfaces"
import { Codec } from "@polkadot/types/types";

export interface IPolkadotWallet {
  // signTx(signedTx: string): Promise<string>;
  // submitTx(tx: string): Promise<string>;
  // getBalance(): Promise<Asset[]>;
  // getAccount(): Promise<string>;
  // getParachainId(): Promise<number>;
  // initialiseTypedApi<D>(nodeApi: any /*D extends ChainDefinition*/, ws: string): any //TypedApi<D extends ChainDefinition>
  api: ApiPromise
  loadContract(id: string, abi: string, address: string): void
  awaitTx(tx: SubmittableExtrinsic<'promise'>): Promise<Hash>
  query(query: Promise<ContractCallOutcome>): Promise<Codec>
}