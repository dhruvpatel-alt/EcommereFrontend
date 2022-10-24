import React from 'react'
import {Link} from 'gatsby'
import {Grid,Button,Typography} from '@mui/material'
import animationData from './11323-sad-search.json'
import Lottie from "lottie-react";

import {useMediaQuery} from '@mui/material'
function ProductNotFound() {
    const matchesMd=useMediaQuery(theme=>theme.breakpoints.down('md'))
    const matchesXS=useMediaQuery(theme=>theme.breakpoints.down('sm'))
  return (
    <Grid container style={{justifyContent:"space-around",alignItems:"center"}}   >
   <Grid item style={{padding:'2rem'}}>
            <Grid container direction="column">
<Grid item>
    <Typography align="center" variant='h1' style={{color:'#9899b8',fontSize:matchesMd?'1.2rem':'2rem'}}>
        SORRY!
        <br/>
        We couldn't find your filtered Products
    </Typography>
</Grid>
<Grid item style={{marginTop:'1rem'}}>
    <Typography  align="center" variant='h3' style={{fontSize:matchesMd?'1rem':'1.5rem'}}>
        Try
        <Button component={Link} to='/search' > searching </Button> or go to 
        <Button component={Link} to='/' style={{textTransform:'none'}}>
            VARX's Home Page
            </Button>
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

export default ProductNotFound