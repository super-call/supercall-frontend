import HeadMetadata from "@/components/HeadMetadata";
import ThemeGlobalStyleProvider from "@/styles/ThemeGlobalStyleProvider";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <HeadMetadata />
      <ThemeGlobalStyleProvider>
        <Component {...pageProps} />
      </ThemeGlobalStyleProvider>
    </>
  );
}
