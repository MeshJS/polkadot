import { useEffect, useState } from "react";

import type { Wallet } from "@meshsdk/polkadot";
import { BrowserWallet } from "@meshsdk/polkadot";

export const useWalletList = () => {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  useEffect(() => {
    async function get() {
      setWallets(await BrowserWallet.getAvailableWallets());
    }
    get();
  }, []);

  return wallets;
};
