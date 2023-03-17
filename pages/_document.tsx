import { Html, Head, Main, NextScript } from 'next/document';
export default function Document() {
  return (
    <Html lang='en' className='h-screen w-screen'>
      <Head />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' key='title'></meta>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
