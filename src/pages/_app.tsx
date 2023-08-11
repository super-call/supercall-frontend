import HeadMetadata from "@/components/HeadMetadata";
import WagmiRainbowKitProvider from "@/components/WagmiRainbowKitProvider";
import ThemeGlobalStyleProvider from "@/styles/ThemeGlobalStyleProvider";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <HeadMetadata />
      <ThemeGlobalStyleProvider>
        <WagmiRainbowKitProvider>
          <Component {...pageProps} />
        </WagmiRainbowKitProvider>
      </ThemeGlobalStyleProvider>
    </>
  );
}
