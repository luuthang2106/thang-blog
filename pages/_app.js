import Head from "next/dist/next-server/lib/head"
import '../styles/globals.css'
import '../styles/admin-layout.css'
import '../styles/pure-form.css'
import '../styles/pure-buttons.css'
import '../styles/nav-bar-mobile.css'
import '../styles/user-layout.css'
import '../styles/accordion.css'
import '../styles/post-card.css'
import '../styles/post-view.css'
import '../styles/paginator.css'
import '../styles/autocomplete.css'

import React from 'react'


function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout ? Component.Layout : React.Fragment;
  return (
    <>
      <Head>
        <title>My Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout >
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp