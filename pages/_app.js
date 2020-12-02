import { ThemeProvider } from "theme-ui";
import "../styles/globals.css";
import theme from "../styles/theme";
import { loadProgressBar } from "axios-progress-bar";
import { useEffect } from "react";
import "../styles/nprogress.css";
import { NextSeo } from "next-seo";
import Favicon from "react-favicon";
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    loadProgressBar();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Favicon url={['https://label-engine.com/news/wp-content/uploads/2016/07/spotify-logo.png', 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F38%2F9b%2F8a%2F389b8ac0be4eb622d98bbd4a6d5f2aaf.jpg&f=1&nofb=1']}/>
      <NextSeo
        title="Spotify Random - New Music Spotify Finder Tool"
        description="Want to find music that fits exactly what you want? This app uses Spotify API to recommend music based on what you want or if you want to try some new music, you can randomize it. Spotify Random - New Music Spotify Finder Tool"
        canonical="https://www.canonical.ie/"
        openGraph={{
          url: "https://www.spotify-random.vercel.app",
          title: "Spotify Random - New Music Spotify Finder Tool",
          description:
            "Want to find music that fits exactly what you want? This app uses Spotify API to recommend music based on what you want or if you want to try some new music, you can randomize it. Spotify Random - New Music Spotify Finder Tool",
          images: [
            {
              url: "https://i.gyazo.com/213a79767619ed45e919bde888038d07.png",
              width: 2698,
              height: 1414,
              alt: "Og Image Alt",
            },
            {
              url: "https://i.gyazo.com/fc4a1185cecac5c05172e19694cba1b2.png",
              width: 2688,
              height: 1312,
              alt: "Og Image Alt Second",
            },
            { url: "https://i.gyazo.com/a46cb41f634133fbb935da540af51502.png" },
          ],
          site_name: "Spotify Random",
        }}
        twitter={{
          handle: "@raaahhh_sha",
          site: "@raaahhh_sha",
          cardType: "summary_large_image",
        }}
      />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
