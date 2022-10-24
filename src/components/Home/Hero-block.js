import React from 'react'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Lottie from "lottie-react";
import useMediaQuery from '@mui/material/useMediaQuery';

import animationData from './101132-ecommerce-blue.json';
function Heroblock() {
const matchesMd=useMediaQuery(theme=>theme.breakpoints.down('md'))
const matchesXS=useMediaQuery(theme=>theme.breakpoints.down('sm'))
    // const defaultOptions = {
    //     loop: true,
    //     autoplay: true, 
    //     animationData: animationData,
    //     rendererSettings: {
    //       preserveAspectRatio: 'xMidYMid slice'
    //     }
    //   };
  return (
    <Grid container style={{justifyContent:"space-around",alignItems:"center"}}   >
   <Grid item style={{padding:'2rem'}}>
            <Grid container direction="column">
<Grid item>
    <Typography align="center" variant='h1'>
        The Premier is
        <br/>
        Developer Clothing Line
    </Typography>
</Grid>
<Grid item>
    <Typography  align="center" variant='h3'>
        high quality,custom-designed shirts ,hats and hoodies
    </Typography>
</Grid>
            </Grid>
        </Grid>
        <Grid item>
        <Lottie animationData={animationData}  loop={true} style={{ width:matchesXS?'22rem':matchesMd?'30rem':'35rem'}} />;
        </Grid>
</Grid>
  )
}

export default Heroblock