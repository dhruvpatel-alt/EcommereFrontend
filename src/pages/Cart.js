import React,{useContext} from 'react'
import Layout from '../components/ui/Layout'
import { Grid } from '@material-ui/core'
import { Typography } from '@mui/material'
import {UserContext} from '../context/wrappers/UserWrapper'
import CartItems from '../components/Cart/CartItems'
import CheckoutPortal from '../components/Cart/CheckoutPortal'
function Cart() {
    const {user}=useContext(UserContext)
  return (
    <Layout>
        <Grid container direction='column' alignItems='center'
        style={{height:'100vh'}}>
            <Grid item style={{marginBottom:'2rem'}}>
                <Typography variant='h1'>
                    {user.username}'s Cart
                </Typography>
            </Grid>
            <Grid item container>
                <CartItems/>
                <CheckoutPortal user={user}/>
            </Grid>
            </Grid>
    </Layout>
  )
}

export default Cart