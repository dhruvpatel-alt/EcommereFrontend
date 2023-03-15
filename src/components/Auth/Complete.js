import React,{useEffect} from 'react'
import { Link } from 'gatsby'
import {Grid,Typography,Button,IconButton} from '@mui/material'
import checkmark from '../../images/checkmark-outline.svg'
import forward from '../../images/forward-outline.svg'
import {setUser} from '../../context/actions/user-actions'
function Complete({user,dispatchUser}) {
    useEffect(() => {
        return ()=>{
            dispatchUser(setUser({...user,onboarding:true}))
        }
    }, [])
  return (
    <>
    <Grid item container direction='column' alignItems='center' 
    style={{marginTop:'10rem'}}>
    <Grid item>
        <img src={checkmark} alt='sign up finished'/>
    </Grid>
    <Grid item>
        <Typography variant='h3' style={{color:'#0f5191',fontWeight:'700'}}>
            Account Created!
        </Typography>
    </Grid>
    </Grid>
            <Grid item container justifyContent='flex-end'>
                <Grid item style={{marginBottom:'1rem',marginRight:'1rem'}}>
                    <Link to='/'>
                <Button>
                    <Typography variant='h3' 
                     style={{textTransform:'none',color:'#0f5191',fontWeight:'700'}}>
                        Shop
                    </Typography>
                    <img src={forward} alt='browse product'
                    style={{marginLeft:'1rem'}}/>
                </Button>
                    </Link>
                    </Grid>
            </Grid>
    </>
  )
}

export default Complete