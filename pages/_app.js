import { ThemeProvider } from 'theme-ui'
import '../styles/globals.css'
import theme from '../styles/theme'
import { loadProgressBar } from "axios-progress-bar";
import { useEffect } from 'react';
import "../styles/nprogress.css";
import {NextSeo} from 'next-seo'

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    loadProgressBar();
  },[])
  return  <ThemeProvider theme={theme}>
    <NextSeo
    title="Spotify Random - New Music Spotify Finder Tool"
      description="Want to find music that fits exactly what you want? This app uses Spotify API to recommend music based on what you want or if you want to try some new music, you can randomize it. Spotify Random - New Music Spotify Finder Tool"
      canonical="https://www.canonical.ie/"
      openGraph={{
        url: 'https://www.spotify-random.vercel.app',
        title: 'Spotify Random - New Music Spotify Finder Tool',
        description: 'Want to find music that fits exactly what you want? This app uses Spotify API to recommend music based on what you want or if you want to try some new music, you can randomize it. Spotify Random - New Music Spotify Finder Tool',
        images: [
          {
            url: 'https://i.gyazo.com/213a79767619ed45e919bde888038d07.png',
            width: 2698,
            height: 1414,
            alt: 'Og Image Alt',
          },
          {
            url: 'https://i.gyazo.com/fc4a1185cecac5c05172e19694cba1b2.png',
            width: 2688,
            height: 1312,
            alt: 'Og Image Alt Second',
          },
          { url: 'https://i.gyazo.com/a46cb41f634133fbb935da540af51502.png' },
        ],
        site_name: 'Spotify Random',
      }}
      twitter={{
        handle: '@raaahhh_sha',
        site: '@raaahhh_sha',
        cardType: 'summary_large_image',
      }}
       />
    <Component {...pageProps} /></ThemeProvider>
}

export default MyApp
