import Head from "next/head";
import { Box } from "rebass";
import Dropdown from "../components/Dropdown";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "../components/Slider";
import Darkness from "../components/Darkness";



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

  const [isPlaying, setIsPlaying] = useState({
    bool: Boolean,
    tn: String
  })

  const playTrack = async (i) => {

    if ( isPlaying.tn === tracks.track_names[i] && isPlaying.bool) {
      stopAll();
      console.log('is playing same song pause')
      return;
    }

   await stopAll();

  


   document.getElementById(tracks.track_names[i]).play();
   setIsPlaying({
     bool: true,
     tn: isPlaying.tn
   })
    
  } 
  
  const stopAll = () => {
    [0,1,2,3].forEach((x) => document.getElementById(tracks.track_names[x]).pause());
    setIsPlaying({
      bool: false,
      tn: isPlaying.tn
    })
  }
  const [page, setPage] = useState(0)

  function prevPage() {
    if (page > 0) {
      setPage((p) => p - 1);
    }
  }

  function nextPage() {
    if (page < 5) {
      setPage((p) => p + 1);
    }
  }

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
    track_p_url: []
  });
  //
  const submit = (e) => {
    e.preventDefault();
    if (genre.selectedGenre.length < 1) {
      return alert("You must at least add one genre!");
    }
    axios(
      `https://api.spotify.com/v1/recommendations?limit=4&market=US&seed_genres=${genre.selectedGenre.join(
        "%2C"
      )}
      &target_acousticness=${acousticSlider / 100}
      &target_danceability=${danceabilitySlider / 100}
      &target_energy=${energySlider / 100}
      &target_instrumentalness=${instrumentalSlider / 100}
      &target_liveness=${livenessSlider / 100}
      &target_loudness=${loudnessSlider / 100}
      &target_tempo=${tempoSlider / 100}
      &target_valence=${valenceSlider / 100}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    ).then((submissionRes) => {
      console.log(submissionRes)
      setTracks({
        track_names: [
          submissionRes.data.tracks[0].name,
          submissionRes.data.tracks[1].name,
          submissionRes.data.tracks[2].name,
          submissionRes.data.tracks[3].name,
        ],
        track_artists: [
         submissionRes.data.tracks[0].artists[0].name,
         submissionRes.data.tracks[1].artists[0].name,
         submissionRes.data.tracks[2].artists[0].name,
          submissionRes.data.tracks[3].artists[0].name,
        ],
        track_art: [
         submissionRes.data.tracks[0].album.images[0].url,
         submissionRes.data.tracks[1].album.images[0].url,
          submissionRes.data.tracks[2].album.images[0].url,
         submissionRes.data.tracks[3].album.images[0].url,
        ],
        track_preview: [
         submissionRes.data.tracks[0].external_urls.spotify,
         submissionRes.data.tracks[1].external_urls.spotify,
         submissionRes.data.tracks[2].external_urls.spotify,
        submissionRes.data.tracks[3].external_urls.spotify,
        ],
        track_p_url: [
          submissionRes.data.tracks[0].preview_url,
          submissionRes.data.tracks[1].preview_url,
          submissionRes.data.tracks[2].preview_url,
          submissionRes.data.tracks[3].preview_url,
        ]
      });
    })
    .catch((err) => {
      console.log(err)
    });
  };

  useEffect(() => {
    document.onresize = resizeCheck;
  });

  const [mobile, setMobile] = useState();

  const resizeCheck = (e) => {
    e = e || window.event;
  };

 

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
    j.push(genre.listOfGenresFromAPI[val]);
    setGenre({
      selectedGenre: j,
      listOfGenresFromAPI: genre.listOfGenresFromAPI,
    });
  };

  const genreRemoved = (val) => {
    let j = [...genre.selectedGenre];
    let k = j.indexOf(genre.listOfGenresFromAPI[val]);
    j.splice(k, 1);
    setGenre({
      selectedGenre: j,
      listOfGenresFromAPI: genre.listOfGenresFromAPI,
    });
  };

  async function randomize() {
    function action() {
      setAcousticSlider(Math.floor(Math.random() * 100));
    setDanceabilitySlider(Math.floor(Math.random() * 100));
    setEnergySlider(Math.floor(Math.random() * 100));
    setInstrumentalSlider(Math.floor(Math.random() * 100));
    setLivenessSlider(Math.floor(Math.random() * 100));
    setLoudnessSlider(Math.floor(Math.random() * 60) - 60);
    setPopularitySlider(Math.floor(Math.random() * 5000));
    setTempoSlider(Math.floor(Math.random() * 20000));
    setValenceSlider(Math.floor(Math.random() * 100));
  
   
    
    }

    for(let a = 0; a < 10; a++) {
      setTimeout(await action, 100);
    }
    let i = 0;
    let k = new Array();
      let j = [...genre.listOfGenresFromAPI];
    while (i < 3) {
      
      var index = Math.floor(Math.random() * j.length - 1);
      k.push(j[index]);
      j.splice(index, 1);
      i++;
    }
    setGenre({
      selectedGenre: k,
      listOfGenresFromAPI: genre.listOfGenresFromAPI,
    });
  }

  const [acousticSlider, setAcousticSlider] = useState(50);
  const [danceabilitySlider, setDanceabilitySlider] = useState(50);
  const [energySlider, setEnergySlider] = useState(50);
  const [instrumentalSlider, setInstrumentalSlider] = useState(35);
  const [livenessSlider, setLivenessSlider] = useState(0);
  const [loudnessSlider, setLoudnessSlider] = useState(0);
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
      min: -60,
      max: 0,
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
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        flexDirection: mobile ? "column" : "column",
      }}
    >
      <Box
        display={['flex','flex',"grid"]}
        sx={{
          gridTemplateColumns: ['100%','100%',"33% 33% 33%"],
          flexDirection: 'column'
        }}
      >
        <Box
          backgroundColor="limegreen"
          sx={{
            fontWeight: 800,
            textAlign: "center",
            margin: "0 auto",
            py: 2,
            hover: {
              borderBottom: '2px solid limegreen'
            }
          }}
          color="black"
          mb={10}
        >
          spotify.random
        </Box>
        <Box
          onClick={() => window.location.assign("https://rasha.world")}
  
          color="limegreen"
          mt={10}
          px={1}
          sx={{
            cursor: 'pointer',
          }}
        >
          made by rasha
        </Box>
        <Box
          onClick={() =>
            window.location.assign(
              "https://medium.com/creative-labs/spring-2020-projects-3401d04e238c"
            )
          }

          color="yellow"
          px={1}
          sx={{
            cursor: 'pointer',
            hover: {
              borderBottom: '2px solid limegreen'
            }
            
          }}
        >
          creative labs ucla
        </Box>
    
      </Box>
      <Box
        as="form"
        sx={{
         
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
          setGenre={setGenre}
          changed={genreChanged}
          removed={genreRemoved}
          page={page}
          setPage={setPage}
          nextPage={nextPage}
          prevPage={prevPage}
        />
         <Box sx={{fontSize: '3rem', color: 'limegreen', fontWeight: 800, mb: 15, width: '100%', textAlign: 'center'}}>
          Attribute Selection
        </Box>
        <Box
          sx={{
            display: "grid",
            width: "80vw",
            gridTemplateColumns: ["50% 50%","50% 50%","25% 25% 25% 25%"],
            columnGap: 10,
            rowGap: 15,
          }}
        >
          
          {sliders &&
            sliders.map((x, i) => (
                <Slider
                key={i}
                  min={x.min}
                  max={x.max * 100}
                  value={x.name}
                  change={x.f}
                  x={x}
                  i={i}
                  tempoSlider={tempoSlider}
                />
            ))}
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Box
            p={"8px"}
            sx={{
              borderRadius: 5,
              background: "linear-gradient(180deg,limegreen,lime)",
              color: "black",
              m: 4,
              fontWeight: 600,
              cursor: "pointer",
              ":hover": {
                  background: '#c1ffb1'
              }
            }}
            onClick={() => randomize()}
          >
            Randomize
          </Box>

          <Box
            p={"8px"}
            onClick={(e) => submit(e)}
            sx={{
              borderRadius: 5,
              background: "linear-gradient(180deg,limegreen,lime)",
              color: "black",
              m: 4,
              fontWeight: 600,
              cursor: "pointer",
              ":hover": {
                background: '#c1ffb1'
              }
            }}
            type="submit"
          >
            Submit
          </Box>
        </Box>
      </Box>
      {
        <Box
          backgroundColor="limegreen"
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
            flexDirection: mobile ? "column" : "row",
          }}
        >
          {tracks.track_art.length < 3 &&
            "Hello! Welcome to Spotify Random. Pick three genres of your choice and then set each attribute. You can learn more about what each attribute means if you highlight over it. Hit randomize and submit to try it out first!"}
          <Box width="80vw" display={tracks.track_art.length < 3 ? 'none' : 'initial'}>
            <Box display={["grid"]} sx={{
              gridTemplateColumns: ['100%','100%','25% 25% 25% 25%'],
              alignContent: 'center',
              justifyContent: 'center'
            }}>
                {tracks.track_art.length > 1 && Array.apply(null, Array(4)).map((x,i) =>  <Box
                key={i}
                className={styles.images}
                onClick={() => playTrack(i)}
                  // window.location.assign(tracks.preview[i])}
                width={["50vw","50vw","15vw"]}
                sx={{margin: '0 auto', animationDelay: i + 's'}}
                mb={10}
              >
                {
                  <Darkness i={i} tracks={tracks}>
                    
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        padding: 20,
                        flexDirection: "column",
                        cursor: "pointer",
                      }}
                    >
                      <audio id={tracks.track_names[i]} src={tracks.track_p_url[i]} />
                      <Box
                        as="h2"
                        sx={{
                          borderBottom: "1px solid white",
                        }}
                      >
                        {tracks.track_names[i]}
                      </Box>
                      <Box as="h4">by: {tracks.track_artists[i]}</Box>
                      {!tracks.track_p_url[i] && <Box as="h6">No Preview</Box> }
                    </Box>
                  </Darkness>
                }
                <Box
                  as="img"
                  sx={{ borderRadius: 10 }}
                  width={1}
                  src={tracks.track_art[i]}
                />
              </Box>)}
             
                </Box>
          </Box>
        </Box>
      }
    </Box>
  );
}
