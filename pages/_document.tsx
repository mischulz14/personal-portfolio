import { Head, Html, Main, NextScript } from 'next/document';

import Layout from './components/layout/Layout';
import Navbar from './components/navbar/Navbar';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
