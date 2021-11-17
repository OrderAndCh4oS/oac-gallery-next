import '../styles/globals.css';
import Head from 'next/head';
import TezosProvider from '../contexts/tezos-context';
import ToolsProvider from '../contexts/tools-context';
import Footer from '../components/footer';
import Header from '../components/header';

function MyApp({Component, pageProps}) {
    return (
        <>
            <Head>
                <title>Order &amp; Chaos | Hic et Nunc NFT Gallery</title>
                <meta
                    name="description"
                    content="Gallery of generative art Hic et Nunc objkts created & minted by Order &amp; Chaos."
                />
                <meta name="twitter:card" content="summary"/>
                <meta name="twitter:site" content="@__orderandchaos"/>
                <meta name="twitter:creator" content="@__orderandchaos"/>
                <meta name="twitter:title" content="Order &amp; Chaos Gallery"/>
                <meta
                    name="twitter:description"
                    content="Gallery of Hic et Nunc objkts created & minted by Order &amp; Chaos."
                />
                <meta
                    name="twitter:image"
                    content="https://dwodb1f89mlko.cloudfront.net/logo/order-and-chaos-logo.png"
                />
                <meta property="og:title" content="Order &amp; Chaos Gallery"/>
                <meta property="og:url" content="https://hicetnunc.orderandchaoscreative.com/"/>
                <meta property="og:type" content="gallery"/>
                <meta
                    property="og:description"
                    content="Gallery of Hic et Nunc objkts created & minted by Order &amp; Chaos."
                />
                <meta
                    property="og:image"
                    content="https://dwodb1f89mlko.cloudfront.net/logo/order-and-chaos-logo.png"
                />
                <meta httpEquiv="x-ua-compatible" content="ie=edge"/>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
                <meta
                    name="google-site-verification"
                    content="rTzkSCUNamgc-_HImfxIJuUI3ThHfIN0tby_fh0Nkoo"
                />
                <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png"/>
                <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png"/>
                <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png"/>
                <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png"/>
                <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png"/>
                <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png"/>
                <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png"/>
                <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png"/>
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png"/>
                <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
                <link rel="manifest" href="/manifest.json"/>
                <meta name="msapplication-TileColor" content="#1e2a57"/>
                <meta name="msapplication-TileImage" content="/ms-icon-144x144.png"/>
                <meta name="theme-color" content="#1e2a57"/>
            </Head>
            <TezosProvider>
                <ToolsProvider>
                    <main className="wrapper">
                        <Header/>
                        <Component {...pageProps} />
                        <Footer/>
                    </main>
                </ToolsProvider>
            </TezosProvider>
        </>
    );
}

export default MyApp;
