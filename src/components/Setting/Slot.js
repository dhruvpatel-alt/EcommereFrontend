import React from 'react'
import {Grid,Typography,Button} from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery';

function Slot({slot,setSlot,checkout,noLabel}) {
  const matchesSm=useMediaQuery(theme=>theme.breakpoints.down('sm'))

  return (
    <Grid item container xs >
    <Grid item>
    {[1,2,3].map((number,i)=>(
      <Button key={number} onClick={()=>setSlot(number-1)}
      style={{backgroundColor:slot===number-1?'#0f5191':"#FFF",borderRadius:25,minWidth:0,width:matchesSm?'2rem':'2.5rem',height:matchesSm?'2rem':'2.5rem'
        ,border :'0.15rem solid #0f5191',marginLeft:i!==0?'-0.5rem':undefined}}>
            <Typography variant='h5' style={{color:slot===number-1?'#fff':'#1e90ff',marginLeft:i!==0?'-0.25rem':undefined,fontSize:matchesSm?'1rem':undefined}}>
                {number}
                </Typography>
                </Button>
    ))}
</Grid>
{checkout&&(
  <Grid item>
    <Typography variant='body1' style={{color:'#fff',fontWeight:600,margin:'1rem 0.2rem',fontSize:matchesSm?'1rem':null}}>
      Shipping
    </Typography>
    </Grid>
)}
    </Grid>
  )
}

export default Slot