import { Box } from "rebass"

export const Darkness = ({children}) => {
    return (
        <Box sx={{position: 'absolute', backgroundColor: "black", opacity: 0, width: '300px', height: '300px', zIndex: 3,   borderRadius: 10, cursor:'pointer', ":hover": {
            opacity: 0.8
          }}} > 
          
          {children} 
            <Box p={20}>
            Click to view on Spotify
                </Box></Box>
    )
}

export default Darkness;