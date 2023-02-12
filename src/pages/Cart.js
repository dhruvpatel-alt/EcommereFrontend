import React,{useContext} from 'react'
import Layout from '../components/ui/Layout'
import { Grid } from '@material-ui/core'
import useMediaQuery from '@mui/material/useMediaQuery';
import { Typography } from '@mui/material'
import {UserContext} from '../context/wrappers/UserWrapper'
import CartItems from '../components/Cart/CartItems'
import CheckoutPortal from '../components/Cart/CheckoutPortal'
function Cart() {
  const matchesSm=useMediaQuery(theme=>theme.breakpoints.down('sm'))
    const {user}=useContext(UserContext)
  return (
    <Layout>
        <Grid container direction='column' alignItems='center'
        >
            <Grid item style={{marginBottom:'2rem'}}>
                <Typography variant='h1' style={{fontSize:matchesSm?'2rem':null}}>
                    {user.username}'s Cart
                </Typography>
            </Grid>
            <Grid item container >
                <CartItems />
                <CheckoutPortal user={user}/>
            </Grid>
            </Grid>
    </Layout>
  )
}

export default Cart