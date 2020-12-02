import { Box } from "rebass"

export const Darkness = ({children}) => {
    return (
        <Box sx={{position: 'absolute', opacity: 0, width: ['50vw','50vw','15vw'], height: ['50vw','50vw','15vw'], zIndex: 3,   borderRadius: 10, cursor:'pointer',background: 'linear-gradient(23deg, purple,limegreen)', 
        fontSize: '0.8rem', lineHeight: .8,backgroundSize: '600% 600%', transition: 'background-position 1s ease 500ms', ":hover": {
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