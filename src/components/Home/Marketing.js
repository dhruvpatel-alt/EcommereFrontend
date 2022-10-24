import React,{useState} from 'react'
import { Grid } from '@mui/material'
import Typography from '@mui/material/Typography';
import {Link} from 'gatsby'
import marketingAdornment from '../../images/marketing-adornment.svg'
import moreByUs from '../../images/more-by-us.svg';

import useMediaQuery from '@mui/material/useMediaQuery';
import store from '../../images/store.svg';
function Marketing() {
    const [isHovering1, setIsHovering1] = useState(false);
    const matchesMd=useMediaQuery(theme=>theme.breakpoints.down('md'))
    const matchesXS=useMediaQuery(theme=>theme.breakpoints.down('sm'))
    const handleMouseEnter = () => {
      setIsHovering1(true);
    };
  
    const handleMouseLeave = () => {
      setIsHovering1(false);
    };
    const buttons= [{label:'Store',icon :store,link:"/Hoodies"},{label:'More by Us',icon :moreByUs,href:'https://www.google.com'}]
  return (
    <Grid container justifyContent="space-around" style={{margin:matchesMd?'15rem 0':'9rem 0'}}>
        {buttons.map((button,i)=>(
            <Grid item key={i}>
<Grid     onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} container alignItems='center' justifyContent='CENTER' direction='column' 
 style={{backgroundImage:`url(${marketingAdornment})`,
            backgroundSize:'cover',backgroundPosition:'center',backgroundRepeat:'no-repeat',height:matchesXS?'20rem':'30rem',width:matchesXS?'20rem':'30rem'
            ,transition:'transform 0.5s ease',transform:isHovering1 ? 'scale(1.1)' :null}}
            component={button.link?Link:'a'}
            to={button.link?button.link:undefined}
            href={button.href?button.href:undefined}         >
<Grid item
>
    <img src={button.icon} alt={button.label} style={{width:matchesXS?"7rem":'auto'}}/>
                </Grid>
<Grid item>
<Typography variant='h1'>
{button.label}
</Typography>
                </Grid>
                </Grid>
                </Grid>
        ))}
    </Grid>

  )
}

export default Marketing