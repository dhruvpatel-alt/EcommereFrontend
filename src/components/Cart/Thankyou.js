import React from 'react'
import useMediaQuery from '@mui/material/useMediaQuery';
import { Link } from 'gatsby'
import { Button, Grid, Typography } from '@mui/material'
import  complete from '../../images/order-placed.svg'
function Thankyou({selectedShipping,order}) {
    const matchesSm=useMediaQuery(theme=>theme.breakpoints.down('sm'))

    const addToDate=days=>{
        const date=new Date();
        date.setDate(date.getDate()+days)
        const day=date.getDate()
        const month=date.getMonth()+1
        const year=date.getFullYear()
        return `${day}/${month}/${year}`
    }
    const getExpected=()=>{
        switch(selectedShipping){
            case '2-Days Shipping':
                return addToDate(2)
            case 'Over Night Shipping':
                return addToDate(1)
            default:
                return addToDate(7)
        }
    }
  return (
    <Grid item container direction='column' alignItems='center' justifyContent='center' style={{height:'100%'}} >
<Grid item style={{marginTop:'1rem'}}>
    <img src={complete} alt='order placed'/>
</Grid>
<Grid item >
    <Typography variant='h4' alignItems='center'>
        Expected by:{getExpected()}
    </Typography>
    <Grid item container justifyContent={matchesSm?'space-around':'space-between'} alignItems='center' style={{marginTop:'0.5rem'}}>
    <Grid item>
    <Typography variant='body1' style={{color:'#fff',fontWeight:600,fontSize:matchesSm?'1rem':null}}>
        Order:#{order.id}
    </Typography>
    </Grid>
<Grid item>
    <Button style={{padding:'0.2rem 0rem',textTransform:'none'}}>
        <Typography variant='body2'  style={{color:'#fff',fontSize:matchesSm?'1rem':null}}>
            Details {'>'}
        </Typography>
    </Button>
</Grid>
</Grid>
</Grid>

<Grid item>
    <Button component={Link} to='/'> 
        <Typography variant='body2'  style={{color:'#fff',fontWeight:'600',fontSize:matchesSm?'1.5rem':'2rem'
        ,textTransform:'none'}}>
            Shop {'>'}
        </Typography>
    </Button>
</Grid>
    </Grid>
  )
}

export default Thankyou