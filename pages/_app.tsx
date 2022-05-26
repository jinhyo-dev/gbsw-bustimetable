import '../styles/globals.scss'
import Head from 'next/head'
import type {AppProps} from 'next/app'

function MyApp({Component, pageProps}: AppProps) {
  return (
    <>
      <Head>
        <link rel='icon' href='https://img.icons8.com/plasticine/100/000000/bus--v1.png'/>
        <title>GBSW | Bus TimeTable</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp