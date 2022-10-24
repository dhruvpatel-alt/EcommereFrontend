import React,{useContext,useState,useEffect} from 'react'
import clsx from 'clsx'
import { useSprings ,useSpring,animated} from 'react-spring'
import { makeStyles } from "@material-ui/core/styles";
import {Grid,Typography,Button} from '@mui/material'
import accountIcon from '../../images/account.svg'
import settingsIcon from '../../images/settings.svg'
import orderHistoryIcon from '../../images/order-history.svg'
import favoritesIcon from '../../images/favorite.svg'
import subscriptionIcon from '../../images/subscription.svg'
import background from '../../images/toolbar-background.svg'
import useResizeAware from 'react-resize-aware'
import Setting from './Setting'
import OrderHistory from './OrderHistory'
import {UserContext} from '../../context/wrappers/UserWrapper'
import {setUser} from '../../context/actions/user-actions'
import Favourites from './Favourites'
import Subscriptions from './Subscriptions'
import useMediaQuery from '@mui/material/useMediaQuery';

import {CartContext} from '../../context/wrappers/CartWrapper'
const AnimatedGrid=animated(Grid)
function SettingPortal() {
  const matchesMd=useMediaQuery(theme=>theme.breakpoints.down('md'))
const matchesLg=useMediaQuery(theme=>theme.breakpoints.down('lg'))
const {user,dispatchUser,defaultUser}=useContext(UserContext)
const buttonWidth=matchesLg?288:352;
const buttonHeight=matchesLg?"18rem":"22rem";
const useStyles = makeStyles(theme=>({
  button:{
    backgroundColor:'#1e90ff'
  },
  addHover:{
    "&:hover":{
      cursor:'pointer',
      backgroundColor:'#0f5191'
    }
  }
}))
const classes=useStyles()
var name=user.username
const [selectedSetting,setSelectedSetting]=useState(null)
const [showComponent,setShowComponent]=useState(null)
const [resizeListener,sizes]=useResizeAware()
const buttons=[
  {label:"Settings",icon:settingsIcon,component:Setting},
  {label:"Order History",icon:orderHistoryIcon,component:OrderHistory},
  {label:"Favourites",icon:favoritesIcon,component:Favourites},
  {label:"Subscriptions",icon:subscriptionIcon,component:Subscriptions}
]
const handleClick=setting=>{
  if(selectedSetting===setting){
    setSelectedSetting(null)
  }else{
    setSelectedSetting(setting)
  }
}
const springs=useSprings(buttons.length,buttons.map(button=>({
  to:async(next,cancel)=>{
    const scale={
  transform:selectedSetting===button.label||selectedSetting===null?'scale(1)':'scale(0)',
  delay:selectedSetting!==null?0:600
    }
    const hide={
      display:selectedSetting===button.label||selectedSetting===null
      ?"flex":"none",
      delay:150
    }
    const size={
      height:selectedSetting===button.label?matchesMd?'120rem':'60rem':'22rem',
      width:selectedSetting===button.label?`${sizes.width}px`:matchesMd?'300px':'352px',
      margin:matchesMd?'3rem 0':undefined ,
      borderRadius:selectedSetting===button.label?0:25,
      delay:selectedSetting===null?0:600

    }
    await next(selectedSetting!==null?scale:size)
    await next(hide)
    await next(selectedSetting===null?scale:size)
  },
})))
const styles=useSpring({
  opacity:selectedSetting===null||showComponent?1:0
  // delay:selectedSetting===null?0:1350
})  
useEffect(() => {
if(selectedSetting===null){
  setShowComponent(false)
  return
}
const timer=setTimeout(() => {
  setShowComponent(true)
}, 2000);
return ()=> clearTimeout(timer)
}, [selectedSetting])
const logout=()=>{

  dispatchUser(setUser(defaultUser))
}
  return (
    <Grid container direction='column' alignItems='center'>
      {resizeListener}
      <Grid item >
        <img src={accountIcon} alt='settings page'/>
      </Grid>     
      <Grid item style={{margin:'1rem 0',textAlign:'center'}}>
        <Typography variant='h4' style={{color:'#0f5191',fontSize:matchesMd?'2rem':''}}>
          Welcome Back,{name.charAt(0).toUpperCase() + name.slice(1)}
        </Typography>
      </Grid>
      <Grid item>
        <Button>
          <Typography variant='h5' style={{color:'#E84A5F'}} onClick={logout}>
            Logout
          </Typography>
        </Button>
      </Grid>
      <Grid item container style={{width:'100%',minHeight:'30rem',height:'auto',backgroundImage:`url(${background})`,backgroundSize:'cover',
    backgroundPosition:"center",backgroundRepeat:"no-repeat",borderTop:!showComponent?'0.5rem solid #1e90ff':null,borderBottom:!showComponent?"0.5rem solid #1e90ff":null
    ,margin:"3rem 0 5rem 0"}}
    alignItems='center' justifyContent='space-around'>
        {springs.map((prop,i)=>{
          const button=buttons[i]
          return(
          <Grid item key={i}>
            <AnimatedGrid item variant='contained' color='primary'
            classes={{root:clsx(classes.button,{
              [classes.addHover]:!showComponent
            })}}
                style={prop}  onClick={()=>showComponent?null:handleClick(button.label)}>  
              <AnimatedGrid container direction='column' style={styles}
               alignItems='center' justifyContent='center'>
                {selectedSetting===button.label&&showComponent?<button.component setSelectedSetting={setSelectedSetting}/>:(
                  <>
                <Grid item>
                  <img src={button.icon} alt={button.label}
                  style={{height:'12rem',width:'12rem'}}/>
                </Grid>
                <Grid item>
                  <Typography variant='h5'>
                    {button.label}
                  </Typography>
                </Grid>
                </>
                )}
              </AnimatedGrid>
            </AnimatedGrid>
            </Grid>
        )})}
      </Grid>
    </Grid>
  )
}

export default SettingPortal