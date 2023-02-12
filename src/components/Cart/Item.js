import React,{useContext} from 'react'
import { Chip, Grid ,IconButton} from '@material-ui/core'
import useMediaQuery from '@mui/material/useMediaQuery';
import { Typography } from '@mui/material'
import QtyButton from '../ProductList/QtyButton'
import FavouriteIcon from '../../images/Favourite.jsx'
import SubscribeIcon from '../../images/Subcriptions.jsx'
import DeleteIcon from '../../images/Delete.jsx'
import {removeFromCart} from '../../context/actions/cart-actions';
import {CartContext} from '../../context/wrappers/CartWrapper'

function Item({item}) { 
    const {cart,dispatchCart}=useContext(CartContext);  
    const actions=[
        {icon:<FavouriteIcon color='#0f5191'/>},
        {icon:<SubscribeIcon color='#0f5191'/>},
        {icon:<DeleteIcon color='#E84A5F'/>}
    ]
    const handleClick=(i)=>{
        if(i===2){
            dispatchCart(removeFromCart(item.variant,item.qty))

        }
    }
  const matchesMd=useMediaQuery(theme=>theme.breakpoints.down('md'))
  const matchesSm=useMediaQuery(theme=>theme.breakpoints.down('sm'))

  return (
    <Grid item container style={{margin:matchesMd?'2rem 0':'2rem 0 2rem 2rem',flexWrap:'nowrap'}}>
        <Grid item style={{backgroundColor:'#f2eaf1'}}>
            <img src={`http://localhost:1337${item.variant.images[0].url}`} alt={item.variant.id}
            style={{height:'10rem',width:'10rem'}}/>
            </Grid>
            <Grid item container justifyContent='space-between' style={{width:'35rem',position:'relative',height:'8rem',marginLeft:'1rem'}} >
                    <Grid item container justifyContent='space-between' direction='column'>

                <Grid item >
                <Typography variant='h5' style={{color:'#0f5191'}}>
                    {item.name}
                </Typography>
                </Grid>
                <Grid item container xs justifyContent='flex-end' >
                    {actions.map((action,i)=>(
                        <Grid item key={i}>
                            <IconButton onClick={()=>{handleClick(i)}}>
                                <span style={{height:matchesSm?'2rem':i===2?'2.5rem':'3rem',width:matchesSm?'2rem':i===2?'2.5rem':'3rem'}}>
                                {action.icon}
                                </span>
                            </IconButton>
                            </Grid>
                    ))}
                </Grid>
                </Grid>
                <Grid item container alignItems='center'>
                    <Grid item style={{position:'absolute'}}>
                    <Chip label={`₹${item.variant.Price}`}
        style={{backgroundColor:'#0f5191',fontSize:matchesSm?'1rem':'2rem',color:'#fff',fontWeight:700, fontFamily:"Philosopher", fontStyle:"italic",
        marginTop:'1rem'}}/>
                    </Grid>
                </Grid>
                <Grid item container justifyContent='space-between' direction={matchesSm?'column':'row'}
                 alignItems='flex-end' style={{marginTop:matchesSm?null:'1rem'}}>
                    <Grid item xs={7} sm style={{marginTop:matchesSm?'1.5rem':null}}>
                        <Typography variant='body1' style={{color:'#0f5191',fontSize:'1rem'}}>
                        ID:{item.variant.strapi_id}
                    </Typography>
                    </Grid>
                <Grid item>
                <QtyButton name={item.name} selectedVariant={0} variants={[item.variant]}
                stock={{data:[{attributes:{qty:item.stock}}]}} isCart/>
            </Grid>
                </Grid>
                
                    </Grid>
            </Grid>
  )
}

export default Item