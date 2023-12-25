import '@/styles/globals.css';

import ColorThemeProvider from '@/context/ColorThemeContextProvider';
import MemoryCardContextProvider from '@/context/MemoryGameContextProvider';
import createApolloClient from '@/server/src/apollo-client';
import { ApolloProvider } from '@apollo/client';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';

import Layout from '../components/layout/Layout';

function App({ Component, pageProps }: AppProps) {
  const client = createApolloClient();
  return (
    <ApolloProvider client={client}>
      <Layout>
        <ColorThemeProvider>
          <MemoryCardContextProvider>
            <Component {...pageProps} />
          </MemoryCardContextProvider>
        </ColorThemeProvider>
      </Layout>
    </ApolloProvider>
  );
}

export default appWithTranslation(App);
