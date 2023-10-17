import '@/styles/globals.css';

import ColorThemeProvider from '@/context/ColorThemeContextProvider';
import MemoryCardContextProvider from '@/context/MemoryGameContextProvider';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';

import Layout from '../components/layout/Layout';

function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <ColorThemeProvider>
        <MemoryCardContextProvider>
          <Component {...pageProps} />;
        </MemoryCardContextProvider>
      </ColorThemeProvider>
    </Layout>
  );
}

export default appWithTranslation(App);
