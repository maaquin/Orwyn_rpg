import Head from 'next/head';
import { I18nextProvider } from "react-i18next";
import i18n from "@/pages/i18n.jsx";

import icon from '@/public/favicon.ico'

import "@/styles/globals.css";
import "@/styles/dashboardPage.css";

import "@/styles/gameStyles.css";
import "@/styles/mapStyles.css";
import "@/styles/titleScreenStyles.css";
import "@/styles/newGameStyles.css";
import "@/styles/optionsStyles.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Orwyn rpg</title>
        <meta name="description" content="Un RPG narrativo por comandos" />
        <link rel="icon" href={icon} />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
      </Head>

      <I18nextProvider i18n={i18n}>
        <div className="content-container">
          <Component {...pageProps} />
          <div id="menu-portal-root"></div>
        </div>
      </I18nextProvider>
    </>
  );
}