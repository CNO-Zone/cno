'use client';

import { Button } from "@/components/ui/button";
import { useAccount, useSuggestChainAndConnect, useQuerySmart } from "graz";
import { WalletType } from "graz";
import { Chain } from "../provider";
import { useRouter } from "next/navigation";

export default function Form() {
  const router = useRouter()
  const { suggestAndConnect } = useSuggestChainAndConnect({ onSuccess: () => router.push('/dashboard') });
  const { data: account } = useAccount();

  // Redirect to dashboard if already connected, temporary solution
  if (account) {
    router.push('/dashboard');
  }

  const handleConnect = (walletType: WalletType) => {
    suggestAndConnect({ chainInfo: Chain, walletType })
  };

  return (
    <>
      <div className="grid gap-2">
        <Button className="w-full" onClick={() => handleConnect(WalletType.KEPLR)}>
          Login with Keplr
        </Button>
      </div>
      <div className="grid gap-2">
        <Button className="w-full" onClick={() => handleConnect(WalletType.LEAP)}>
          Login with Leap
        </Button>
      </div>
    </>
  );
}
