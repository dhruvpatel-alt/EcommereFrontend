import React from 'react'
import useMediaQuery from '@mui/material/useMediaQuery';

import validate from '../ui/validate'

import {Grid,Box,TextField,InputAdornment,Button,Chip} from '@mui/material'


function Field({fields,errors,setErrors,values,isPromo,setValues,inDetail,width,marginBottom,disabled}) {
  const matchesXS=useMediaQuery(theme=>theme.breakpoints.down('sm'))
  const allErrorEqual=(obj) =>{
    return new Set(Object.values(obj)).size === 1;
  }
  return  Object.keys(fields).map(field=>{
    const validateHelper=event=>{
      const valid=validate({[field]:event.target.value})
      setErrors({...errors,[field]:!valid[field]})
    }
    return !fields[field].hidden?(
      
      <Grid item  key={field} style={{marginBottom:marginBottom?"2rem":allErrorEqual(errors)?'0rem':'1rem',width:width||null}}>
  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
  {fields[field].startAdornment}
  <TextField value={values[field]} onChange={e=>{
            if(errors[field]){
              validateHelper(e)
          } setValues({...values,[field]:e.target.value})
        }} 
          
          label={field.charAt(0).toUpperCase() + field.slice(1)} 
    style={{width:isPromo?'10rem':matchesXS?'15rem':'30rem',marginBottom:'0rem',backgroundColor:'#FFF',
    marginLeft:isPromo?'1rem':''}}
    id="filled-basic"  variant="filled" color="primary" type={fields[field].type}
    placeholder={fields[field].placeholder}
    onBlur={e=>validateHelper(e)} disabled={disabled}
          error={errors[field]} helperText={errors[field]&&fields[field].helperText}
    InputProps={{
      endAdornment:fields[field].endAdornment?
      (<InputAdornment>
      {fields[field].endAdornment}
      </InputAdornment>):undefined
    }}    
    />
  </Box>
  </Grid>
    ):null})}


export default Field