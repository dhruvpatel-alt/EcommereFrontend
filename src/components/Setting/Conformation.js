import React from 'react'
import {Dialog,DialogTitle,DialogContent,DialogContentText,DialogActions,Button,Typography} from '@mui/material'
import axios from 'axios'
import Field from '../Auth/Field'
import { EmailPassword } from '../Auth/Login'
import { CircularProgress } from '@material-ui/core'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState } from 'react'
function Conformation({dialog,setDialog,user,dispatchFeedback,setSnackbar}) {
    const matchesSm=useMediaQuery(theme=>theme.breakpoints.down('sm'))
    const [values,setValues]=useState({password:'',confirmation:''})
    const [errors,setErrors]=useState({});
    const [visible,setVisible]=useState(false)
    const [loading,setLoading]=useState(false)
    const {password}=EmailPassword(false,false,visible,setVisible);
    const fields={
        password:{...password,placeholder:'Old Password'},
        confirmation:{...password,placeholder:'New Password'}
    }
    const disabled=Object.keys(errors).some(error=>errors[error]===true)||Object.keys(errors).length!==Object.keys(values).length;
    const handleCancel=()=>{
        setDialog(false);
        dispatchFeedback(setSnackbar({status:'error',message:'Your password is not changed!'}))
    }
    const handleConfirm=()=>{
            setLoading(true);
            axios.post('https://ecommerce-back-nla0.onrender.com/api/auth/local',{
                identifier:user.email,
                password:values.password
            }).then(response=>{
                
            }).catch(error=>{
                setLoading(false);
                console.error(error);
                dispatchFeedback(setSnackbar({status:'error',message:'Old Password Invalid'}))
            })
    }
  return (
    <Dialog open={dialog} onClose={()=>setDialog(false)}>
        <DialogTitle disableTypography>
            <Typography variant='h3'
            alignItems={matchesSm?'center':null}>
                    Change Password
            </Typography>
        </DialogTitle>
        <DialogContent>
            <DialogContentText  alignItems={matchesSm?'center':null}>
                You are changing your account password,Please confirm old password and new password
            </DialogContentText>
            <Field fields={fields} values={values} setValues={setValues} errors={errors} setErrors={setErrors}/>
        </DialogContent>
        <DialogActions>
            <Button color='primary' onClick={handleCancel} style={{fontSize:matchesSm?'1rem':null}}>
                Do not Change Password
            </Button>
            <Button color='secondary' disabled={disabled} onClick={handleConfirm} style={{fontSize:matchesSm?'1rem':null}}>
                Yes,Change My Password
            </Button>
        </DialogActions>
    </Dialog>
  )
}

export default Conformation