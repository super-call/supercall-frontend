import { createPublicClient, createWalletClient, custom } from "viem";
import { chainList, ChainID } from "@/constants/chainList";


export function getPublicClient(chainId: ChainID) {
  return createPublicClient({
    chain: chainList[chainId],
    transport: custom((window as any).ethereum),
  });
}

export function getWalletClient(chainId: ChainID) {
  return createWalletClient({
    chain: chainList[chainId],
    transport: custom((window as any).ethereum),
  });
}