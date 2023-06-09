import React,{useContext} from 'react'
import { Grid } from '@material-ui/core'
import {CartContext} from '../../context/wrappers/CartWrapper'
import Item from './Item';
function CartItems() {
    const {cart}=useContext(CartContext);
  return (
    <>
    {cart.length===0?(<Grid item container xs={6} direction='column'>No Item</Grid>):(<Grid item container lg={6} direction='column' >
        {cart.map((item,i)=>(
          <Item item={item} key={i}/>
        ))}

    </Grid>)}
          </>
  )
}

export default CartItems