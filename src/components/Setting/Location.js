import React,{useState,useEffect,useContext} from 'react'
import useMediaQuery from '@mui/material/useMediaQuery';
import { FeedbackContext } from '../../context/wrappers/FeedbackWrapper';
import { setSnackbar } from '../../context/actions/feedback-actions';
import {CircularProgress} from '@mui/material';
import axios from 'axios';
import {FormControlLabel,Switch,Grid,Chip} from '@mui/material';

import locationicon from '../../images/location.svg'
import streetAdornment from '../../images/street-adornment.svg'
import zipAdornment from '../../images/zip-adornment.svg'
import Fields from '../auth/Field'
import Slot from './Slot';
function Location({user,edit,setChangesMade,values,setValues,slot,setSlot,errors,setErrors,checkout,billing,setBilling}) {
    const matchesMd=useMediaQuery(theme=>theme.breakpoints.down('md'))
    const [loading,setLoading]=useState(false);
    const {dispatchFeedback}=useContext(FeedbackContext)
    const fields={
        street:{
            placeholder:'Street',
            helperText:'invalid address',
            startAdornment:<img src={streetAdornment} alt='street' style={{width:useMediaQuery(theme=>theme.breakpoints.down('sm'))?'2rem':'3rem',padding:'0 0.5rem',height:'3rem'}}/>
        },
        zip:{
            placeholder:'ZipCode',
            helperText:'invalid zip code',
            startAdornment:<img src={zipAdornment} alt='zip code' style={{width:useMediaQuery(theme=>theme.breakpoints.down('sm'))?'2rem':'3rem',padding:'0 0.5rem',height:'3rem'}}/>
        }
    }
    const getLocation=()=>{
        setLoading(true);
        
        axios.post('https://get-citydata.herokuapp.com/getcode',{
            pincode:values.zip
        },{headers:{
            'Content-Type':'application/json',
            'Accept':'application/json'
          }}).then(response=>{
            setLoading(false);
            if(response.data.zip==='not found'){
                dispatchFeedback(setSnackbar({status:'error',message:'City and State corresponding to this zip code was not found ,pls try again!'}))
            }else{
            const {city,state}=response.data
            // console.log(city,state)
            setValues({...values,city:city,state:state})}
        }).catch(error=>{
            setLoading(false);
            dispatchFeedback(setSnackbar({status:'error',message:'There was problem detecting the city and state'}))
            console.error(error);
            
        })
    }
useEffect(() => {
    if(user.username==='Guest') return

    setValues(user.locations[slot])
}, [slot])

useEffect(() => {
    if(!checkout) {
    const changed=Object.keys(user.locations[slot]).some(
      field=>user.locations[slot][field]!==values[field])
      setChangesMade(changed)}
      if(values.zip.length===6){
        if(values.city) return;
        getLocation();
      }else if(values.zip.length<6 && values.city){
        setValues({...values,city:'',state:''})
      }
  }, [values])
  return (
    <Grid item container direction='column' xs={12} lg={6} alignItems='center'
    justifyContent='center' style={{position:'relative',borderBottom:matchesMd?'4px solid #fff':'',height:'30rem'}}>
        <Grid item >
            <img src={locationicon} alt='location setting' style={{marginTop:checkout?'1rem':null}}/>
        </Grid>
        <Grid item container direction='column'  alignItems='center' style={{marginTop:"3rem"}}>
            <Fields fields={fields} values={values} setValues={setValues} marginBottom={"2rem"}
            errors={errors} setErrors={setErrors} disabled={checkout?false:!edit}/>
        </Grid>
        <Grid item>
            { loading?<CircularProgress color='secondary'/>:<Chip label={values.city?`${values.city} ${values.state}`:"City,State"} style={{backgroundColor:'#0f5191'
,fontSize:matchesMd?'1.25rem':'2rem',color:'#fff',fontWeight:700, fontFamily:"Philosopher", fontStyle:"italic",marginBottom:'3rem'}}/>}
        </Grid>
        <Grid item container style={{marginLeft:checkout?'':'1rem',marginBottom:checkout?'5px':'1rem',position:'absolute',bottom:checkout?'-8px':'0'}}
        justifyContent={checkout?'space-between':null}>
            <Slot slot={slot} setSlot={setSlot} checkout={checkout}/>
            {checkout&&(<Grid item>
  <FormControlLabel control={<Switch checked={billing} onChange={()=>setBilling(!billing)} 
  color='secondary'/>} labelPlacement='top' label='Billing' />
</Grid>)}
        </Grid>
    </Grid>
  )
}


export default Location