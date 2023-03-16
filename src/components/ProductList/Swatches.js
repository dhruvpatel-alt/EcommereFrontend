import React from 'react'
import {Grid,Button} from '@mui/material'
import {useMediaQuery} from '@mui/material';

function Swatches({colors,selectedColor,setSelectedColor,scroll}) {
  const matchesSm=useMediaQuery(theme=>theme.breakpoints.down('sm'))
  //  console.log(colors,selectedColor)
  return (
    <Grid item container>
        {colors.sort().map(color=>(
            <Grid item key={color}>
                <Button style={{backgroundColor:color,border:selectedColor===color?'4px solid #0f5191':'3px solid #fff',minWidth:0,borderRadius:50,height:'2rem',width:'2rem',marginTop:'0.25rem'}}
                onClick={()=>{setSelectedColor(color)
                if(matchesSm){
                  scroll()
                }}}/>
                </Grid>
        ))

        }
    </Grid>
  )
}

export default Swatches