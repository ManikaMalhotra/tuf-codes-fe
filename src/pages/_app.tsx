import BaseLayout from "@/layouts/BaseLayout";
import "@/styles/globals.css";
import '@mantine/core/styles.css';
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ColorSchemeScript />
      <MantineProvider withCssVariables defaultColorScheme="light">
        <BaseLayout>
          <Component {...pageProps} />
        </BaseLayout>
      </MantineProvider>
    </>
  );
}
