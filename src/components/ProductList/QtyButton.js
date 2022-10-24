import React,{useState,useEffect,useContext} from 'react'
import Cart from '../../images/Cart.js'
import {Grid,Typography,Button,ButtonGroup} from '@mui/material';
import {CartContext} from '../../context/wrappers/CartWrapper'
import {UserContext} from '../../context/wrappers/UserWrapper'
import {FeedbackContext} from '../../context/wrappers/FeedbackWrapper'
import { setSnackbar} from '../../context/actions/feedback-actions'

import {addToCart,removeFromCart} from '../../context/actions/cart-actions'
import { navigate } from 'gatsby';
function QtyButton({stock,variants,selectedVariant,name,isCart}) {
    const {user,defaultUser,dispatchUser}=useContext(UserContext)
    const {cart,dispatchCart}=useContext(CartContext);
    const {feedback,dispatchFeedback}=useContext(FeedbackContext)

    const existingItem=cart.find((item=>item.variant===variants[selectedVariant]))
    const [qty,setQty]=useState(isCart?existingItem.qty:1)
    const [success,setSuccess]=useState(false);
   
    const handleChange=direction=>{
        if(qty===stock.data[selectedVariant].attributes.qty&&direction==='up'){
            return null
        }
        if(qty===1&&direction==='down'){
            return null
        }
        setQty(direction==='up'?qty+1:qty-1)
        if(isCart){
            if(direction==='up'){
                dispatchCart(addToCart(variants[selectedVariant],1,name))
            }else if(direction==='down'){
                dispatchCart(removeFromCart(variants[selectedVariant],1))
            }
        }
    }
    useEffect(()=>{
        if(stock===null||stock===-1){
            return undefined
        }
        else if(qty>stock.data[selectedVariant].attributes.qty){
            setQty(stock.data[selectedVariant].attributes.qty)
        }
    },[stock,selectedVariant])

    const handleCart=()=>{
        if(user.username==='Guest'){
            dispatchFeedback(setSnackbar({"status":"error",
            message:'You must login to add item to cart,pls Login first!'}))
            navigate('/Account')
        }else{
            setSuccess(true)
            dispatchCart(addToCart(variants[selectedVariant],qty,name,stock.data[selectedVariant].attributes.qty))
        }
    }
   useEffect(() => {
    let timer;
   if(success){
timer=setTimeout(()=>setSuccess(false),1500);
   }
     return () => {
        clearTimeout(timer)
     }
   }, [success])
   
  return (
    <Grid item >
        <ButtonGroup>
            <Button style={{height:'4.25rem',width:'2.5rem',backgroundColor:isCart?'#fff':'#0f5191',borderRadius:'50px 0 0 50px',borderColor:isCart?'#fff':null}}>
                <Typography variant='h3' style={{color:isCart?'#0f5191':'#fff'}}>
                    {qty}
                </Typography>
                </Button>
                <ButtonGroup orientation='vertical' style={{height:'4.25rem',borderLeft:`2px solid ${isCart?'#0f5191':'#fff'}`,borderRight:'2px solid #fff',borderRadius:'0px'
            }}>
                <Button style={{backgroundColor:isCart?'#fff':'#0f5191',borderRadius:0,borderColor:isCart?'#fff':null,height:'2rem',
                borderBottom:isCart?'2px solid #0f5191':null}}
                onClick={()=>{handleChange('up')}}>
                <Typography variant='h3' style={{color:isCart?'#0f5191':'#fff'}}>
                    +
                </Typography>
                </Button>
                <Button style={{backgroundColor:isCart?'#fff':'#0f5191',borderRadius:0,marginLeft:0,marginTop:'0.25rem',height:'2rem'
                ,borderColor:isCart?'#fff':null}}
                onClick={()=>{handleChange('down')}}>
                <Typography variant='h3' style={{color:isCart?'#0f5191':"#fff"}}>
                    -
                </Typography>
                </Button>
                </ButtonGroup>
                    {isCart?null:<Button style={{height:'4.25rem',border:0,backgroundColor:success?'#62BD69':'#0f5191',width:'4rem',marginLeft:'0',borderRadius:'0 50px 50px 0',padding:0}}
                onClick={()=>{handleCart()}} disabled={success}>
                    {success?<Typography   variant='h3' style={{color:"#fff"}}>
                    &#x2714;
                    </Typography>:
                    <>
                    <Cart color='#fff' width='3.5rem' height='2.5rem' />
                    <span style={{fontSize: '1.5rem',color:'#fff',marginTop: '-1.9rem',marginLeft:'-0.9rem'}}>+</span>
                    </>}
                </Button>}
        </ButtonGroup>
    </Grid>
  )
}

export default QtyButton