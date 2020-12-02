import { useState } from "react";
import { Box } from "rebass";
import styles from '../styles/Home.module.css'

export const Slider = (props) => {


  const [hover, setHover] = useState({
    mouseX: null,
    mouseY: null,
    hover: null,
  });

  function setText(e) {
    switch(e) {
      case 'DANCEABILITY':
        return 'Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity.'
        case 'LIVENESS':
          return 'Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live.'
        case 'ENERGY':
          return 'Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale.'
        case 'VALENCE':
          return 'Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).'
        case 'LOUDNESS':
          return 'The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks.'
        case 'INSTRUMENTAL':
          return 'Predicts whether a track contains no vocals. “Ooh” and “aah” sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly “vocal”. Higher the number, the less focus'
        case 'ACOUSTIC':
          return 'Tracks with high acoustic sound more acoustic (e.g. stripped of electric sounds), while tracks with low acoustic sound more elecronic and digital.'
        case 'TEMPO':
          return 'The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration.'
    }

  }


  return (
    <Box key={props.i} onMouseEnter={(e) => setHover({
      mouseX: e.screenX,
      mouseY: e.screenY,
      hover: true
    })} onMouseLeave={(e) => setHover({
      mouseX: null,
      mouseY: null,
      hover: false
    })}>
      {hover.hover && <Box sx={{
   position: 'fixed',
   width: '100%',
   top: 0,
   left: 0,
   background: 'limegreen',
   color: 'black',
   fontWeight: 600
 }}>
   {setText(props.x.sn.substr(0, props.x.sn.length - 6).toUpperCase())}
 </Box>}
      <Box color="limegreen" as="label">
                  {props.x.sn.substr(0, props.x.sn.length - 6).toUpperCase()}
                </Box>
                <Box color="#FFFFFF40" as="pre">
                  {props.x.name === props.tempoSlider
                    ? props.x.name / 100 + " BPM"
                    : props.x.sn === 'loudnessSlider' ? props.x.name + 'db': props.x.name + "%"}
                </Box>
      <Box as="input" sx={{
      appearance: 'unset',
      backgroundColor: 'transparent',
      margin:' 10px 0',
      color: 'limegreen',
  width: '100%'
    }} className={styles.inputr} type="range"  min={props.min} max={props.max} value={props.value} onChange={(e) => props.change(e.target.value)} />
    </Box>
  );
};

export default Slider;
