import React,{useContext,useState} from 'react'
import axios from 'axios'
import {CircularProgress, Grid,IconButton} from '@mui/material';
import BackwardOutline from '../../images/BackwardOutline.jsx'
import editIcon from '../../images/edit.svg'
import saveIcon from '../../images/save.svg'
import {FeedbackContext} from '../../context/wrappers/FeedbackWrapper'
import { setSnackbar} from '../../context/actions/feedback-actions'
import {setUser} from '../../context/actions/user-actions'
import Conformation from './Conformation.js';
import useMediaQuery from '@mui/material/useMediaQuery';

function Edit({setSelectedSetting,edit,setEdit,details,location,detailSlot,locationSlot,changesMade,user,dispatchUser,isError}) {
    const matchesMd=useMediaQuery(theme=>theme.breakpoints.down('md'))
    const {dispatchFeedback}=useContext(FeedbackContext)
    const [loading,setLoading]=useState(false)
    const [dialog,setDialog]=useState(false)
    const handleEdit=()=>{
        if(edit&&isError){
                dispatchFeedback(setSnackbar({status:'error',message:'All field must be valid before saving'}))
        }else{
        setEdit(!edit)
        const {password}=details;
        if(password!=='*********'){
            setDialog(true);
        }
        if(edit&&changesMade){
            setLoading(true);
                user.Contactinfo[detailSlot]=details
                user.locations[locationSlot]=location
            axios.put(`https://ecommerce-backend-atr1.onrender.com/users/`+`${user.id}`,{'Contactinfo':user.Contactinfo,'locations':user.locations}
            ,{headers:{
            Authorization:`Bearer ${user.jwt}`,
            'Content-Type': 'application/json'
            }}
                ).then(response=>{
                    setLoading(false)
                    dispatchFeedback(setSnackbar({status:'success',message:'Settings saved successfully'}))
                    dispatchUser(setUser({...response.data,jwt:user.jwt,onboarding:true}))
                }).catch(error=>{
                    setLoading(false);
                    console.error(error);
                    dispatchFeedback(setSnackbar({status:'error',message:'There was a problem saving your settings,please try again!'}))
                });
        }}
    }
  return (
    <Grid item container xs={12} lg={6} justifyContent='space-evenly' alignItems='center' style={{borderLeft:matchesMd?'':"4px solid #fff",height:'30rem'}}>
        <Grid item>
            <IconButton onClick={()=>setSelectedSetting(null)}>
                <span style={{height:'8rem',width:'8rem'}}>
                <BackwardOutline color="#FFF"/>
                </span>
            </IconButton>
        </Grid>
        <Grid item>
            {loading?<CircularProgress color='secondary' size='8rem'/>:(
         <IconButton disable={loading} onClick={handleEdit}>
         <img src={edit?saveIcon:editIcon} alt="Edit Settings" style={{height:'8rem',width:'8rem'}}/>
     </IconButton>
            )}

        </Grid>
        <Conformation dialog={dialog} setDialog={setDialog} user={user} dispatchFeedback={dispatchFeedback} setSnackbar={setSnackbar}/>
    </Grid>
  )
}

export default Edit