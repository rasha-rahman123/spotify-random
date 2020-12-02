import { useState } from "react";
import { Box } from "rebass";

export const Dropdown = (props) => {


    const dropDownChange = (e) => {
        props.genre.selectedGenre.length < 3 && props.changed(e);
       !props.genre.selectedGenre.length < 3 && props.genre.selectedGenre.includes(props.genre.listOfGenresFromAPI[e])  && props.removed(e)
    }



  return (
    <Box sx={{
      width: '80vw',
        my: 30, 
        mx: 'auto',
    }}>
    <Box sx={{fontSize: ['1.5rem','2rem','3rem'], color: 'limegreen', fontWeight: 800, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Box sx={{
            textAlign: 'left'
          }}>
            Genre Selection
          </Box> <Box sx={{
            fontWeight: 400,
            width: ['200px','200px','500px'],
            fontSize: '0.8rem',
            textAlign: 'right',
            cursor: "pointer"
          }}>
           {props.genre.selectedGenre.length > 0 && <div onClick={() => props.setGenre({
             selectedGenre: [],
             listOfGenresFromAPI: props.genre.listOfGenresFromAPI
           })}> Clear Genres <br /></div>}
            <div sx={{
             color: '#FFFFFF60',
             cursor: "none"
           }}>{'( ' + props.genre.selectedGenre.map(x => x + " ") + ')'}</div>
          </Box>
        </Box>
     {<Box sx={{
         display: 'grid',

         gridTemplateColumns: ['33% 33% 33%','25% 25% 25% 25%','20% 20% 20% 20% 20%'],
         columnGap:10,
         rowGap: 15,
         margin: '0 auto'
     }}>
        {props.options.filter((q,i) => props.page === 5 ?  i < 20 * (props.page + 1) + 6 && i > 20 * (props.page) : i < 20 * (props.page + 1) && i > (20 * (props.page)) - 1 ).map((x, i) => (
          <Box onClick={() => props.page === 5 ? dropDownChange(i + (20*props.page) + 1) : dropDownChange(i + (20*props.page))} key={i} sx={{
              background: 'darkpurple',
              color: props.genre.selectedGenre.length < 3 ? props.genre.selectedGenre.includes(x) ? 'pink' : 'limegreen' : props.genre.selectedGenre.includes(x) ? 'pink' : 'gray',
              fontWeight: 600,
              fontSize: ['0.8rem','0.8rem','1rem'],
              opacity: props.genre.selectedGenre.includes(x) && props.genre.selectedGenre.length > 2 ? 1 : props.genre.selectedGenre.length > 2 ? 0.3 : 1,
              border: props.genre.selectedGenre.includes(x) ? '3px solid pink' : '3px solid green',
              transition: 'all 300ms ease-in-out',
              userSelect: "none", msUserSelect: "none", MozUserSelect: "none", WebkitUserSelect: 'none',
              borderRadius: 4,
              ":hover": {
                  border: props.genre.selectedGenre.length < 3 ? props.genre.selectedGenre.includes(x) ? '3px solid salmon' : '3px solid limegreen' : props.genre.selectedGenre.includes(x) ? '3px solid salmon' : '3px solid green',
                  cursor: props.genre.selectedGenre.length < 3 ? 'pointer' : props.genre.selectedGenre.includes(x) ? 'pointer' : 'default',
                  color: props.genre.selectedGenre.includes(x) && 'salmon'
              }
          }}>{x}</Box>
        ))}
      </Box>}
          <Box sx={{
            flexDirection: 'row',
            display:'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mt: 20,
            margin: '20px auto',
            width: '80vw'
          }}>
         <Box opacity={props.page === 0 ? 0 : 1} sx={{cursor:'pointer', userSelect: "none", msUserSelect: "none", MozUserSelect: "none", WebkitUserSelect: 'none'}} onClick={() => props.prevPage()}>
            {'<'}
          </Box> {[1, 2,3,4,5,6].map((x,i) => <Box key={i} onClick={() => props.setPage(i)} width={16} height={16} mx={3} p={'15px'} sx={{
            borderRadius: 8,
            cursor: 'pointer',
            backgroundColor: props.page === i ? 'lime' : 'green'
          }}></Box>)}   <Box sx={{cursor:'pointer', userSelect: "none", msUserSelect: "none", MozUserSelect: "none", WebkitUserSelect: 'none'}}  opacity={props.page === 5 ? 0 : 1} onClick={() => props.nextPage()}>
            {'>'}
          </Box>
          </Box>
    </Box>
  );
};

export default Dropdown;
