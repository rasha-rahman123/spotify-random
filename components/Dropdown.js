import { useState } from "react";
import { Box } from "rebass";

export const Dropdown = (props) => {


    const dropDownChange = e => {
        props.genre.selectedGenre.length < 3 && props.changed(e);
       !props.genre.selectedGenre.length < 3 && props.genre.selectedGenre.includes(props.genre.listOfGenresFromAPI[e])  && props.removed(e)
    }



  return (
    <Box sx={{
        textAlign: 'center',
        marginBottom: 10
    }}>
       { <Box>
           Choose Genres Here:
        </Box>}
     {<Box sx={{
         display: 'grid',
         width: '80vw',
         gridTemplateColumns: '20% 20% 20% 20% 20%',
         columnGap:10,
         rowGap: 15
     }}>
        {props.options.map((x, i) => (
          <Box onClick={() => dropDownChange(i)} key={i} sx={{
              background: 'darkpurple',
              color: props.genre.selectedGenre.length < 3 ? props.genre.selectedGenre.includes(x) ? 'aqua' : 'limegreen' : props.genre.selectedGenre.includes(x) ? 'aqua' : 'gray',
              fontWeight: 600,
              opacity: props.genre.selectedGenre.includes(x) && props.genre.selectedGenre.length > 2 ? 1 : props.genre.selectedGenre.length > 2 ? 0.3 : 1,
              border: props.genre.selectedGenre.includes(x) ? '3px solid aqua' : '3px solid green',
              borderRadius: 4,
              ":hover": {
                  border: props.genre.selectedGenre.length < 3 ? props.genre.selectedGenre.includes(x) ? '3px solid salmon' : '3px solid limegreen' : props.genre.selectedGenre.includes(x) ? '3px solid salmon' : '3px solid green',
                  cursor: props.genre.selectedGenre.length < 3 ? 'pointer' : props.genre.selectedGenre.includes(x) ? 'pointer' : 'default',
                  color: props.genre.selectedGenre.includes(x) && 'salmon'
              }
          }}>{x}</Box>
        ))}
      </Box>}
          
    </Box>
  );
};

export default Dropdown;
