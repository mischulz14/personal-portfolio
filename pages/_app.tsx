import '@/styles/globals.css';

import ColorThemeProvider from '@/context/ColorThemeContextProvider';
import type { AppProps } from 'next/app';

import Layout from '../components/layout/Layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <ColorThemeProvider>
        <Component {...pageProps} />;
      </ColorThemeProvider>
    </Layout>
  );
}
