import React from "react";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import theme from "@/styles/theme";
import { getSupportedChainConfigs } from "@/constants/chainList";

const { chains, publicClient } = configureChains(
  [...getSupportedChainConfigs()],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "SuperCall",
  projectId: "69310d9946bfc1ee064564f32b24c868",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export default function WagmiRainbowKitProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        theme={lightTheme({
          accentColor: theme.colors.primary,
        })}
        chains={chains}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
