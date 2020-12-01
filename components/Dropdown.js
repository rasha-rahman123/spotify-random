import { useState } from "react";
import { Box } from "rebass";

export const Dropdown = (props) => {


    const dropDownChange = e => {
        props.changed(e.target.value)
    }



  return (
    <Box sx={{
        textAlign: 'center',
        marginBottom: 10
    }}>
       { props.genre.selectedGenre.length < 3 &&<Box>
           Choose Genres Here:
        </Box>}
     {props.genre.selectedGenre.length < 3 && <Box as="select"  onChange={(e) => dropDownChange(e)}>
        {props.options.map((x, i) => (
          <Box key={i} value={x.id} as="option">{x}</Box>
        ))}
      </Box>}
            <Box>
            Selected Genres (click to remove):
            </Box>
     <Box sx={{color: 'gray'}} as="ol">
     {props.genre.selectedGenre.map((x,i) => <Box onClick={() => props.removed(i)} as="li" key={i} >{x}</Box>)}
     </Box>
    </Box>
  );
};

export default Dropdown;
