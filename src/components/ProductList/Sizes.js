import React from 'react'
import {Grid,Button,Typography} from '@mui/material'
import {useMediaQuery} from '@mui/material';

function Sizes({sizes,selectedSize,setSelectedSize,scroll}) {
  const matchesSm=useMediaQuery(theme=>theme.breakpoints.down('sm'))

const possibleSizes=["S","M","L"]
const possibleHoodiesSizes=["M","L"]
const possibleHoodies=["S","M"]
var actualSizes=[]
    if(possibleSizes.every(size=>sizes.includes(size))){
        actualSizes=possibleSizes
    }else if(possibleHoodiesSizes.every(size=>sizes.includes(size))){
        actualSizes=possibleHoodiesSizes
    }else if(possibleHoodies.every(size=>sizes.includes(size))){
        actualSizes=possibleHoodies
    }
  return (
    <Grid item container >
        {actualSizes.map(size=>(
            <Grid item key={size} >
                <Button style={{border:'3px solid #fff',borderRadius:50,height:'2rem',minWidth:0,backgroundColor:selectedSize===size?'#0f5191':null}}
                onClick={()=>{setSelectedSize(size)
                    if(matchesSm){
                        scroll()
                      }}}>
                    <Typography variants='h3' style={{color:'#fff'}}>
                    {size} 
                    </Typography>
                </Button>
            </Grid>
        ))}
    </Grid>
  )
}

export default Sizes