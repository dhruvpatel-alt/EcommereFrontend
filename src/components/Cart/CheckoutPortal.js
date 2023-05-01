import React,{useState,useEffect} from 'react'
import useMediaQuery from '@mui/material/useMediaQuery';
import { Grid } from '@mui/material'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckOutNavigation from './CheckOutNavigation'
import Detail from '../Setting/Detail'
import Location from '../Setting/Location'
import Payment from '../Setting/Payment'
import validate from '../ui/validate'
import Shipping from './Shipping'
import Confirmation from './Confirmation'
import BillingConfirmation from './BillingConfirmation'
import ThankYou from './Thankyou'
const stripePromise=loadStripe("pk_test_51MxCf1SAmOfy01Q8kZm15DTj3Omchb5HfFAcvw1Xm48NMBBbULPMryTK0U266Cv4ZofS5tZR4pyd6cGOmLy9fzbE00AxnEVsni")
function CheckoutPortal({user}) {
  const [selectedStep,setSelectedStep]=useState(0)
  const [detailValues,setDetailValues]=useState({name:"",email:"",phone:""})
  const [locationValues,setLocationValues]=useState({street:"",zip:"",city:"",state:""})
  const matchesMd=useMediaQuery(theme=>theme.breakpoints.down('md'))
  const matchesSm=useMediaQuery(theme=>theme.breakpoints.down('sm'))

  const [detailSlot,setDetailSlot]=useState(0);
  const [cardErrpr,setCardError]=useState(true);
  const [locationSlot,setLocationSlot]=useState(0);
  const [errors,setErrors]=useState({})
  const [order,setOrder]=useState(null)
  const [selectedShipping,setSelectedShipping]=useState('Free Shipping');
  const shippingOptions=[ 
    {label:'Free Shipping',price:0},
    {label:'2-Days Shipping',price:50},
    {label:'Over Night Shipping',price:100}
]
  const [detailBilling,setDetailBilling]=useState(true);
  const [locationBilling,setLocationBilling]=useState(true);
  const [saveCard,setSaveCard]=useState(false);
  const [billingSlot,setBillingSlot]=useState(0)
  const errorhelper=values=>{
    const valid=validate(values);
    return Object.keys(valid).some(value=>(value!=='password'&&valid[value]===false))
  }
  const steps=[
    {title:'Contact Info',component:<Detail user={user} checkout setSlot={setDetailSlot} selectedStep={selectedStep}
    values={detailValues} setValues={setDetailValues} slot={detailSlot} errors={errors} 
    setErrors={setErrors} billing={detailBilling} setBilling={setDetailBilling} 
    />,hasActions:true,error:errorhelper(detailValues)},{title:'Address',component: <Location  user={user}   errors={errors} setErrors={setErrors}
    values={locationValues} setValues={setLocationValues} slot={locationSlot} setSlot={setLocationSlot} selectedStep={selectedStep}
    billing={locationBilling} setBilling={setLocationBilling} checkout/>,hasActions:true  ,error:errorhelper(locationValues)}
    ,{title:'Shipping',component:<Shipping selectedShipping={selectedShipping} selectedStep={selectedStep}
    setSelectedShipping={setSelectedShipping} shippingOptions={shippingOptions}/>
  ,error:selectedShipping===null},
    {title:'Payment',component:<Payment user={user} slot={billingSlot} checkout setSlot={setBillingSlot} selectedStep={selectedStep}
    setCardError={setCardError}
    saveCard={saveCard} setSaveCard={setSaveCard} isCart={true}/>,error:cardErrpr}
    ,{title:'Confirmation',component:<Confirmation detailValues={detailValues} locationValues={locationValues} 
    selectedShipping={selectedShipping} saveCard={saveCard} shippingOptions={shippingOptions} user={user}
    selectedStep={selectedStep} setSelectedStep={setSelectedStep} setOrder={setOrder} order={order}
    />,error:true},
    {title:`Thanks ${user.username.split(" ")[0]}`,component:<ThankYou selectedShipping={selectedShipping} selectedStep={selectedStep}
    order={order}/>,error:true}
]
useEffect(() => {
  setErrors({})
}, [detailSlot,locationSlot])

  return (
   <Grid item container lg={6} direction='column' alignItems={matchesMd?'flex-start':'flex-end'} style={{height:matchesSm?'45rem':'35rem',marginBottom:matchesSm?'-5rem':null}}>
    <CheckOutNavigation steps={steps} selectedStep={selectedStep} detailValues={detailValues} 
    detailSlot={detailSlot} locationValues={locationValues} locationSlot={locationSlot}
    setSelectedStep={setSelectedStep}/>
   <Grid item container xs={6} direction='column' alignItems='center'
    style={{width:matchesMd?'100%':'40rem',height:'25rem',backgroundColor:'#1e90ff'}}>
      <Elements stripe={stripePromise}>
    {/* {steps[selectedStep].component} */}
    {steps.map((step,i)=> React.cloneElement(step.component,{stepNumber:i,key:i}))}
      </Elements>
   </Grid>
   {steps[selectedStep].title==='Confirmation'&&<BillingConfirmation 
   detailValues={detailValues}  locationValues={locationValues}
   />}
   </Grid>
  )
}

export default CheckoutPortal