import { ApiOptions, Signer } from "@polkadot/api/types";
import { IPolkadotWallet } from "../../interfaces";
import { web3Accounts, web3Enable, web3FromAddress } from '@polkadot/extension-dapp';
import { ApiPromise } from "@polkadot/api";
import { initPolkadotApi, WsProviderOptions } from "../../core";
import { Account } from "../../types/account";

export type CreatePolkadotBrowserWalletOptions = {
  provider: WsProviderOptions;
  api: ApiOptions;
};

export class BrowserWallet extends IPolkadotWallet {
  private constructor(
    api: ApiPromise,
    account: Account,
    readonly signer: Signer
  ) { super(api, account); }

  async signData(payload: string) {
    if (this.signer.signRaw) {
      const { signature } = await this.signer.signRaw({
        address: this.account.address,
        data: payload,
        type: 'bytes'
      });
      return signature
    } else {
      throw new Error('Signer unable to sign raw data')
    }
  }

  /**
   * Returns a list of wallets installed on user's device. Each wallet is an object with the following properties:
   * - A name is provided to display wallet's name on the user interface.
   * - A version is provided to display wallet's version on the user interface.
   *
   * @returns a list of wallet names
   */
  static async getAvailableWallets(originName: string = 'mesh-sdk'): Promise<Wallet[]> {
    const extensions = await web3Enable(originName);
    if (extensions.length === 0) {
      throw new Error('No extension installed');
    }
    return extensions
  }

  /**
   * This is the entrypoint to start communication with the user's wallet. The wallet should request the user's permission to connect the web page to the user's wallet, and if permission has been granted, the wallet will be returned and exposing the full API for the dApp to use.
   *
   * Query BrowserWallet.getAvailableWallets() to get a list of available wallets, then provide the wallet name for which wallet the user would like to connect with.
   *
   * @param walletName - the name of the wallet to enable (e.g. "talisman")
   * @param extensions - optional, a list of CIPs that the wallet should support
   * @returns WalletInstance
   */
  static async enable(
    walletName: string,
    options: CreatePolkadotBrowserWalletOptions,
  ): Promise<BrowserWallet> {
    try {
      const accounts = await web3Accounts({extensions: [walletName]});
      if (accounts.length === 0) {
        throw new Error('No accounts found');
      }
      // TODO: how do we select the account?
      const account = accounts[0]!;

      const api = await initPolkadotApi(options.provider, options.api);

      const injector = await web3FromAddress(account.address);

      return new BrowserWallet(api, account, injector.signer);
    } catch (error) {
      throw new Error(
        `[BrowserWallet] An error occurred during enable: ${JSON.stringify(
          error,
        )}.`,
      );
    }
  }
}
