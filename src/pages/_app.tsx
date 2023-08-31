import HeadMetadata from "@/components/HeadMetadata";
import WagmiRainbowKitProvider from "@/components/WagmiRainbowKitProvider";
import ThemeGlobalStyleProvider from "@/styles/ThemeGlobalStyleProvider";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@/store";
import "@/styles/global.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <HeadMetadata />
      <ThemeGlobalStyleProvider>
        <Provider store={store}>
          <WagmiRainbowKitProvider>
            <Component {...pageProps} />
          </WagmiRainbowKitProvider>
        </Provider>
      </ThemeGlobalStyleProvider>
    </>
  );
}
