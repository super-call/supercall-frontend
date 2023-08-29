import { avalancheFuji, bscTestnet, goerli, polygonMumbai } from "wagmi/chains";

export const chainList = {
  5: goerli,
  97: bscTestnet,
  80001: polygonMumbai,
  43113: avalancheFuji,
};

export const getSupportedChainIds = () => Object.keys(chainList).map(Number);
export const getSupportedChainConfigs = () => Object.values(chainList);
