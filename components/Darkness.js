import { Box } from "rebass";
import { FaSpotify } from "react-icons/fa";

export const Darkness = ({ children,i, tracks }) => {
  return (
    <Box
        
      sx={{
        position: "absolute",
        opacity: 0,
        width: ["50vw", "50vw", "15vw"],
        height: ["50vw", "50vw", "15vw"],
        zIndex: 3,
        borderRadius: 10,
        cursor: "pointer",
        background: "linear-gradient(23deg, purple,limegreen)",
        fontSize: "0.8rem",
        lineHeight: 0.8,
        backgroundSize: "600% 600%",
        transition: "background-position 1s ease 500ms",
        ":hover": {
          opacity: 0.8,
          backgroundPosition: "0% 100%",
        },
      }}
    >
      <Box
        onClick={() => window.location.assign(tracks.track_preview[i])}
        sx={{
          fontSize: "3rem",
          position: "absolute",
          left: 20,
          bottom: 20,
          zIndex: 4,
          color: "green",
          ":hover": {
              color: 'lime'
          }
          
        }}
      >
        <FaSpotify />
      </Box>
      {children}
      <Box px={20} mb={1}>Click to Play</Box>
      <Box px={20}>Spotify Icon Takes You to Spotify Track Page</Box>
    </Box>
  );
};

export default Darkness;
