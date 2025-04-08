export interface IPolkadotWallet {
  // signTx(signedTx: string): Promise<string>;
  // submitTx(tx: string): Promise<string>;
  // getBalance(): Promise<Asset[]>;
  // getAccount(): Promise<string>;
  // getParachainId(): Promise<number>;
  // initialiseTypedApi<D>(nodeApi: any /*D extends ChainDefinition*/, ws: string): any //TypedApi<D extends ChainDefinition>
  loadContract(id: string, abi: string, address: string): void
}