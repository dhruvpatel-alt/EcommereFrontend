import React,{useState} from 'react'
import { navigate} from 'gatsby'
import { Grid,Typography } from '@mui/material'
import frame from '../../images/product-frame-grid.svg'
import useMediaQuery from '@mui/material/useMediaQuery';
import QuickView from './QuickView'
export const colorIndex=(product,color,variant)=>{
    return product.node.variants.indexOf(product.node.variants.filter(item=>item.Color===color
        &&variant.style===item.style&&item.size===variant.size)[0])
}
function ProductFrame({variant,product,res,selectedSize,sizes,setSelectedSize,selectedColor,setSelectedColor,hasStyles,hasColors,stock}) {
    const [open,setOpen]=useState(false)

  const matchesMd=useMediaQuery(theme=>theme.breakpoints.down('md'))
    const imageIndex=colorIndex(product,selectedColor,variant)
    console.log(product.node)
    const imgUrl=''+(imageIndex!==-1?product.node.variants[imageIndex].images[0].url:variant.images[0].url)
  const url=`/${product.node.variant_2.Name.toLowerCase()}/${product.node.Name.split("_")[0].toLowerCase()}${hasStyles?`?style=${variant.style}`:''}${hasColors?`${hasStyles?'&':'?'}color=${variant.Color_label}`:''}`

  return (
    <Grid item style={{visibility:open?'hidden':null}} >
        <Grid container direction='column' onClick={()=>{matchesMd?navigate(url):setOpen(true)}} >
            <Grid item 
            style={{backgroundImage:`url(${frame})`,backgroundPosition:'center',backgroundSize:'contain',backgroundRepeat:'no-repeat',width:matchesMd?'22rem':'25rem',height:'25rem',marginBottom:'5rem'
        ,display:'flex',justifyContent:'center',alignItems:'center'}}>
                <img src={`${variant.images[0].url}`} alt={product.node.Name} style={{height:'20rem',width:'20rem'}} />
            </Grid>
            <Grid item style={{backgroundColor:'#1e90ff',height:'5rem',width:matchesMd?'22rem':'25rem',marginTop:matchesMd?'-6.7rem':'-5.2rem',marginBottom:'5rem',display:'flex',justifyContent:'center',alignItems:'center'}}>
                <Typography variant='h5'>
                    {product.node.Name.split("_")[0]}
                </Typography>
            </Grid>
        </Grid>
        <QuickView variant={variant} hasStyles={hasStyles} hasColors={hasColors} stock={stock} imageIndex={imageIndex}
        open={open} setOpen={setOpen} url={imgUrl} name={product.node.Name.split("_")[0]} price={variant.Price} product={product}
        res={res} sizes={sizes} setSelectedColor={setSelectedColor} selectedColor={selectedColor} selectedSize={selectedSize} setSelectedSize={setSelectedSize}/>
    </Grid>
  )
}

export default ProductFrame