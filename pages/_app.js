import { ThemeProvider } from 'theme-ui'
import '../styles/globals.css'
import theme from '../styles/theme'
import { loadProgressBar } from "axios-progress-bar";
import { useEffect } from 'react';
import "../styles/nprogress.css";

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    loadProgressBar();
  },[])
  return  <ThemeProvider theme={theme}><Component {...pageProps} /></ThemeProvider>
}

export default MyApp
