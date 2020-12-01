import Head from "next/head";
import { Box } from "rebass";
import Dropdown from "../components/Dropdown";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "../components/Slider";
import Darkness from "../components/Darkness";
import 'axios-progress-bar/dist/nprogress.css';
import { loadProgressBar } from 'axios-progress-bar';


export default function Home() {
  const spotify = {
    clientID: "39ca797415f84106a2925c00c50821f0",
    clientSecret: "acb471e039314317b1c7d99e9cf9c2a1",
  };

  const date = [
    { val: 1, id: "A" },
    { val: 2, id: "B" },
    { val: 3, id: "C" },
  ];

  useEffect(()=> {
    loadProgressBar();
    
  },[])

  const [token, setToken] = useState([]);
  const [genre, setGenre] = useState({
    selectedGenre: [],
    listOfGenresFromAPI: [],
  });
  const [tracks, setTracks] = useState({
    track_names: [],
    track_artists: [],
    track_art: [],
    track_preview: [],
  });
  //
  const submit = (e) => {
    e.preventDefault();
    if(genre.selectedGenre.length < 1) {
      return alert('You must at least add one genre!')
    }
    axios(
      `https://api.spotify.com/v1/recommendations?limit=4&market=US&seed_genres=${genre.selectedGenre.join(
        "%2C"
      )}
      &target_acousticness=${acousticSlider / 100}
      &target_danceability=${
        danceabilitySlider / 100
      }
      &target_energy=${energySlider / 100}
      &target_instrumentalness=${
        instrumentalSlider / 100
      }
      &target_liveness=${livenessSlider / 100}
      &target_loudness=${
        loudnessSlider / 100
      }
      &target_tempo=${
        tempoSlider / 100
      }
      &target_valence=${valenceSlider / 100}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    ).then((submissionRes) => {
      console.log(submissionRes);
      setTracks({
        track_names: {
          one: submissionRes.data.tracks[0].name,
          two: submissionRes.data.tracks[1].name,
          three: submissionRes.data.tracks[2].name,
          four: submissionRes.data.tracks[3].name,
        },
        track_artists: {
          one: submissionRes.data.tracks[0].artists[0].name,
          two: submissionRes.data.tracks[1].artists[0].name,
          three: submissionRes.data.tracks[2].artists[0].name,
          four: submissionRes.data.tracks[3].artists[0].name,
        },
        track_art: {
          one: submissionRes.data.tracks[0].album.images[0].url,
          two: submissionRes.data.tracks[1].album.images[0].url,
          three: submissionRes.data.tracks[2].album.images[0].url,
          four: submissionRes.data.tracks[3].album.images[0].url,
        },
        track_preview: {
          one: submissionRes.data.tracks[0].external_urls.spotify,
          two: submissionRes.data.tracks[1].external_urls.spotify,
          three: submissionRes.data.tracks[2].external_urls.spotify,
          four: submissionRes.data.tracks[3].external_urls.spotify,
        },
      });
    });
  };

  useEffect(() => {
    document.onresize = resizeCheck
  })

  const [mobile, setMobile] = useState();

  const resizeCheck = (e) => {
    e = e || window.event
      console.log(e)
  }

  useEffect(() => {
    axios("https://accounts.spotify.com/api/token", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " + btoa(spotify.clientID + ":" + spotify.clientSecret),
      },
      data: "grant_type=client_credentials",
      method: "POST",
    }).then((tokenResponse) => {
      setToken(tokenResponse.data.access_token);

      axios(
        "https://api.spotify.com/v1/recommendations/available-genre-seeds",
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + tokenResponse.data.access_token,
          },
        }
      ).then((genreRes) => {
        setGenre({
          selectedGenre: genre.selectedGenre,
          listOfGenresFromAPI: genreRes.data.genres,
        });
      });
    });
  }, [genre.selectedGenre, spotify.clientID, spotify.clientSecret]);

  const genreChanged = (val) => {
    let j = [...genre.selectedGenre];
    j.push(val);
    setGenre({
      selectedGenre: j,
      listOfGenresFromAPI: genre.listOfGenresFromAPI,
    });
  };

  const genreRemoved = (val) => {
    let j = [...genre.selectedGenre];
    j.splice(val, 1);
    setGenre({
      selectedGenre: j,
      listOfGenresFromAPI: genre.listOfGenresFromAPI,
    });
  };

  function randomize() {
    setAcousticSlider(Math.floor(Math.random() * 100));
    setDanceabilitySlider(Math.floor(Math.random() * 100));
    setEnergySlider(Math.floor(Math.random() * 100));
    setInstrumentalSlider(Math.floor(Math.random() * 100));
    setLivenessSlider(Math.floor(Math.random() * 100));
    setLoudnessSlider(Math.floor(Math.random() * 100));
    setPopularitySlider(Math.floor(Math.random() * 5000));
    setTempoSlider(Math.floor(Math.random() * 20000));
    setValenceSlider(Math.floor(Math.random() * 100));
    let k = new Array();
    let j = [...genre.listOfGenresFromAPI]
    let i = 0;
    while (i < 3) {
      var index = Math.floor(Math.random() * j.length - 1);
      k.push(j[index]);
      j.splice(index, 1);
      i++;
    }
    setGenre({
      selectedGenre: k,
      listOfGenresFromAPI: genre.listOfGenresFromAPI
    })
  }


  const [acousticSlider, setAcousticSlider] = useState(50);
  const [danceabilitySlider, setDanceabilitySlider] = useState(50);
  const [energySlider, setEnergySlider] = useState(50);
  const [instrumentalSlider, setInstrumentalSlider] = useState(50);
  const [livenessSlider, setLivenessSlider] = useState(50);
  const [loudnessSlider, setLoudnessSlider] = useState(50);
  const [popularitySlider, setPopularitySlider] = useState(5000);
  const [tempoSlider, setTempoSlider] = useState(10000);
  const [valenceSlider, setValenceSlider] = useState(50);

  const sliders = [
    {
      sn: "acousticSlider",
      name: acousticSlider,
      f: setAcousticSlider,
      min: 0,
      max: 1,
    },
    {
      sn: "danceabilitySlider",
      name: danceabilitySlider,
      f: setDanceabilitySlider,
      min: 0,
      max: 1,
    },
    {
      sn: "energySlider",
      name: energySlider,
      f: setEnergySlider,
      min: 0,
      max: 1,
    },
    {
      sn: "instrumentalSlider",
      name: instrumentalSlider,
      f: setInstrumentalSlider,
      min: 0,
      max: 1,
    },
    {
      sn: "livenessSlider",
      name: livenessSlider,
      f: setLivenessSlider,
      min: 0,
      max: 1,
    },
    {
      sn: "loudnessSlider",
      name: loudnessSlider,
      f: setLoudnessSlider,
      min: 0,
      max: 1,
    },
    {
      sn: "tempoSlider",
      name: tempoSlider,
      f: setTempoSlider,
      min: 60,
      max: 200,
    },
    {
      sn: "valenceSlider",
      name: valenceSlider,
      f: setValenceSlider,
      min: 0,
      max: 1,
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        p: 20,
        pr: 0,
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: 'center',
        flexDirection: typeof window !== 'undefined' && window.innerWidth < 700 ? 'column' : 'row'
      }}
    >
     <Box>
      <Box backgroundColor="yellow" sx={{
        fontWeight: 800,
        textAlign: 'center',
        margin: '0 auto',
        py: 2,
      }} color="black" mb={10}>
      spotify.random
      </Box>
      <Box onClick={() => window.location.assign('https://medium.com/creative-labs/spring-2020-projects-3401d04e238c')} backgroundColor="lightblue" color="black" px={1}>
      creative labs ucla
      </Box>
      <Box onClick={() => window.location.assign('https://rasha.world')} backgroundColor="limegreen" color="black" mt={10} px={1}>
     made by rasha
      </Box>
     </Box>
      <Box
        as="form"
        sx={{
          width: "30%",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          margin: "auto 0",
        }}
        onSubmit={(e) => {
          submit(e);
        }}
      >
        <Dropdown
          options={genre.listOfGenresFromAPI}
          genre={genre}
          changed={genreChanged}
          removed={genreRemoved}
        />
        {sliders &&
          sliders.map((x, i) => (
            <Box key={i}>
              <Box as="label">{x.sn.substr(0, x.sn.length - 6).toUpperCase()}</Box>
              <Box as="pre">
                {x.name === tempoSlider ? x.name / 100 + " BPM" : x.name / 100}
              </Box>
              <Slider
                min={x.min}
                max={x.max * 100}
                value={x.name}
                change={x.f}
              />
            </Box>
          ))}
       <Box sx={{
         display: 'flex',
         flexDirection: 'row'
       }}>
       <Box p={'2px'} sx={{
         borderRadius: 5,
         background: 'linear-gradient(180deg,darkgray,gray)',
         m: 4,
         cursor: "pointer"
       }} onClick={() => randomize()}>
          Randomize
        </Box>
      
        <Box p={'2px'} onClick={(e) => submit(e)} sx={{
         borderRadius: 5,
         background: 'linear-gradient(180deg,darkgray,gray)',
         m: 4,
         cursor: 'pointer'
         
       }} type="submit">
          Submit
        </Box>
       </Box>
      </Box>
      <Box
        width="70%"
        backgroundColor="#3d3fe340"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "left",
          p: 10,
          color: "white",
          fontWeight: 800,
          borderRadius: 13,
          fontSize: tracks.track_art.length < 1 ? "2rem" : "0.9rem",
        }}
      >
        {tracks.track_art.length < 3 &&
          "Hello! Welcome to Spotify Random. Fill out the stuff on the left and press submit."}
        <Box width={300}>
          <Box className={styles.images}  onClick={() => window.location.assign(tracks.track_preview.one)}  width={300} mb={10}>
            {
              <Darkness>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    padding: 20,
                    flexDirection: "column",
                    cursor: 'pointer'
                  }}
                >
                  <Box
                    as="h2"
                    sx={{
                      borderBottom: "1px solid white",
                    }}
                  >
                    {tracks.track_names.one}
                  </Box>
                  <Box as="h4">by: {tracks.track_artists.one}</Box>
                </Box>
              </Darkness>
            }
            <Box as="img" sx={{borderRadius: 10}}  width={1} src={tracks.track_art.one} />
          </Box>

          <Box className={styles.images2}  onClick={() => window.location.assign(tracks.track_preview.two)}  width={300} sx={{transform: 'translateX(-3vw) translateY(3vw)'}}>
          {
              <Darkness>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    padding: 20,
                    flexDirection: "column",
                    cursor: 'pointer'
                  }}
                >
                  <Box
                    as="h2"
                    sx={{
                      borderBottom: "1px solid white",
                    }}
                  >
                    {tracks.track_names.two}
                  </Box>
                  <Box as="h4">by: {tracks.track_artists.two}</Box>
                </Box>
              </Darkness>
            }
            <Box as="img" sx={{borderRadius: 10}}  width={1} src={tracks.track_art.two} />
          </Box>
        </Box>

        <Box width={300} >
          <Box className={styles.images3} onClick={() => window.location.assign(tracks.track_preview.three)} width={300} mb={10} sx={{transform: 'translateX(-3vw) translateY(3vw)'}}>
          {
              <Darkness>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    padding: 20,
                    flexDirection: "column",
                    cursor: 'pointer'
                  }}
                >
                  <Box
                    as="h2"
                    sx={{
                      borderBottom: "1px solid white",
                    }}
                  >
                    {tracks.track_names.three}
                  </Box>
                  <Box as="h4">by: {tracks.track_artists.three}</Box>
                </Box>
              </Darkness>
            }
            <Box as="img" sx={{borderRadius: 10}}  width={1} src={tracks.track_art.three} />
          </Box>

          <Box className={styles.images4} onClick={() => window.location.assign(tracks.track_preview.four)}  width={300}>
          {
              <Darkness>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    padding: 20,
                    flexDirection: "column",
                    cursor: 'pointer',
                    
                  }}
                >
                  <Box
                    as="h2"
                    sx={{
                      borderBottom: "1px solid white",
                    }}
                  >
                    {tracks.track_names.four}
                  </Box>
                  <Box as="h4">by: {tracks.track_artists.four}</Box>
                </Box>
              </Darkness>
            }
            <Box as="img" sx={{borderRadius: 10}} width={1} src={tracks.track_art.four} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
