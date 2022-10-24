import React from 'react'
import useMediaQuery from '@mui/material/useMediaQuery';
import {Link} from 'gatsby'
import frame from '../../images/product-frame-list.svg'
import {Grid,Typography,Chip} from '@mui/material'
import Rating from '../Home/Rating'
import Sizes from './Sizes'
import Swatches from './Swatches'
import QtyButton from './QtyButton'
import {colorIndex} from './ProductFrame'
import {getStockDisplay} from '../ProductDetail/ProductInfo'

function ProductFrameList({product,variant,res,selectedSize,sizes,setSelectedSize,selectedColor,setSelectedColor,hasStyles,hasColors,stock}) {
  const imageIndex=colorIndex(product,selectedColor,variant);
  const matchesMd=useMediaQuery(theme=>theme.breakpoints.down('md'))
  const images=imageIndex!==-1?product.node.variants[imageIndex].images:variant.images
  const url=`/${product.node.variant_2.Name.toLowerCase()}/${product.node.Name.split("_")[0].toLowerCase()}${hasStyles?`?style=${variant.style}`:''}${hasColors?`${hasStyles?'&':'?'}color=${variant.Color.split('#')[1]}`:''}`
  const selectedVariant=imageIndex===-1?product.node.variants.indexOf(variant):imageIndex
  var stockDisplay=getStockDisplay(stock,selectedVariant);
  var Name=product.node.Name.split("_")[0]
  return (
    <>
    <Grid item container 
    style={{height:"25rem",marginBottom:'5rem'}} >
        <Grid item lg={10} container alignItems='center' justifyContent='space-around'
        style={{backgroundImage:`url(${frame})`,backgroundPosition:"initial",backgroundSize:"cover",backgroundRepeat:'no-repeat',height:'25rem'}}> 
        {images.slice(0,4).map(image=>(
          <>
          <Grid item key={image.url}  component={Link} to={url} 
          style={{display:matchesMd?'none':null}}>
          <img src={`http://localhost:1337${image.url}`} alt={image.url} style={{height:'18rem',width:'18rem'}} />
          </Grid>
          <Grid item  key={1}  component={Link} to={url}>
          <img src={`http://localhost:1337${image.url}`} alt={image.url} style={{height:'18rem',width:'18rem'}} />
          </Grid>
          <Grid item key={2}  component={Link} to={url}
                 style={{display:matchesMd?'none':null}}>
          <img src={`http://localhost:1337${image.url}`} alt={image.url} style={{height:'18rem',width:'18rem'}} />
          </Grid>
          </>
        ))}
        </Grid>
        <Grid  item lg={2} container direction={matchesMd?'row':'column'} justifyContent='space-between' 
        style={{backgroundColor:'#1e90ff',width:'100%',height:matchesMd?'28rem':null,padding:'1rem'}}>
          <Grid item  component={Link} to={url}
          container direction='column'>
          <Grid item>
          <Typography variant='h4'>
          {Name}
          </Typography>
        </Grid>
        <Grid item>
          <Rating number={3.5}/>          
        </Grid>
        <Grid item>
        <Chip label={`₹${variant.Price}`}  style={{backgroundColor:"#0f5191",color:"#fff",fontWeight:500,fontSize:"1rem", fontFamily:"Montserrat"}}/>
        </Grid>
          <Grid item>
        <Typography variant='h3' style={{color:"#fff",fontSize:"1rem"}}>
          {stockDisplay}
        </Typography>
        </Grid>
          </Grid>
          <Grid item container direction='column'>
        <Sizes sizes={sizes} selectedSize={selectedSize} setSelectedSize={setSelectedSize}/>
        <Swatches colors={res} selectedColor={selectedColor} setSelectedColor={setSelectedColor}/>
           </Grid>
        <QtyButton stock={stock} selectedVariant={selectedVariant}
        name={Name} variants={product.node.variants}/>
        
        </Grid>
        </Grid>
        </>
    )
}

export default ProductFrameList