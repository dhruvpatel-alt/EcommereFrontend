import React,{useState,useContext,useEffect} from 'react'
import axios from 'axios'
import useMediaQuery from '@mui/material/useMediaQuery';
import Feilds from '../Auth/Field'
import {Chip,CircularProgress, Grid,Typography,Button} from  '@mui/material'
import confirmationIcon from '../../images/tag.svg'
import NameAdornment from '../../images/name-adornment.js'
import EmailAdornment from '../../images/email-adornment.js'
import PhoneAdornment from '../../images/phone-adornment.js'
import streetAdornment from '../../images/street-adornment.svg'
import zipAdornment from '../../images/zip-adornment.svg'
import cardAdornment from '../../images/card.svg'
import promoAdornment from '../../images/promo-code.svg'
import {CartContext} from '../../context/wrappers/CartWrapper'
import { setSnackbar} from '../../context/actions/feedback-actions'
import { clearCart} from '../../context/actions/cart-actions'
import {FeedbackContext} from '../../context/wrappers/FeedbackWrapper'
import { v4 as uuidv4 } from 'uuid';
import { CardElement,useStripe,useElements } from '@stripe/react-stripe-js';

function Confirmation({detailValues,locationValues,selectedShipping,saveCard,order,shippingOptions,user,selectedStep,setSelectedStep,setOrder,stepNumber}) {
    const {feedback,dispatchFeedback}=useContext(FeedbackContext)
    const matchesSm=useMediaQuery(theme=>theme.breakpoints.down('sm'))
    const stripe=useStripe()
    const elements=useElements()
    const {cart,dispatchCart}=useContext(CartContext);
    const [loading,setLoading]=useState(false)
    const [clientSecret,setClientSecret]=useState(null)
    const fields=[{value:detailValues.name,adornment:(  <div style={{width:22,height:22}} >
        <NameAdornment color='#fff'/>
    </div>)},
    {value:detailValues.email,adornment:(  <div style={{width:17,height:22}}>
        <EmailAdornment color='#fff'/>
    </div>)},{value:detailValues.phone,adornment:(  <div style={{width:25.173,height:25.122}}>
        <PhoneAdornment color='#fff'/>
    </div>)},{value:locationValues.street,adornment:( <img src={streetAdornment} alt='street'/>)}]
    const secondFields=[{value:`${locationValues.city}  ${locationValues.state},${locationValues.zip}  `,adornment:( <img src={zipAdornment} alt='zip'/>)},
    {value:"**** **** **** 1234",adornment:( <img src={cardAdornment} alt='card' style={{height:18,width:25}}/>)},{
        promo:{
            helperText:'',
            placeholder:'Promo Code',
            startAdornment:<img src={promoAdornment} alt='promo'/>
        }
    }]
    const [promo,setPromo]=useState('');
    const [promoError,setPromoError]=useState({});
    const shipping=shippingOptions.find(option=>option.label===selectedShipping)
    const subtotal=cart.reduce((total,item)=>total+item.variant.Price*item.qty,0)
    const prices=[
        {
            label:'SUBTOTAL',
            price:subtotal.toFixed(2)
        },
        {
            label:'SHIPPING',
            price:shipping?.price
        },
        {
            label:'TAX',
            price:(subtotal*0.05).toFixed(2)
        }
    ]
    const total=prices.reduce((total,item)=>total+parseFloat(item.price),0)
    const adornmentValue=(adornment,value)=>(
        <>

         <Grid item xs={2} style={{display:'flex',justifyContent:'center'}}>
                  {adornment}
                </Grid>
                <Grid item xs={10} style={{display:'flex',alignItems:'center',overflowX:'auto'}} >
                <Typography variant='body1' style={{color:'#fff',flexWrap:'nowrap'}} >
                    {value}
                </Typography>
                </Grid>
        </>
    )
    const handleOrder=async()=>{
        if(loading){

        }
        else if(user.username==='Guest'){
                dispatchFeedback(setSnackbar({"status":"error",
                message:'You must login to order  '}))
        }else if(cart.length===0){
            dispatchFeedback(setSnackbar({"status":"error",
            message:'You must add An item to place order '}))
        }
        else{
        setLoading(true);
        const idempotencyKey=uuidv4();
        const cardElement=elements.getElement(CardElement)
       const result="succes"
        if(result.error){
            console.error(result.error.message)
            dispatchFeedback(setSnackbar({status:'error',message:result.error.message}))
            setLoading(false)
        }else if(result.paymentIntent.status==="succeeded"){
        console.log(shipping)
        axios.post(`https://ecommerce-backend-ql48.onrender.com/api/orders/finalize`,{
        
            shippingAddress:locationValues,
            shippingInfo:detailValues,
            shippingOption:shipping,
            subtotal:subtotal.toFixed(2),
            tax:(subtotal*0.05).toFixed(2),
            total:total.toFixed(2),
            items:cart,
            transaction:result.paymentIntent.id
        },{
            headers:user.jwt?{
                Authorization:`Bearer ${user.jwt}`
            }:undefined
            
        }).then(response=>{
            setLoading(false)
            dispatchCart(clearCart())
            localStorage.removeItem("intentID")
            setClientSecret(null)
            setSelectedStep(selectedStep+1)
            console.log(response.data.data)
            setOrder(response.data.data)
        }).catch(error=>{
            setLoading(false);
            console.log(error.message)
            console.log("Failed Payment Intent",result.paymentIntent.id)
            console.log("Failed Cart",cart)
            localStorage.removeItem("intentID")
            setClientSecret(null)
            switch (error.response.status) {
                case 400:
                    dispatchFeedback(setSnackbar({"status":"error",
                    message:'Invalid Cart ,Pls try again! '}))
                    break;
                case 409:
                    dispatchFeedback(setSnackbar({"status":"error",
                    message:'The following items are not available at the requested quantity.Please update your cart and try again.\n'+`${error.response.data.unavailable.map(item=>
                        `\nItem:${item.id},Available:${item.qty}`)}`}))
                    break;
                default:
                    dispatchFeedback(setSnackbar({"status":"error",
                    message:'There was a problem saving your order.Please keep this screen open and contact support'}))
                    break;
            }
       
        })}
    }}
    useEffect(() => {
        if(!order&&cart.length!==0&&selectedStep===stepNumber){
            const storeIntent=localStorage.getItem("intentID")
            const idempotencyKey=uuidv4()
            setClientSecret(null)
            axios.post(`https://ecommerce-backend-ql48.onrender.com/api/orders/process`,{
                items:cart,
                total:total.toFixed(2),
                shippingOption:shipping,
                idempotencyKey,
                storeIntent,
                email:detailValues.email
            },{
                headers:user.jwt?{
                    Authorization:`Bearer ${user.jwt}`
                }:undefined
            }).then(response=>{
                setClientSecret(response.data.client_secret)
                localStorage.setItem("intentID",response.data.intentID)
            }).catch(error=>{
                setLoading(false);
                console.log(error.message)
                switch (error.response.status) {
                    case 400:
                        dispatchFeedback(setSnackbar({"status":"error",
                        message:'Invalid Cart ,Pls try again! '}))
                        break;
                    case 409:
                        dispatchFeedback(setSnackbar({"status":"error",
                        message:'The following items are not available at the requested quantity.Please update your cart and try again.\n'+`${error.response.data.unavailable.map(item=>
                            `\nItem:${item.id},Available:${item.qty}`)}`}))
                        break;
                    default:
                        dispatchFeedback(setSnackbar({"status":"error",
                        message:'Something went wrong,pls refresh the page and try again.You have NOT been charged.'}))
                        break;
                }
            })
        }
    }, [cart,selectedStep,stepNumber])
    console.log(clientSecret)
  return (
    <Grid item container direction='column' style={{height:'100%',display:selectedStep!==stepNumber?"none":"flex"}}>
        <Grid item container>
            <Grid item container xs={7} direction='column'>
                {fields.map((field,i)=>(

            <Grid item container key={field.name} alignItems='center'
            style={{backgroundColor:i%2!==0?'#0f5191':'#1e90ff',height:'2.5rem'}}>
               {adornmentValue(field.adornment,field.value)}
                </Grid>    
                ))}
        </Grid>
        <Grid item xs={5} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
<img src={confirmationIcon} alt='confirmation' style={{height:'7rem',width:'7rem',marginBottom:'1rem'}}/>
        </Grid>
        </Grid>
        {secondFields.map((field,i)=>(
            <Grid item container key={i} alignItems='center'
            style={{backgroundColor:i%2!==0?'#0f5191':'#1e90ff',height:'2.5rem'}}>
                <Grid item container xs={7}>
                    {field.promo?(
                        <span style={{marginLeft:'1.25rem'}}>
                        <Feilds fields={field} values={promo} setValues={setPromo} 
                        errors={promoError}
                        setErrors={setPromoError} isPromo/>
                        </span>
                    ):(
                        adornmentValue(field.adornment,field.value)
                    )}
                </Grid>
                <Grid item xs={5} style={{display:'flex'}}>
                        <Grid item xs={6}>
                            <Typography variant='h5' style={{fontSize:matchesSm?'0.85rem':'1.5rem'}}>
                                {prices[i].label}
                            </Typography>
                </Grid>
                        <Grid item xs={6}>
                            <Typography variant='body2' style={{fontSize:matchesSm?'0.85rem':'1.5rem',color:'#fff',marginRight:'1rem'}} align='right'>
                            ₹{prices[i].price}
                            </Typography>
                </Grid>
                </Grid>
                </Grid>
            ))}
            <Grid item style={{margin:'auto',marginTop:'1rem',width:'100%'}}>
                <Button style={{width:"100%",height:'5rem',borderRadius:0,backgroundColor:(cart.length===0||loading)?'#747474':'#0f5191'}}
                onClick={handleOrder} disabled={cart.length===0||loading||!clientSecret}>
                    <Grid  container justifyContent='space-around' alignItems='center'>
                        <Grid item>
                            <Typography variant='h5'>
                                Place Order
                            </Typography>

                        </Grid>
                        {loading?<CircularProgress/>: (<Grid item >
                             <Chip label={`₹${total}`} style={{backgroundColor:'#fff',fontSize:'2rem',
                            color:'#0f5191',fontWeight:700, fontFamily:"Philosopher", fontStyle:"italic"}}/>                        
                            </Grid>)}
                    </Grid>

                </Button>
            </Grid>
    </Grid>
  )
}

export default Confirmation