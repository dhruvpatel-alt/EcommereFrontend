import React,{useState,useEffect} from 'react'
import { Grid } from '@mui/material'
import CheckOutNavigation from './CheckOutNavigation'
import Detail from '../Setting/Detail'
import Location from '../Setting/Location'
import Payment from '../Setting/Payment'
import validate from '../ui/validate'
import Shipping from './Shipping'
import Confirmation from './Confirmation'
import BillingConfirmation from './BillingConfirmation'
import ThankYou from './Thankyou'
function CheckoutPortal({user}) {
  const [selectedStep,setSelectedStep]=useState(0)
  const [detailValues,setDetailValues]=useState({name:"",email:"",phone:""})
  const [locationValues,setLocationValues]=useState({street:"",zip:"",city:"",state:""})
  const [detailSlot,setDetailSlot]=useState(0);
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
    {title:'Contact Info',component:<Detail user={user} checkout setSlot={setDetailSlot}
    values={detailValues} setValues={setDetailValues} slot={detailSlot} errors={errors} 
    setErrors={setErrors} billing={detailBilling} setBilling={setDetailBilling} 
    />,hasActions:true,error:errorhelper(detailValues)},{title:'Address',component: <Location  user={user}   errors={errors} setErrors={setErrors}
    values={locationValues} setValues={setLocationValues} slot={locationSlot} setSlot={setLocationSlot} 
    billing={locationBilling} setBilling={setLocationBilling} checkout/>,hasActions:true  ,error:errorhelper(locationValues)}
    ,{title:'Shipping',component:<Shipping selectedShipping={selectedShipping}
    setSelectedShipping={setSelectedShipping} shippingOptions={shippingOptions}/>
  ,error:selectedShipping===null},
    {title:'Payment',component:<Payment user={user} slot={billingSlot} checkout setSlot={setBillingSlot}
    saveCard={saveCard} setSaveCard={setSaveCard}/>,error:false}
    ,{title:'Confirmation',component:<Confirmation detailValues={detailValues} locationValues={locationValues}
    selectedShipping={selectedShipping} saveCard={saveCard} shippingOptions={shippingOptions} user={user}
    selectedStep={selectedStep} setSelectedStep={setSelectedStep} setOrder={setOrder}
    />,error:true},
    {title:`Thanks ${user.username.split(" ")[0]}`,component:<ThankYou selectedShipping={selectedShipping}
    order={order}/>,error:true}
]
useEffect(() => {
  setErrors({})
}, [detailSlot,locationSlot])

  return (
   <Grid item container xs={6} direction='column' alignItems='flex-end' style={{height:'35rem'}}>
    <CheckOutNavigation steps={steps} selectedStep={selectedStep} detailValues={detailValues} 
    detailSlot={detailSlot} locationValues={locationValues} locationSlot={locationSlot}
    setSelectedStep={setSelectedStep}/>
   <Grid item container xs={6} direction='column' alignItems='center'
   style={{width:'40rem',height:'25rem',backgroundColor:'#1e90ff'}}>
    {steps[selectedStep].component}
   </Grid>
   {steps[selectedStep].title==='Confirmation'&&<BillingConfirmation 
   detailValues={detailValues}  locationValues={locationValues}
   />}
   </Grid>
  )
}

export default CheckoutPortal