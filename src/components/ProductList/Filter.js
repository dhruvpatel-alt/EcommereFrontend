import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from '@mui/material/useMediaQuery';
import close from '../../images/close-outline.svg'
import { Grid,IconButton } from '@mui/material'
import filter from '../../images/filter.svg'
import { Chip } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import PriceSlider from './PriceSlider';


function Filter({setOption,filterOptions,setFilterOptions,price,setPriceRange,priceRange}) {
  const matchesSm=useMediaQuery(theme=>theme.breakpoints.down('sm'))
  const useStyles = makeStyles(theme=>({

    label: {
      color: "#fff",
      fontSize:'1.5rem',
      [theme.breakpoints.down('sm')]:{
        fontSize:'1rem'
      }
    }
  }));
    const handleFilter=(option,i)=>{
        const newFilters={...filterOptions}
        newFilters[option][i].checked=!newFilters[option][i].checked
        setFilterOptions(newFilters)
    }
  const classes = useStyles();
  return (
    <Grid item container justifyContent='space-between' alignItems='center'
    style={{padding :'1rem 0'}}>
        <Grid item>
            <IconButton  onClick={()=>setOption(null)}>
                <img src={filter} alt='filter'/>
            </IconButton>
        </Grid>
        <Grid item xs>
        <Grid container justifyContent='space-around'>
        {Object.keys(filterOptions).filter(option=>filterOptions[option]!==null).map(option=>(
            <Grid item key={option}>
                <Grid container direction='column'>
                    <Grid item>
                <Chip label={option} style={{backgroundColor:"#0f5191",color:"#fff",fontWeight:500,fontSize:matchesSm?'1rem':"1.5rem", fontFamily:"Montserrat"}}/>
            </Grid>
            <Grid item>
                <FormControl>
                    <FormGroup>
                        {filterOptions[option].map(({label,checked},i)=>(
                            <FormControlLabel id='filterLabel' key={label} label={label}    classes={ {label:classes.label}}
                            control={<Checkbox checked={checked} style={{color:'#fff'}} onChange={()=>handleFilter(option,i)}
                               />}/>
                        ))}
                    </FormGroup>
                </FormControl>
            </Grid>
            </Grid>
            </Grid>
        ))}
        {!price.every( (val, i, arr) => val === arr[0] )&&<PriceSlider price={price}
        priceRange={priceRange} setPriceRange={setPriceRange}   />}
        </Grid>
        </Grid>        
        <Grid item>
            <IconButton onClick={()=>setOption(null)}>
                <img src={close} alt="close"/>
            </IconButton>
        </Grid>
    </Grid>

  )
}

export default Filter;