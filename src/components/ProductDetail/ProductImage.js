import React from 'react'
import {useMediaQuery} from '@mui/material';
import {Grid,IconButton} from '@mui/material'
import { makeStyles } from "@material-ui/core/styles";

function ProductImage({images,selectedImage,setSelectedImage}) {
  const matchesSm=useMediaQuery(theme=>theme.breakpoints.down('sm'))
  const useStyles = makeStyles(theme=>({
    selected:{
      height:matchesSm?'23rem':'30rem',
      width:matchesSm?'22rem':'30rem'
    },
    small:{
      height:'5rem',
      width:'5rem'
    },
  }))
  const classes=useStyles()
  return (
    <Grid item container direction='column' alignItems='center'  xs={6} > 
      <Grid item >
        <img src={`${images[selectedImage].url}`} alt='product_large' className={classes.selected}/>
        </Grid>
        <Grid item container justifyContent='center' >
          {images.map((image,i)=>(
       <Grid item  key={`${image.url}1`}  style={{margin:'1rem'}}  >
        <IconButton onClick={()=>setSelectedImage(i)}>
        <img src={`${image.url}`} alt={`product_small${i}`} className={classes.small}/>
        </IconButton>
        </Grid>
          ))}
        </Grid>
    </Grid>
  )
}

export default ProductImage