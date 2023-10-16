import { Head, Html, Main, NextScript } from 'next/document';

import Layout from '../components/layout/Layout';
import Navbar from '../components/navbar/Navbar';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="overflow-hidden">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
