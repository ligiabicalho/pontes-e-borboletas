import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Titillium_Web, Odibee_Sans } from "next/font/google";
import { NextPage } from "next";
import type { ReactElement, ReactNode } from "react";
// import DefaultLayout from "@/layouts/DefaultLayout";
import { Toaster } from "@/components/ui/toaster";
import { ShoppingListProvider } from "@/contexts/shoppingListContext";
import { Analytics } from "@vercel/analytics/react";

export const queryClient = new QueryClient();

const titilliumWeb = Titillium_Web({
  subsets: ["latin"],
  variable: "--font-secondary",
  weight: ["200", "300", "400", "600", "700", "900"],
});

const odibeeSans = Odibee_Sans({
  subsets: ["latin"],
  variable: "--font-primary",
  weight: ["400"],
});

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // const getLayout =
  //   Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>);
  return (
    <QueryClientProvider client={queryClient}>
      <ShoppingListProvider>
        {/* {getLayout(<Component {...pageProps} />)} */}
        <Component {...pageProps} />

        <Analytics />

        <Toaster />

        <style jsx global>{`
          :root {
            --font-primary: ${odibeeSans.style.fontFamily};
            --font-secondary: ${titilliumWeb.style.fontFamily};
          }
        `}</style>
      </ShoppingListProvider>
    </QueryClientProvider>
  );
}
