import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {Grid,Typography,Button,IconButton,} from '@mui/material'
import { EmailPassword } from './Login'
import Field from './Field'
import accountIcon from '../../images/account.svg'
import { setSnackbar} from '../../context/actions/feedback-actions'
import CircularProgress from '@mui/material/CircularProgress'

function Reset({steps,setSelectedStep,dispatchFeedback}) {
    const [visible,setVisible]=useState(false)
    const [values,setValues]=useState({password:"",confirmation:""})
    const [errors,setErrors]=useState({})
    const [loading,setLoading]=useState(false)
    const [success, setSuccess] = useState(false)

    const {password}=EmailPassword(true,false,visible,setVisible)
    const fields={password,confirmation:{...password,placeholder:'confirm password'}}
    const handleReset=()=>{
        setLoading(true)
        var params,code;
        if (typeof window !== 'undefined') {

        params=new URLSearchParams(window.location.search)
        code=params.get("code")}
        console.log('hello from reset')
        axios.post('https://ecommerce-backend-nt72.onrender.com/api/auth/reset-password',{
            code:code,
            password:values.password,
            passwordConfirmation:values.confirmation
    },{headers:{
        'Content-Type':'application/json',
        'Accept':'application/json'
      }}).then(res=>{
        
        setLoading(false)
        dispatchFeedback(setSnackbar({status:'success',message:"Password reset Successfully"}))
    }).catch(error=>{
        const message=error.response.data.error.message ||'error'
        setLoading(false)
        dispatchFeedback(setSnackbar({status:'error',message:message}))
        console.error(error)
    })}
const disabled=Object.keys(errors).some(error=>errors[error]===true)||Object.keys(errors).length!==Object.keys(values).length||values.password!==values.confirmation
useEffect(() => {
    if(!success) return
    const timer=setTimeout(() => {
        if (typeof window !== 'undefined') {

        window.history.replaceState(null,null,window.location.pathname)}
            const login =steps.find(step=>step.label==='Login')
            setSelectedStep(steps.indexOf(login))
    }, 6000);
    return ()=> clearTimeout((timer))
  }, [success])
  return (
    <>
        <Grid item>
            <img src={accountIcon} alt='reset Password'/>
        </Grid>
        <Field fields={fields} values={values}
        setValues={setValues} errors={errors} setErrors={setErrors}/>
        <Grid item>
            <Button variant='contained' color='secondary' style={{width:'20rem',borderRadius:50,textTransform:'none',marginBottom:'4rem'}}
            onClick={handleReset} disabled={disabled}>
{loading? <CircularProgress/>: <Typography variant='h5'>
    Reset Password
</Typography>}
            </Button>
        </Grid>
    </>
  )
}

export default Reset