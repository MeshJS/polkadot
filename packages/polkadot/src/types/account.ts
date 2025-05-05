import { KeypairType } from "@polkadot/util-crypto/types";

export interface Account {
    address: string;
    meta: {
        genesisHash?: string | null;
        name?: string;
        source?: string;
    };
    type?: KeypairType;
}