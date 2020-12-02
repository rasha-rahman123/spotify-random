import { Box } from "rebass"

export const Darkness = ({children}) => {
    return (
        <Box sx={{position: 'absolute', opacity: 0, width: '50vw', height: '50vw', zIndex: 3,   borderRadius: 10, cursor:'pointer',background: 'linear-gradient(23deg, purple,limegreen)', backgroundSize: '600% 600%', transition: 'background-position 1s ease 500ms', ":hover": {
            opacity: 0.8,
            backgroundPosition: '0% 100%'
          }}} > 
          
          {children} 
            <Box p={20}>
            Click to view on Spotify
                </Box></Box>
    )
}

export default Darkness;