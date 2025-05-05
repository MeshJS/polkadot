export interface IPolkadotWallet {
  signTx(tx: string): Promise<string>;
  // submitTx(signedTx: string): Promise<string>;
}
