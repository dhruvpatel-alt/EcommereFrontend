import React,{useState} from 'react'
import {setUser} from '../../context/actions/user-actions'
import axios from 'axios';
import {Grid,Typography,Button,IconButton} from '@mui/material'
import Field from './Field'
import { EmailPassword  } from './Login';
import CircularProgress from '@mui/material/CircularProgress'
import { setSnackbar} from '../../context/actions/feedback-actions'
import useMediaQuery from '@mui/material/useMediaQuery';
import addUserIcon from '../../images/add-user.svg'
import NameAdornment from '../../images/name-adornment.js'
import forward from '../../images/forward-outline.svg'
import backward from '../../images/backwards-outline.svg'
function SignUp({steps,setSelectedStep,user,dispatchUser,dispatchFeedback,feedback}) {
const [info,setInfo]=useState(false)
const [errors, setErrors] = useState({})
const [visible,setVisible]=useState(true)

const [loading, setLoading] = useState(false)

const [values,setValues]=useState({
    email:'',
    password:'',
    name:''
})
const matchesSm=useMediaQuery(theme=>theme.breakpoints.down('sm'))
const nameField={
    name:{
        helperText:'You must enter a Name',
        placeholder:'Devil',
        startAdornment:(
    <div style={{width:matchesSm?'2rem':'3rem',padding:matchesSm?'0rem 0.5rem':'0.7rem',height:'3rem'}}><NameAdornment/></div>
        )
    }
}
const [fields, setFields] = useState(nameField)
const emailField=EmailPassword(false,false,visible,setVisible,false,false,null);

const handleNavigate=direction=>{
    if(direction==='forward'){
        setFields(emailField)
        setInfo(true)
    }else{
        if(info){
            setInfo(false)
            setFields(nameField)
        }else{
            const login=steps.find(step=>step.label==='Login')
            setSelectedStep(steps.indexOf(login))
        }    }
    }

const handleComplete=()=>{
    setLoading(true)
    axios.post(`https://ecommerce-backend-ql48.onrender.com/api/auth/local/register`,{
        username:values.name,
        email:values.email,
        password:values.password
    }).then(response=>{
        dispatchUser(setUser({...response.data.user,jwt:response.data.jwt}))
setLoading(false)
        const complete= steps.find(step=>step.label==='Complete')
        setSelectedStep(steps.indexOf(complete))
    }).catch(error=>{
        console.log(error);
        const message=error.response.data.error.message 
        dispatchFeedback(setSnackbar({status:'error',message:message}))
setLoading(false)

        console.error(error);
    })
    
}

const disabled=Object.keys(errors).some(error=>errors[error]===true)||Object.keys(errors).length!==Object.keys(values).length
    return (
        <>
        <Grid item>
            <img src={addUserIcon} alt='user icon'style={{
                width:'11rem',
                height:'10rem',
                margin:'2rem'
            }}/>
        </Grid>
        <Grid item >
    <Field fields={fields} errors={errors} setErrors={setErrors}
    values={values} setValues={setValues}/>
        </Grid>
        <Grid item>
            <Button variant='contained' color='secondary' style={{fontSize:matchesSm?'1rem':null,width:matchesSm?'15rem':null,textAlign:'center'}}
            disabled={loading||info&&disabled} component={!info&&"a"}
            href={!info&&"https://f34c-43-250-158-5.in.ngrok.io/api/connect/facebook"}
            onClick={()=>info?handleComplete():null}>
                {loading?<CircularProgress color='inherit'/>:(<Typography variant='h5' style={{textTransform:'none'}}>
                    Sign Up {!info &&'with Facebook'}
                </Typography>)}
            </Button>
        </Grid>
        <Grid item container justifyContent ='space-between'>
            <Grid item>
                <IconButton onClick={()=>handleNavigate('backward')}>
                    <img src={backward} alt='back to login'
                    style={{width:'4rem',height:'4rem'}}/>
                </IconButton>
            </Grid>
            {!info &&<Grid item>
                <IconButton onClick={()=>handleNavigate('forward')}>
                    <img src={forward} alt='continue registration'
                     style={{width:'4rem',height:'4rem'}}/>
                </IconButton>
            </Grid>}
        </Grid>
        </>
  )
}

export default SignUp