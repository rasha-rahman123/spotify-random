import { useState } from "react";
import { Box } from "rebass";

export const Slider = (props) => {


 



  return (
    <Box>
      <input type="range"  min={props.min} max={props.max} value={props.value} onChange={(e) => props.change(e.target.value)} />
    </Box>
  );
};

export default Slider;
