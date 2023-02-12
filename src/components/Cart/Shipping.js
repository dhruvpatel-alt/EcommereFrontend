import React from 'react'
import useMediaQuery from '@mui/material/useMediaQuery';
import { Grid,Button,Typography } from '@material-ui/core'
import shippingIcon from '../../images/shipping.svg'
function Shipping({shippingOptions,selectedShipping,setSelectedShipping}) {
    const matchesSm=useMediaQuery(theme=>theme.breakpoints.down('sm'))
  return (
    <Grid item container direction='column' alignItems='center' justifyContent='space-around' style={{height:'30rem'}}>
        <Grid item>
            <img src={shippingIcon} alt='shipping' style={{marginTop:'1.4rem'}}/>
        </Grid>
        <Grid item container justifyContent='space-evenly'>
            {shippingOptions.map(option=>(
                <Grid item key={option.label} >
                    <Button style={{backgroundColor:selectedShipping===option.label?'#fff':"#0f5191",borderRadius:15,
                    width:matchesSm?'6rem':'10rem',height:matchesSm?'6rem':'10rem'}}
                    onClick={() =>{
                        setSelectedShipping(option.label)
                    }}>
                      <Grid container direction='column'  >
                        <Grid item>
                            <Typography variant='h5' style={{color:selectedShipping===option.label?'#0f5191':"#fff",
                            fontSize:matchesSm?'0.9rem':'1.5rem'}}>
                                {option.label}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant='body1' style={{color:selectedShipping===option.label?'#0f5191':"#fff",fontSize:'1.5rem'}}>
                                ₹{option.price}
                            </Typography>
                        </Grid>
                </Grid>
                    </Button>
                </Grid>
            ))}
        </Grid>
    </Grid>
  )
}

export default Shipping