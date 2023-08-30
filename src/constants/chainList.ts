import { avalancheFuji, bscTestnet, goerli, polygonMumbai, baseGoerli } from "wagmi/chains";

export const chainList = {
  5: goerli,
  97: bscTestnet,
  80001: polygonMumbai,
  43113: avalancheFuji,
  84531: baseGoerli,
} as const;

export type ChainID = keyof typeof chainList;

export const getSupportedChainIds = () => Object.keys(chainList).map(Number);
export const getSupportedChainConfigs = () => Object.values(chainList);
