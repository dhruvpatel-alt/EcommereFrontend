import React,{useState,useEffect,useContext} from 'react'
import {Grid} from '@mui/material'
import Detail from './Detail'
import Payment from './Payment'
import Location from './Location'
import Edit from './Edit'
import {UserContext} from '../../context/wrappers/UserWrapper'

function Setting({setSelectedSetting}) {
  
  const {user,dispatchUser}=useContext(UserContext)
  const [edit,setEdit]=useState(false)
  const [detailValues,setDetailValues]=useState({name:"",phone:"",email:"",password:""})
  const [detailSlot,setDetailSlot]=useState(0)
  const [detailErrors,setDetailErrors]=useState({})
  const [locationErrors,setLocationErrors]=useState({})
  const [locationSlot,setLocationSlot]=useState(0)
  const [changesMade,setChangesMade]=useState(false)
  const [slot,setSlot]=useState(0)
  const [locationValues,setLocationValues]=useState({street:"",zip:"",city:"",state:""});
  const allErrors={...detailErrors,...locationErrors}
  const isError=Object.keys(allErrors).some(error=>allErrors[error]===true)
  useEffect(() => {
    setDetailErrors({})
  }, [detailSlot])
  
  useEffect(() => {
    setLocationErrors({})
  }, [locationSlot])
  
  return (
    <>
    <Grid container style={{height:"50%"}}> 
      <Detail user={user} edit={edit} setChangesMade={setChangesMade} setSlot={setDetailSlot}
      values={detailValues} setValues={setDetailValues} slot={detailSlot} errors={detailErrors} 
      setErrors={setDetailErrors}/>
      <Payment user={user} edit={edit} slot={slot} setSlot={setSlot}/>
    </Grid>
    <Grid container style={{borderTop:"4px solid #fff",height:'50%'}}>
      <Location  user={user} edit={edit} setChangesMade={setChangesMade} errors={locationErrors} setErrors={setLocationErrors}
      values={locationValues} setValues={setLocationValues} slot={locationSlot} setSlot={setLocationSlot}/>
      <Edit setSelectedSetting={setSelectedSetting} edit={edit}
       user={user} setEdit={setEdit} changesMade={changesMade}  isError={isError}
       detailSlot={detailSlot} locationSlot={locationSlot} dispatchUser={dispatchUser}
       details={detailValues} location={locationValues}/>
    </Grid>
    </>
  )
}

export default Setting