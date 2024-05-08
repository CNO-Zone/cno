'use client'

import { GrazProvider } from "graz";
import { okp4testnet } from "graz/chains";

// graz doesn't have a chain for drunemeton, so we need to create one (or even better make a PR to add it to graz)
export const Chain = { ...okp4testnet, chainId: "okp4-drunemeton-1", rpc: "https://api.drunemeton.okp4.network/rpc", };

export function Provider({ children }: Readonly<{ children: React.ReactNode }>) {

  return (
    <GrazProvider grazOptions={{ chains: [Chain] }}>
      {children}
    </GrazProvider>
  )
}