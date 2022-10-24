import React,{useState,useContext} from 'react';
import axios from 'axios'
import {FeedbackContext} from '../../context/wrappers/FeedbackWrapper'
import {UserContext} from '../../context/wrappers/UserWrapper'
import { setSnackbar} from '../../context/actions/feedback-actions'
import {setUser} from '../../context/actions/user-actions'

import { Grid,Button,CircularProgress,Typography } from '@material-ui/core'
import save from '../../images/save.svg'
import Delete from '../../images/Delete.jsx'
import { IconButton } from '@mui/material';
function CheckOutNavigation({steps,selectedStep,setSelectedStep,detailValues,locationValues,locationSlot,detailSlot}) {
    const [loading,setLoading]=useState(null)
    const {dispatchFeedback}=useContext(FeedbackContext)
    const {user,dispatchUser}=useContext(UserContext)
    const handleAction=action=>{
        if(steps[selectedStep].error&&action!=='delete'){
            dispatchFeedback(setSnackbar({status:'error',message:'All fields must be valid before saving'}))
            return 
        }
        setLoading(action)
        const isDetails=steps[selectedStep].title==='Contact Info';
        const isLocation=steps[selectedStep].title==='Address';
        if(action==='delete'){

            isDetails&&(user.Contactinfo[detailSlot]={ name: "",
            email: "",
            phone: "",
            password: "*********"})
            isLocation&&(user.locations[locationSlot]={ zip: "",
            city: "",
            state: "",
            street: ""})
        }
        else{
            isDetails&&(user.Contactinfo[detailSlot]=detailValues)
            isLocation&&(user.locations[locationSlot]=locationValues)
        }
         axios.put('http://localhost:1337/api/users/'+`${user.id}`,{'Contactinfo':user.Contactinfo,'locations':user.locations}
            ,{headers:{
            Authorization:`Bearer ${user.jwt}`,
            'Content-Type': 'application/json'
            }}
                ).then(response=>{
                    setLoading(false)
                    dispatchFeedback(setSnackbar({status:'success',message:`Information ${action==='save'?'saved': 'deleted'} successfully`}))
                    dispatchUser(setUser({...response.data,jwt:user.jwt,onboarding:true}))
                }).catch(error=>{
                    setLoading(false);
                    console.error(error);
                    dispatchFeedback(setSnackbar({status:'error',message:`There was a problem ${action==='save'?'saving': 'deleting'} your informations,please try again!`}))
                });    }
  return (
    <Grid item container justifyContent='center' alignItems='center' style={{backgroundColor:'#0f5191',width:'40rem',height:'5rem'
    ,position:'relative'}}>
        <Grid item>
            <Button onClick={()=>{setSelectedStep(selectedStep-1)}}
            disabled={selectedStep===0||selectedStep===steps.length-1}>
            <Typography variant="h5" style={{color:'#fff',visibility:selectedStep===0||selectedStep===steps.length-1?'hidden':'visible'}}
            >
                {"<"}
            </Typography>
            </Button>
        </Grid>
        <Grid item>
            <Typography variant="h5" style={{color:'#fff'}}>
                {steps[selectedStep].title.toUpperCase()}
            </Typography>
        </Grid>
        <Grid item>
            <Button onClick={()=>{
                if(!steps[selectedStep].error)
                setSelectedStep(selectedStep+1)
            }}
            disabled={steps[selectedStep].error}>
            <Typography variant="h5" style={{color:steps[selectedStep].error?'red':'#fff',visibility:selectedStep>=steps.length-2?'hidden':'visible'}}>
                {">"}
            </Typography>
            </Button>
        </Grid>
        <Grid item style={{position:'absolute',right:0}}>
            {steps[selectedStep].hasActions&&user.username!=='Guest'&&
            
            <Grid container>
            <Grid item>
                {loading==='save'?<CircularProgress/>:
                <IconButton style={{height:'2.25rem',width:'2.25rem'}}
                onClick={()=>handleAction("save")}>
                <img src={save} alt='save' style={{height:'2.25rem',width:'2.25rem'}}/>
                </IconButton>}
            </Grid>
            <Grid item style={{height:'2.25rem',width:'2.25rem',marginLeft:'10px'}}>
            {loading==='delete'?<CircularProgress/>:

                <IconButton style={{height:'2.25rem',width:'2.25rem'}}
                onClick={()=>handleAction("delete")}>
                    <span style={{height:'2rem',width:'2rem'}}>
                <Delete color='#fff'/>
                    </span>
                </IconButton>}
            </Grid>
            </Grid>}
        </Grid>
    </Grid>
  )
}

export default CheckOutNavigation