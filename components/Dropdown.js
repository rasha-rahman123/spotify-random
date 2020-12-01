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
        <Box>
           Choose Genres Here:
        </Box>
      <Box as="select" value={props.genre.selectedGenre} onChange={(e) => dropDownChange(e)}>
        {props.options.map((x, i) => (
          <Box key={i} value={x.id} as="option">{x}</Box>
        ))}
      </Box>
            <Box>
            Selected Genres (click 2 remove):
            </Box>
     <Box sx={{color: 'gray'}} as="ol">
     {props.genre.selectedGenre.map((x,i) => <Box onClick={() => props.removed(i)} as="li" key={i} >{x}</Box>)}
     </Box>
    </Box>
  );
};

export default Dropdown;
