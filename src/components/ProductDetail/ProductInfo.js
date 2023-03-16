import React,{useState,useEffect} from 'react'
import Rating from '../Home/Rating'
import Sizes from '../ProductList/Sizes'
import QtyButton from '../ProductList/QtyButton'
import Swatches from '../ProductList/Swatches'
import favourite from '../../images/favorite.svg'
import subscription from '../../images/subscription.svg'
import {Grid, Button,Typography,Chip} from '@mui/material'
import {useMediaQuery} from '@mui/material';
import { makeStyles } from "@material-ui/core/styles";
export const getStockDisplay=(stock,variant)=>{
    var qty;
    if(stock&&stock!==-1){
  
    qty =stock.data[variant].attributes.qty
}
switch(stock){
    case undefined:
    case null:
        return 'Loading Inventory...'
    case -1:
        return 'Error Loading Inventory'
    default:
        if(qty===0){
            return 'Out of Stock'
        }else{
            return `${qty} Currently in Stock`
        }
}
}
function ProductInfo({Name,Description,variants,selectedVariant,setSelectedVariant,selectedColor,setSelectedColor,imageIndex,scroll,stock}) {
    
    const useStyles = makeStyles(theme=>({
        icon:{
            height:'4rem',
            width:'4rem',
            margin:'0.5rem 1rem'
        },
    }))
    const classes=useStyles()
    const [selectedSize,setSelectedSize]=useState(variants[selectedVariant].size)
    const sizes=[]
    const colors=[]
    const matchesMd=useMediaQuery(theme=>theme.breakpoints.down('md'))
    const matchesSm=useMediaQuery(theme=>theme.breakpoints.down('sm'))
    variants.map(variant=>{
        if(variant.style===variants[selectedVariant].style){
            sizes.push(variant.size)
        }
        if(!colors.includes(variant.Color_label)&&variant.size===selectedSize
        &&variant.style===variants[selectedVariant].style){
            colors.push(variant.Color_label)
        }
        return 0
    })
    
    var stockDisplay=getStockDisplay(stock,selectedVariant);
    useEffect(() => {
        setSelectedColor(null)
        const newVariant=variants.find(variant=>variant.size===selectedSize
            &&variant.style===variants[selectedVariant].style&&variant.Color_label===
            colors[0])
            if(variants.indexOf(newVariant)!==-1){
                setSelectedVariant(variants.indexOf(newVariant))

            }
        }, [selectedSize])
        useEffect(()=>{
            const newVariant=variants.find(variant=>variant.size===selectedSize
                &&variant.style===variants[selectedVariant].style&&variant.Color_label===selectedColor)
            if(variants.indexOf(newVariant)!==-1){

            setSelectedVariant(variants.indexOf(newVariant))
            }
        },[selectedColor])
        useEffect(() => {
            setSelectedSize(variants[selectedVariant].size)
        }, [selectedVariant])
        

  return (
    <Grid item container direction='column' xs={6} justifyContent='center' alignItems='flex-end'>
        <Grid item container justifyContent='flex-end' style={{backgroundColor:'#0f5191',height:matchesSm?'46rem':'40rem',width:matchesMd?'100%':'30rem'}}>
            <Grid item>
                <img src={favourite} alt='add item to favourites' className={classes.icon}/>
            </Grid>
            <Grid item>
                <img src={subscription} alt='add item to subscription' className={classes.icon}/>
            </Grid>
        </Grid>
        <Grid item container direction='column'  style={{backgroundColor:'#1e90ff',height:matchesSm?'36rem':'30rem',width:matchesMd?'100%':'35rem',position:'absolute'}}>
            <Grid item container style={{height:'calc(100%/3)',padding:'0.5rem 1rem'}} justifyContent='space-between' direction={matchesSm?'column':'row'}>
                <Grid item>
                    <Grid container direction='column'>
                        <Grid item>
                            <Typography variant='h1' style={{color:"#fff"}} >{Name.split('_')[0]}</Typography>
                        </Grid>
                        <Grid item>
                            <Rating number={4.5}/>
                        </Grid>
                        <Grid item>
                        <Button style={{textTransform:'none'}}>
                            <Typography variant='body1' style={{color:'#fff',fontSize:'1.5rem'}}>Leave A Review  </Typography>
                        </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item style={{marginTop:'1rem'}}>
                    <Chip label={ `₹${variants[selectedVariant].Price}`} 
                    style={{backgroundColor:'#0f5191',width:matchesSm?'5rem':'8rem',height:'3rem'
                    ,fontSize:matchesSm?'1.2rem':'2rem',color:'#fff',fontWeight:700, fontStyle:"italic"}}/>
                </Grid>
            </Grid>
            <Grid item container style={{height:'calc(100%/3)',backgroundColor:'#0f5191',overflowY:'auto',padding:'0.5rem 1rem'}} >
            <Grid item>
                    <Typography variant='h5'>Description</Typography>
                    <Typography  variant='body1' style={{color:'#fff',fontSize:'1.5rem'}}>{Description}{Description}
                    {Description}{Description}{Description}{Description}{Description}{Description}
                    {Description}{Description}{Description}{Description}{Description}{Description}
                    {Description}{Description}{Description}{Description}{Description}{Description}
                    </Typography>
                </Grid>
            </Grid>
            <Grid item container style={{height:'calc(100%/3)',padding:'0 1rem'}} justifyContent={matchesSm?'space-around':'space-between'} 
            alignItems={matchesSm?'flex-start':'center'} direction={matchesSm?'column':'row'}>
           <Grid item>
            <Grid container direction='column'>
            <Grid item container style={{maxWidth:'30rem'}}>
            <Sizes sizes={sizes} selectedSize={selectedSize} setSelectedSize={setSelectedSize} scroll={scroll}/>
            <Swatches colors={colors} selectedColor={selectedColor} setSelectedColor={setSelectedColor}
  scroll={scroll}/>
            </Grid>
            <Grid item>
            <Typography variant='h3' style={{color:"#fff",fontSize:"1.5rem"}}>
          {stockDisplay}
        </Typography>
            </Grid>
            </Grid>
           </Grid>
           <Grid item>
            <QtyButton stock={stock} selectedVariant={selectedVariant}
            variants={variants} name={Name}/>
           </Grid>
            </Grid>
        </Grid>
    </Grid>
  )
}

export default ProductInfo