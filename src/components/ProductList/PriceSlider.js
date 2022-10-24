import * as React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { makeStyles } from "@material-ui/core/styles";
import {Grid,Chip} from '@mui/material'
function valuetext(value) {
  return `$${value}`;
}

export default function PriceSlider({price,priceRange,setPriceRange}) {
  const useStyles = makeStyles(theme=>({

    marked: {
      color: "#fff",
      fontSize:'1.5rem',
      [theme.breakpoints.down('sm')]:{
        fontSize:'1rem'
      }
    }
  }));
  const matchesSm=useMediaQuery(theme=>theme.breakpoints.down('sm'))
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setPriceRange(newValue);
  };
  const marks = [];
  var minPrice=Math.min(...price)
  var maxPrice=Math.max(...price)
  var step=100
  var Price=minPrice
  while(Price!==maxPrice){
    marks.push({
      value:Price,label:Price.toString()})
    Price=Price+step;
  }
  return (
<Grid item style={{width:matchesSm?'100%':'50%'}}>
    <Chip label='Price' style={{backgroundColor:"#0f5191",color:"#fff",fontWeight:500,fontSize:matchesSm?'1rem':"1.5rem", fontFamily:"Montserrat"}}/>
    <Box >
      <Slider
       classes={ {markLabel:classes.marked}}
        getAriaLabel={() => 'Price range'}
        value={priceRange}
        onChange={handleChange}
        min={minPrice}
        max={maxPrice}
        valueLabelDisplay="auto"
        color='secondary'
        step={step}
        marks={marks}
        getAriaValueText={valuetext}
      />
    </Box>
        </Grid>
  );
}
