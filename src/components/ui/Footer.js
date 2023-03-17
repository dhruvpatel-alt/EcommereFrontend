import React from 'react'
import {Link} from 'gatsby'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import facebook from '../../images/facebook.svg';
import twitter from '../../images/twitter.svg';
import instagram from '../../images/instagram.svg';
import Theme from './Theme'
function Footer() {
   const socialMedia=[{icon:facebook,alt:'facebook',link:'https://facebook.com'},{icon:twitter,alt:'twitter',link:'https://twitter.com'},{icon:instagram,alt:'instagram',link:'https://instagram.com'}]
   const routes={
    "Contact Us":[{label:"(+91) 9157832159",href:'tel:(+91) 9157832159'},{label:"varx4coder@gmail.com",href:'mailto:varx4coder@gmail.com'}],
    "Customer Service":[{label:"Contact us ",link:'/Contact'},{label:"My account",link:'/Account'}],
    "Information":[{label:"Privacy Policy",link:'/Privacy'},{label:"Terms and Condition",link:'/TermCondition'}],
    
   
   }
  return (
    <footer style={{backgroundColor:Theme.palette.primary.main,padding:"2rem"}}>
        <Grid container style={{justifyContent:"space-between"}}>
            <Grid item>
            <Grid container>
           {Object.keys(routes).map(category=>(
                <Grid key={category} item container direction="column" style={{width:"20rem"}}>
                <Grid item>
<Typography variant="h5">{category}</Typography>
                    </Grid>
               {routes[category].map(route=>(
                    <Grid item key={route.label}>
    <Typography component={route.link?Link:"a"} to={route.link?route.link:undefined} href={route.href?route.href:undefined} variant="body1" style={{color:"#fff",fontSize:"1.25rem"}}>{route.label}</Typography>
                        </Grid>
               ))}
            </Grid>))}
            </Grid>
            </Grid>
                <Grid item >
            <Grid className='handlemediaquery' container direction={typeof window==='undefined'?'column':window.innerWidth>768?'column':'row'} alignItems="center">
                {socialMedia.map(platform=>(
            <Grid item key={platform.alt} > 
                    <IconButton component="a" href={platform.link}>
                <img src={platform.icon} alt={platform.alt}/>
                </IconButton>
            </Grid>
                ))}
            </Grid>
                </Grid>
        </Grid>
    </footer>
  )
}

export default Footer