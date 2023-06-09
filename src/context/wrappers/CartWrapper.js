import React,{useReducer,createContext} from 'react'
import cartReducer from '../reducers/cart-reducer'
export const CartContext=createContext();
const CartProvider=CartContext.Provider;

function CartWrapper({children}) {
var storedCart=[];
  if (typeof window !== 'undefined') {
    storedCart=JSON.parse(localStorage.getItem('cart'))}

    const [cart,dispatchCart]=useReducer(cartReducer,storedCart||[])
  return(
     <CartProvider value={{cart,dispatchCart}}>
      {children}
      </CartProvider>)

}


export default CartWrapper