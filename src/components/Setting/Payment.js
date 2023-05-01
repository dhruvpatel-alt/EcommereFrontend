import React,{useState} from 'react'
import useMediaQuery from '@mui/material/useMediaQuery';
import {Grid,Typography,Button,FormControlLabel,Switch} from '@mui/material'
import cardIcon from '../../images/card.svg'
import { CardElement,useStripe,useElements } from '@stripe/react-stripe-js';
import Slot from './Slot'
function Payment({user,slot,setSlot,checkout,saveCard,setSaveCard,isCart,setCardError,selectedStep,stepNumber}) {
   const stripe=useStripe()
   const elements=useElements()
    const matchesMd=useMediaQuery(theme=>theme.breakpoints.down('md'))

    const card=user.username===''?{last4:"",brand:""}:user.Paymentmethods[slot]
    const handleSubmit=async event=>{
        event.preventDefault()
        if(!stripe||!elements) return;
    }
    const handleCardChange=async event=>{
        if(event.complete){
            setCardError(false)
        }else{
            setCardError(true)

        }
    }

    const cardWrapper=(
        <form onSubmit={handleSubmit} style={{width:'75%',height:'2rem',borderBottom:'2px solid #fff'}}>
            <CardElement options={{style:{
                base:{
                    fontSize:"20px",
                    fontFamily:"Montesrrat",
                    color:"#fff",
                    iconColor:"#FFF",
                    "::placeholder":{
                        color:'#fff'
                    }
                }
            }}} onChange={handleCardChange}/>
        </form>
    )
  return (
    <Grid item container direction='column' xs={12} lg={6} alignItems='center' style={{borderLeft:checkout?'0':matchesMd?'':"4px solid #fff",position:'relative',height:'30rem'
,display:checkout&&selectedStep!==stepNumber?"none":"flex"}}
    justifyContent='center'>
            <Grid item>
                <img src={cardIcon} alt='payment settings' style={{marginBottom:checkout?'2rem':"3rem",marginTop:checkout?'1rem':''}}/>
            </Grid>
            <Grid item container justifyContent='center'>
                {checkout&&!card.last4 ?cardWrapper:null}
                <Grid item>
                    <Typography variant='h3' style={{color:"#FFF",textAlign:matchesMd?'center':undefined}}>
                        {card.last4?`${card[0].brand.toUpperCase()}  **** **** **** ${card[0].last4}`:checkout?null:"Add a New Card During Checkout "}
                    </Typography>
                </Grid>
                {card.last4&&<Grid item>
                    <Button variant='contained' style={{paddingLeft:5,paddingRight:5,backgroundColor:"#FFF"}}>
                        <Typography variant='h6' style={{fontSize:'1rem',color:'#1e90ff',fontFamily:'Philosopher',fontStyle:'italic'}}>
                            remove card
                        </Typography>
                    </Button>

                </Grid>}
            </Grid>
            <Grid item container style={{marginLeft:checkout?'0.5rem':'1rem',marginBottom:isCart?(matchesMd?'0':'-7.5rem'):checkout?'-7.5rem':'1rem',position:'absolute',bottom:'0'}}
        justifyContent={checkout?'space-between':null}>
            <Slot slot={slot} setSlot={setSlot} noLabel/>
            {checkout&&(<Grid item>
  <FormControlLabel control={<Switch checked={saveCard} onChange={()=>setSaveCard(!saveCard)} 

  color='primary'/>} labelPlacement='top' label='Save card for future use' />
</Grid>)}
        </Grid>
    </Grid>
  )
}

export default Payment