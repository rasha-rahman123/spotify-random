import { Box } from "rebass"

export const Darkness = ({children}) => {
    return (
        <Box sx={{position: 'absolute', backgroundColor: "black", opacity: 0, width: '300px', height: '300px', zIndex: 3, ":hover": {
            opacity: 0.8
          }}} > {children} </Box>
    )
}

export default Darkness;