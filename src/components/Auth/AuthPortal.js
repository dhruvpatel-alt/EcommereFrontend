import React,{useState,useContext,useEffect} from 'react'
import axios from 'axios'
import {Grid,Typography,Paper} from '@mui/material'
import Login from './Login.js'
import SignUp from './SignUp'
import Complete from './Complete'
import Reset from './Reset.js'
import {UserContext} from '../../context/wrappers/UserWrapper'
import useMediaQuery from '@mui/material/useMediaQuery';
import {FeedbackContext} from '../../context/wrappers/FeedbackWrapper'
import { setSnackbar} from '../../context/actions/feedback-actions'
import {setUser} from '../../context/actions/user-actions'

function AuthPortal() {
    const [selectedStep,setSelectedStep]=useState(0);
    const {user,defaultUser,dispatchUser}=useContext(UserContext)
    const {feedback,dispatchFeedback}=useContext(FeedbackContext)
    const steps=[{component:Login,label:"Login"},
    {component:SignUp,label:"SignUp"},
    {component:Complete,label:"Complete"},
    {component:Reset,label:"Reset"}
  ]
  useEffect(() => {
    var code='';
    var params;
    var access_token='';
    if (typeof window !== 'undefined') {

    params=new URLSearchParams(window.location.search)
    code=params.get("code")
    access_token=params.get("access_token")}
    if(code){
      const resetStep=steps.find(step=>step.label==='Reset')
      setSelectedStep(steps.indexOf(resetStep))
    }else if(access_token){
        axios.post('https://facebooklogin16o9.herokuapp.com/getuser',{
          access_token:access_token,
          url:"https://ecommerce-backend-nt72.onrender.com"
        }
      ).then(response=>{
        dispatchUser(setUser({...response.data.user,jwt:response.data.jwt,
        onboarding:true}))
        if (typeof window !== 'undefined') {

        window.history.replaceState(null,null,window.location.pathname)
      }
      }).catch(error=>{
        console.error(error)
        console.log(error);
        dispatchFeedback(setSnackbar({"status":"error",
        message:'Connecting  To Facebook failed,pls try again'}))
      })

    }
  }, [])
  const matchesMd=useMediaQuery(theme=>theme.breakpoints.down('md'))
  const matchesSm=useMediaQuery(theme=>theme.breakpoints.down('sm'))
  
  // console.log(user);
  return (
    <Grid container justifyContent="center" style={{marginBottom:'6rem'}}>
    <Grid item>
    <Paper elevation={6} style={{border:'2rem solid #0f5191',width:matchesSm?'20rem':matchesMd?'30rem':'50rem' ,height:'40rem',
     borderWidth:matchesSm?"1.5rem":"2rem",marginTop:matchesSm?'3rem':null}}
   >
        <Grid container direction='column' alignItems="center" style={{width:'100%' ,height:'40rem', border:'2rem solid #1e90ff',
         borderWidth:matchesSm?"1rem":'2rem'}}
        justifyContent='space-between'>
            {steps.map((Step,i)=>
                selectedStep===i?(
                <Step.component setSelectedStep={setSelectedStep} feedback={feedback} defaultUser={defaultUser}
                 steps={steps} key={Step.label} user={user} dispatchUser={dispatchUser}
                 dispatchFeedback={dispatchFeedback}/>
                ):null
)}
        </Grid>
    </Paper>
    </Grid>
    </Grid>
  )
}

export default AuthPortal
