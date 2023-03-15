import React,{useReducer,createContext} from 'react'
import cartReducer from '../reducers/cart-reducer'
export const CartContext=createContext();
const CartProvider=CartContext.Provider;

function CartWrapper({children}) {

  if (typeof window !== 'undefined') {
    const storedCart=JSON.parse(localStorage.getItem('cart'))}
    else{
      const storedCart=''
    }
    const [cart,dispatchCart]=useReducer(cartReducer,storedCart||[])
  return(
     <CartProvider value={{cart,dispatchCart}}>
      {children}
      </CartProvider>)

}


export default CartWrapper