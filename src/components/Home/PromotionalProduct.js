import React, { useState } from 'react'
import { Button } from '@mui/material';
import {Link} from 'gatsby'
import Grid from '@mui/material/Grid';
import Carousel from 'react-spring-3d-carousel';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useStaticQuery, graphql } from "gatsby"
import promoAdornment from '../../images/promo-adornment.svg';
import explore from '../../images/explore.svg';
import useMediaQuery from '@mui/material/useMediaQuery';

function PromotionalProduct() {
    const [selectedSlides,setSelectedSlides]=useState(0);
    var slides=[];
    const matchesMd=useMediaQuery(theme=>theme.breakpoints.down('md'))
    const matchesLG=useMediaQuery(theme=>theme.breakpoints.down('lg'))
    const matchesXS=useMediaQuery(theme=>theme.breakpoints.down('sm'))
    const data = useStaticQuery(graphql`
    query getpromo {
        allStrapiVariant(filter: {Promo: {eq: true}}) {
            nodes {
              product {
                Name
                Description
              }
              id
              images {
                url
              }
            }
          }
      }
    `)
  data.allStrapiVariant.nodes.map((node,i)=>slides.push({
    key:i,
    content:(<Grid container direction='column' >
    <Grid item>
        <IconButton disableRipple onClick={()=>setSelectedSlides(i)}>
        <img style={{width:matchesXS?'13rem':matchesMd?'20rem':'30rem',height:matchesXS?'15rem':matchesMd?'20rem':'25rem',backgroundColor:"#fff",borderRadius:20,boxShadow:'5px'}} src={`http://localhost:1337${node.images[0].url}`} alt={node.product.Name}/>        </IconButton>
    </Grid>
</Grid>)  ,
   description:node.product.Description
  }))
 
  return (
    <Grid direction={matchesMd?'column':'row'} container justifyContent={matchesMd?"space-around":"space-between"} alignItems="center" style={{backgroundImage:`url(${promoAdornment})`,backgroundPosition:'top',backgroundSize:'cover',backgroundCover:"no-repeat",width:'100%',height:"70rem",
    padding:matchesXS?"30rem 0rem 10rem":matchesMd?'30rem 5rem 10rem':'30rem 10rem 10rem'}}>
        <Grid item style={{width:matchesXS?'22rem':matchesMd?'35rem':'50rem'}}>
        <Carousel slides={slides} goToSlide={selectedSlides}  / >     
        </Grid>
        <Grid item style={{textAlign:matchesLG?'center':'right',width:matchesXS?'22rem':'24rem',marginTop:matchesLG?'12rem':matchesMd?'14rem':'0'}}>
            <Typography variant='h4'>
          {slides[selectedSlides].description}
            </Typography>
            <Button component={Link} to='/Product'>
                <Typography variant='h4' style={{textTransform:'none',marginRight:'1rem'}}>
                    Explore
                </Typography>
                <img src={explore} alt="go to product page"/>
            </Button>
        </Grid>
    </Grid>

  )
}

export default PromotionalProduct