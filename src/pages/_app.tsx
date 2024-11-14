import { ApolloProvider } from "@apollo/client";
import { FooterTemplate } from "@components/layout/footer";
import { HeaderTemplate } from "@components/layout/header";
import { Loader } from "@components/utility/loader/loader";
import { GlobalProvider, useGlobalContext } from "@context";
import type { AppProps } from "next/app";
import Script from "next/script";
import { client } from "../client";
import "../styles/globals.css";

const Main: React.FC<AppProps> = ({ Component, pageProps }) => {
  const { isLoading } = useGlobalContext();
  return (
    <>
      {isLoading && <Loader global={true} />}
      <HeaderTemplate />
      <Component {...pageProps} />
      <FooterTemplate />
    </>
  );
};

export default function App(props: AppProps) {
  return (
    <ApolloProvider client={client}>
      <GlobalProvider>
        <Script src={client.communicationInjector} strategy="afterInteractive" />
        <Main {...props} />
      </GlobalProvider>
    </ApolloProvider>
  );
}
