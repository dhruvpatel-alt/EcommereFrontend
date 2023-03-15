import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {Grid,Typography,Button,IconButton,} from '@mui/material'
import accountIcon from '../../images/account.svg'
import EmailAdornment from '../../images/email-adornment'
import PasswordAdornment from '../../images/password-adornment.js'
import HidePassword from '../../images/hide-password.js'
import ShowPassword from '../../images/show-password.js'
import addUserIcon from '../../images/add-user.svg'
import useMediaQuery from '@mui/material/useMediaQuery';
import Field from './Field'
import forgetPasswordIcon from '../../images/forgot.svg'
import CircularProgress from '@mui/material/CircularProgress'
import close from '../../images/close.svg'
import {setUser} from '../../context/actions/user-actions'
import { setSnackbar} from '../../context/actions/feedback-actions'

export const EmailPassword=(hideEmail,hidePassword,passVisible,setPassVisible,EmailPadding,PasswordPadding,color)=>(
    {
      email:{
            helperText:'Invalid Email',
            placeholder:'xyz@gmail.com',
            type:'email',
            hidden:hideEmail,
            startAdornment:(
        <div style={{width:useMediaQuery(theme=>theme.breakpoints.down('sm'))?'2rem':'3rem',padding:useMediaQuery(theme=>theme.breakpoints.down('sm'))||EmailPadding?'0rem 0.5rem':'0.7rem',height:'3rem'}}><EmailAdornment color={color?color:null}/></div>
            )
          },
       
          password:{
            helperText:'Your password must be atleast 8 characters include one UpperCase letter,one number and one special Characters',
            placeholder:'*******',
            hidden:hidePassword,
            type:passVisible?'text':'password',
            startAdornment:(
        <div style={{width:useMediaQuery(theme=>theme.breakpoints.down('sm'))?'2rem':'3rem',padding:useMediaQuery(theme=>theme.breakpoints.down('sm'))||PasswordPadding?'0rem 0.5rem':'0 0.7rem',paddingBottom:PasswordPadding?'1rem':'3rem',height:'2rem'}}><PasswordAdornment color={color?color:null}/></div>
            ),
            endAdornment:(
              <div style={{width:'2rem',height:'2rem',cursor:'pointer'}} onClick={()=>{
              setPassVisible(!passVisible)
              }}>  
              {passVisible?<HidePassword/>:<ShowPassword/>}
              </div>
            )
          }
        }
         
)
                                                      
function Login({steps,setSelectedStep,user,dispatchUser,dispatchFeedback,feedback,defaultUser}) {
  const [visible,setVisible]=useState(false)
  const [forget,setForget]=useState(false)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [values,setValues]=useState({
    email:'',
      password:''
    })
  const fields=EmailPassword(false,forget,visible,setVisible)
  const handleLogin=()=>{
    setLoading(true)
    dispatchUser(setUser(defaultUser))
    axios.post('https://ecommerce-back-nla0.onrender.com/api/auth/local',{
      identifier:values.email,
      password:values.password
    }).then(response=>{
      dispatchUser(setUser({...response.data.user,jwt:response.data.jwt,onboarding:true}))
      setLoading(false)
    }).catch(error=>{
      var message
      console.log(error);
      if(error.response.data.error.message){
         message=error.response.data.error.message 

      }else{
        message='Unknown Error occurs Pls try again!'
      }
      dispatchFeedback(setSnackbar({status:'error',message:message}))
      setLoading(false)
      console.error(error);
    })
  }
  const handleForget=()=>{
    setLoading(true)
    axios.post('https://ecommerce-back-nla0.onrender.com/api/auth/forgot-password',{
      email:values.email
    },{headers:{
      'Content-Type':'application/json',
      'Accept':'application/json'
    }}).then(response=>{
      setSuccess(true)
      setLoading(false)
      dispatchFeedback(setSnackbar({status:'success',message:'Reset Code Sent'}))
    },error=>{
      
      const message=error.response.data.error.message 
      dispatchFeedback(setSnackbar({status:'error',message:message}))
      setLoading(false)
      console.error(error);
    })
  }
  const navigateSignUp=()=>{
    const signUp=steps.find(step=>step.label==='SignUp')
    setSelectedStep(steps.indexOf(signUp))
  }
  
const disabled=Object.keys(errors).some(error=>errors[error]===true)||Object.keys(errors).length!==Object.keys(values).length
useEffect(() => {
  if(!success) return
  const timer=setTimeout(() => {
    setForget(false)
  }, 6000);
  return ()=> clearTimeout((timer))
}, [success])
const matchesSm=useMediaQuery(theme=>theme.breakpoints.down('sm'))

  return (
    <>
    <Grid item style={{margin:'1rem 0'}}>
        <img src={accountIcon} alt='login Page' style={{width:'10rem',height:'10rem'}}/>
    </Grid>
<Field fields={fields}    errors={errors} setErrors={setErrors} values={values} setValues={setValues}/>
    <Grid item style={{marginTop:'1rem'}}>
      <Button variant='contained' disabled={loading||!forget&&disabled} color='secondary' 
      style={{backgroundColor:!forget&&disabled?'#7c7c7c':'#0f5191',textTransform:'none',borderRadius:50,width:matchesSm?'15rem':'20rem'}}
        onClick={()=>forget?handleForget():handleLogin()} >
          {loading?<CircularProgress color='inherit'/>:(
        <Typography variant='h5' >
        { forget? 'Reset Password':'Login'}
        </Typography>)}
      </Button>
    </Grid>
    { !forget? <Grid item>
      <Button disabled={loading} 
      component="a"
      href="https://ecommerce-back-nla0.onrender.com/api/connect/facebook">
        <Typography variant='h3' style={{textTransform:'none',textAlign:matchesSm?'center':null,fontSize:matchesSm?'1rem':null}}>
          Login With Facebook
        </Typography>
      </Button>
    </Grid>:null}
    <Grid item container justifyContent='space-between'>
      <Grid item>
        <IconButton onClick={navigateSignUp}>
          <img src={addUserIcon} alt='sign up'/>
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton onClick={()=>{forget?setForget(false):setForget(true)}}>
          <img src={forget?close:forgetPasswordIcon} alt='forget Password'/>
        </IconButton>
      </Grid>
    </Grid>
    </>
  )
}

export default Login