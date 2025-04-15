import React, { useEffect, useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { Check } from "lucide-react";
import { Wallet, BrowserWallet, CreatePolkadotBrowserWalletOptions } from "@meshsdk/polkadot";
// import { useWalletList } from "../hooks/useWalletList";

type ConnectProps = {
  options: CreatePolkadotBrowserWalletOptions
}

export const ConnectWallet: React.FC<ConnectProps> = ({ options }) => {
  // const wallets = useWalletList();
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);
  const [connecting, setConnecting] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    async function get() {
      setWallets(await BrowserWallet.getAvailableWallets());
    }
    get();
  }, []);

  const handleSelectWallet = async (wallet: Wallet) => {
    setConnecting(true);
    try {
      await BrowserWallet.enable(wallet.name, options);
      setSelectedWallet(wallet);
      setOpen(false);
    } catch (err) {
      console.error("Failed to enable wallet:", err);
    } finally {
      setConnecting(false);
    }
  };

  return (
    <div className="relative inline-block">
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            disabled={connecting}
          >
            {connecting
              ? "Connecting..."
              : selectedWallet
              ? selectedWallet.name
              : "Connect Wallet"}
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            side="bottom"
            align="start"
            className="z-50 mt-2 w-64 rounded-lg border bg-white p-4 shadow-md"
          >
            {wallets.length === 0 ? (
              <div className="text-center text-gray-500">No wallets available</div>
            ) : (
              <ul className="space-y-2">
                {wallets.map((wallet: Wallet) => (
                  <li key={wallet.name}>
                    <button
                      onClick={() => handleSelectWallet(wallet)}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-gray-100 transition text-left"
                    >
                      <span>{wallet.name}</span>
                      {selectedWallet?.name === wallet.name && (
                        <Check className="w-4 h-4 text-green-500" />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
};
