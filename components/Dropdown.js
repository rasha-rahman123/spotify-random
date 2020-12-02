import { useState } from "react";
import { Box } from "rebass";

export const Dropdown = (props) => {


    const dropDownChange = (e) => {
        props.genre.selectedGenre.length < 3 && props.changed(e);
       !props.genre.selectedGenre.length < 3 && props.genre.selectedGenre.includes(props.genre.listOfGenresFromAPI[e])  && props.removed(e)
    }



  return (
    <Box sx={{
        textAlign: 'center',
        my: 30, 
    }}>
    <Box sx={{textAlign: "left", fontSize: '3rem', color: 'limegreen', fontWeight: 800, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Box>
            Genre Selection
          </Box> <Box sx={{
            fontWeight: 400,
            fontSize: '1rem'
          }}>
           {props.genre.selectedGenre.length > 0 && <div onClick={() => props.setGenre({
             selectedGenre: [],
             listOfGenresFromAPI: props.genre.listOfGenresFromAPI
           })}> Clear Genres</div>}
          </Box>
        </Box>
     {<Box sx={{
         display: 'grid',
         width: '80vw',
         gridTemplateColumns: ['33% 33% 33%','25% 25% 25% 25%','20% 20% 20% 20% 20%'],
         columnGap:10,
         rowGap: 15
     }}>
        {props.options.map((x, i) => (
          <Box onClick={() => dropDownChange(i)} key={i} sx={{
              background: 'darkpurple',
              color: props.genre.selectedGenre.length < 3 ? props.genre.selectedGenre.includes(x) ? 'pink' : 'limegreen' : props.genre.selectedGenre.includes(x) ? 'pink' : 'gray',
              fontWeight: 600,
              opacity: props.genre.selectedGenre.includes(x) && props.genre.selectedGenre.length > 2 ? 1 : props.genre.selectedGenre.length > 2 ? 0.3 : 1,
              border: props.genre.selectedGenre.includes(x) ? '3px solid pink' : '3px solid green',
              transition: 'all 300ms ease-in-out',
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
