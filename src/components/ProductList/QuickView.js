import { Dialog,DialogContent,Grid,Typography,Chip } from '@mui/material'
import {Link} from 'gatsby'
import React from 'react'
import Rating from '../Home/Rating'
import frame from './summer-product-backdrop-blue-sea-background.jpg'
import Sizes from './Sizes'
import Swatches from './Swatches'
import QtyButton from './QtyButton'
import {getStockDisplay} from '../ProductDetail/ProductInfo'
function QuickView({open,setOpen,url,hasStyles,name,price,res,selectedSize,sizes,setSelectedSize,selectedColor,setSelectedColor,product,variant,hasColors,stock,imageIndex}) {
  const linkUrl=`/${product.node.variant_2.Name.toLowerCase()}/${product.node.Name.split("_")[0].toLowerCase()}${hasStyles?`?style=${variant.style}`:''}${hasColors?`${hasStyles?'&':'?'}color=${variant.Color.split('#')[1]}`:''}`
   const selectedVariant=imageIndex===-1?product.node.variants.indexOf(variant):imageIndex
  var stockDisplay=getStockDisplay(stock,selectedVariant);
  return (
    <Dialog open={open} onClose={()=>setOpen(false)} maxWidth='md' >
        <DialogContent style={{backgroundImage:`url(${frame})`,backgroundPosition:'top',backgroundRepeat:'no-repeat',width:'34rem',height:'30rem',paddding:"0 !important",backgroundSize:'cover'}}>
<Grid container direction='column' alignItems='center'  >
    <Grid item  component={Link} to={linkUrl}>
        <img src={url} alt='productimage' style={{height:'24rem',width:'28rem'}}/>
    </Grid>
    <Grid item container style={{height:'5rem'}} justifyContent='space-between' alignItems='center'>
      <Grid item  component={Link} to={linkUrl}>
        <Typography variant='h4' style={{color:'#fff',fontSize:'2.5rem'}}>
          {name}
        </Typography>
        <Rating number={4} height='1rem' width='1rem'/>
        <Chip label={'₹'+price}  style={{backgroundColor:"#0f5191",color:"#fff",fontWeight:500,fontSize:"1rem",marginLeft:'0.5rem', fontFamily:"Montserrat"}}/>
      
        <Typography variant='h3' style={{color:"#0f5191",fontSize:"0.9rem"}}>
            {stockDisplay}  
        </Typography>
      </Grid>
        <Grid item>
        <QtyButton stock={stock} selectedVariant={selectedVariant}
        name={name} variants={product.node.variants}/>
        </Grid>
      <Grid item>
        <Sizes sizes={sizes} selectedSize={selectedSize} setSelectedSize={setSelectedSize}/>
        <Swatches colors={res} selectedColor={selectedColor} setSelectedColor={setSelectedColor}/>
      </Grid>
    </Grid>
</Grid>
        </DialogContent>
    </Dialog>
  )
}

export default QuickView