import React,{useContext} from 'react'
import { Grid } from '@material-ui/core'
import {CartContext} from '../../context/wrappers/CartWrapper'
import Item from './Item';
function CartItems() {
    const {cart}=useContext(CartContext);
  return (
    <Grid item container xs={6} direction='column'>
        {cart.map(item=>(
            <Item item={item} key={item}/>
        ))}

    </Grid>
  )
}

export default CartItems