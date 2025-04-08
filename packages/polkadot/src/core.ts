import { ApiPromise, WsProvider } from "@polkadot/api";
import { ApiOptions } from "@polkadot/api/types";

type WsProviderOptions = {
  endpoint?: string | string[];
  autoConnectMs?: number | false;
  headers?: Record<string, string>;
  timeout?: number;
  cacheCapacity?: number;
}
async function initPolkadotApi(
  provider: WsProviderOptions | string,
  apiOptions?: ApiOptions
) {
  let wsProvider;
  if (typeof provider == 'string') {
    wsProvider = new WsProvider(provider)
  } else {
    wsProvider = new WsProvider(
      provider.endpoint,
      provider.autoConnectMs,
      provider.headers,
      provider.timeout,
      provider.cacheCapacity
    );
  }

  return await ApiPromise.create({ provider: wsProvider, ...apiOptions });
}

export { initPolkadotApi, ApiPromise, WsProvider };