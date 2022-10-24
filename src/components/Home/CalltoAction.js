import React from "react"
import { Grid } from "@mui/material"
import Typography from "@mui/material/Typography"
import { Link } from "gatsby"
import Button from "@mui/material/Button"
import cta from "../../images/cta.svg"
import useMediaQuery from '@mui/material/useMediaQuery';
function CalltoAction() {
  const matchesMd=useMediaQuery(theme=>theme.breakpoints.down('md'))
  const matchesXS=useMediaQuery(theme=>theme.breakpoints.down('sm'))
  return (
    <Grid container justifyContent="space-around" alignItems='center' style={{marginBottom:'13rem',marginTop:'3rem'}} 
    direction={matchesMd?'column':'row'}>
      <Grid item >
        <img src={cta} alt="quality committed" style={{width:matchesXS?'18rem':undefined}} />
      </Grid>
      <Grid item style={{width:matchesXS?'21rem':undefined}}>
        <Grid container direction="column" >
          <Grid item>
            <Typography align={matchesMd?'center':undefined} variant="h1">Committed To Quality</Typography>
          </Grid>

          <Grid item  style={{maxWidth:'45rem',padding:matchesMd?'0 1rem':undefined}}>
            <Typography variant="body1" align={matchesMd?'center':undefined} style={{fontSize:'1.5rem'}} >
              At VAR X our mission is to provide comfortable ,durable, premium
              ,designer clothing and clothing accessories to developers and
              technology enthusiasts
            </Typography>
          </Grid>
          <Grid item container  style={{marginTop:'3rem'}}
          justifyContent={matchesMd?'center':undefined}>
            <Grid item>
              <Button variant="outlined" color="primary" component={Link} to='/Contact'>
                Contact us
              </Button>
            </Grid>
            <Grid item  >
              <Button variant="contained" color="primary" style={{color:'#fff',marginLeft:'2rem'}} component={Link} to='/Login'>
                Create Account
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default CalltoAction
