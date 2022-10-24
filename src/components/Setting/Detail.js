import React,{useState,useEffect} from 'react'
import useMediaQuery from '@mui/material/useMediaQuery';
import Fields from '../Auth/Field'
import {EmailPassword} from '../Auth/Login'
import NameAdornment from '../../images/name-adornment.js'
import PhoneAdornment from '../../images/phone-adornment.js'
import fingerprint from '../../images/fingerprint.svg'
import Slot from './Slot';
import {FormControlLabel,Switch,Grid} from '@mui/material';
import { makeStyles } from "@material-ui/core/styles";

function Detail({user,edit,setChangesMade,checkout,values,setValues,slot,setSlot,errors,setErrors,billing,setBilling}) {
    const [visible,setVisible]=useState(false)
    const matchesMd=useMediaQuery(theme=>theme.breakpoints.down('md'))
    const matchesSm=useMediaQuery(theme=>theme.breakpoints.down('sm'))
    const email_password=EmailPassword(false,false,visible,setVisible,true,true,'#fff')
    const name_phone={
        name:{
            helperText:'You must enter a name',
            placeholder:'Devil',
            startAdornment:(<div style={{width:useMediaQuery(theme=>theme.breakpoints.down('sm'))?'2rem':'3rem',padding:'0 0.5rem',height:'3rem'}}>  <NameAdornment color='#FFF'/></div>)
        },
         phone:{
            helperText:'Invalid Phone No',
            placeholder:"9998887766",
            startAdornment: (<div style={{width:useMediaQuery(theme=>theme.breakpoints.down('sm'))?'2rem':'3rem',padding:'0rem 0.5rem',height:'3rem'}}>  <PhoneAdornment color='#FFF'/></div>)
          }
    }
    useEffect(() => {
      if(user.username==='Guest') return
      if(checkout) {
        setValues(user.Contactinfo[slot]);
      }
      else{
      setValues({...user.Contactinfo[slot],password:'*********'})}
    }, [slot])
    useEffect(() => {
      if(checkout) return;
      const changed=Object.keys(user.Contactinfo[slot]).some(
        field=>user.Contactinfo[slot][field]!==values[field])
        setChangesMade(changed)
    }, [values])
    
    let fields=[name_phone,email_password]
    if(checkout){
      fields=[{name:name_phone.name,email:email_password.email,phone:name_phone.phone}]
    }
    const useStyles = makeStyles(theme=>({
      switchWrapper:{
        color:'#fff'
      }
    }))
    const classes=useStyles()
  return (
    <Grid item container direction='column' xs={12} lg={6} alignItems='center' justifyContent='center' 
    style={{position:'relative',borderBottom:matchesMd?'4px solid #fff':'',height:'30rem'}}>
<Grid item style={{marginTop:matchesSm?'-2rem':undefined,marginBottom:matchesSm?'-2rem':undefined}}>
    <img src={fingerprint} alt='detail setting' style={{marginBottom:checkout?'1rem':'5rem',marginTop:checkout?'1rem':null}}/>
</Grid>
{fields.map((pair,i)=>(
<Grid container key={i} justifyContent={matchesMd?'center':'space-around'} style={{display:checkout?'grid':'flex',
flexWrap:checkout?null:'nowrap',marginBottom:matchesMd?'0':'2rem',
marginTop:(i===0&&matchesMd)?'-2rem':0}}
direction={matchesMd?'column':'row'} alignItems={matchesMd?'center':undefined}>
    <Fields fields={pair} values={values} setValues={setValues} errors={errors} setErrors={setErrors}
    width={'20rem'} disabled={checkout?false:!edit} inDetail={true}/>
    </Grid>
))}
<Grid container style={{marginLeft:checkout?'0':'1rem',marginBottom:checkout?'0rem':'1rem',position:'absolute',bottom:'0'}}
justifyContent={checkout?'space-between':null}>
<Slot slot={slot} setSlot={setSlot} checkout={checkout}/>  
{checkout&&(<Grid item>
  <FormControlLabel control={<Switch checked={billing} onChange={()=>setBilling(!billing)} 
  color='secondary'/>} labelPlacement='top' label='Billing' classes={{label:classes.switchWrapper}}/>
</Grid>)}
</Grid>
    </Grid>
  )
}

export default Detail