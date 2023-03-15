import React, { useState ,useContext} from 'react'
import AppBar from '@mui/material/AppBar';
import {Link,navigate} from 'gatsby'
import IconButton from '@mui/material/IconButton';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
// import Hidden from '@mui/material/Hidden';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import search from '../../images/search.svg'
import cartIcon from '../../images/cart.svg'
import useMediaQuery from '@mui/material/useMediaQuery';
import account from '../../images/account-header.svg'
import menu from '../../images/menu.svg'
import ListItem from '@mui/material/ListItem';
import {CartContext} from '../../context/wrappers/CartWrapper'
import {UserContext} from '../../context/wrappers/UserWrapper'
import {FeedbackContext} from '../../context/wrappers/FeedbackWrapper'
import { setSnackbar} from '../../context/actions/feedback-actions'
function Header({categories}) {
  const {user,defaultUser,dispatchUser}=useContext(UserContext)
  const {feedback,dispatchFeedback}=useContext(FeedbackContext)
  const matchesMD=useMediaQuery((Theme)=>Theme.breakpoints.down('md'))
  const {cart}=useContext(CartContext);
  const cartLen=cart.length;
  const [drawerOpen,setDrawerOpen]=useState(false);
const routes=[...categories,{Name: 'Contact Us', strapi_id: 4,link:'/Contact'}]
const handleCart=()=>{
  if(user.username==='Guest'){
    dispatchFeedback(setSnackbar({"status":"error",
    message:'You must login to add item to cart,pls Login first!'}))
    navigate('/Account')
}else {
  navigate('/Cart')
}
}
const activeIndex=()=>{
  for (let i = 0; i < 4; i++) {
    if(typeof window!==null){
      if(`${routes[i].Name.toLowerCase()}`=== window.location.pathname.split('/')[1]||routes[i].link===window.location.pathname){
      return i;
    }}else return 0;
  }
  return -1
}
const tabs=( 
<Tabs value={activeIndex()} 
style={{marginLeft:"auto",marginRight:"auto"}}
>
{routes.map(route=>(
  <Tab style={{color:"#98b898x"}} 
  to={route.link||`/${route.Name.toLowerCase()}`}  
 component={Link}
  label={route.Name}
  key={route.strapi_id} 
 />
))}

</Tabs>);
const handleCloseDrawer=()=>{
  if(drawerOpen===true){
    setDrawerOpen(false);
  }
}
const drawer=(
    <SwipeableDrawer open={drawerOpen} onOpen={()=>setDrawerOpen(true)} onClose={()=>setDrawerOpen(false)}>
        <List disablePadding >
        {routes.map((route,i)=>(
            <ListItem divider button key={route.strapi_id} 
            selected={activeIndex()===i}
            component={Link}
             to={route.link||`/${route.Name.toLowerCase()}`} 
             onClick={handleCloseDrawer}>
                <ListItemText primary={route.Name} />
            </ListItem>
        ))}
        </List>
        </SwipeableDrawer>
)

  return (
    <AppBar color="transparent" elevation={0} style={{position:'inherit',top:0}}>
    <Toolbar>
      <Button style={{"marginRight":"auto"}} component={Link} to='/'>
        <Typography variant="h1" style={{height:"-1rem"}}><span style={{color:"#2A363B"}}>Var</span> X</Typography>
      </Button>
   {matchesMD?drawer:tabs}
      <IconButton to="/Search" component={Link}>
        <img  style={{"height":"3rem","width":"3rem"}} src={search} alt="search"/>
      </IconButton>
      <IconButton onClick={()=>handleCart()} >

        <img style={{"height":"3rem","width":"3rem"}} src={cartIcon} alt="cart"/>
     <span style={{fontSize: '1.5rem',
    backgroundColor: '#0f5191',color:'white',marginTop: '-2.5rem',
    marginLeft: '-0.5rem',borderRadius:'50rem'}}>{cartLen!==0?cartLen:null}</span>
      </IconButton>
      <IconButton  onClick={()=>matchesMD?setDrawerOpen(true):navigate('/Account')}>
        <img style={{"height":"3rem","width":"3rem"}} src={matchesMD ?menu:account} alt={matchesMD ?"menu":"account"}/>
      </IconButton>
    </Toolbar>
    </AppBar>
  )
}

export default Header