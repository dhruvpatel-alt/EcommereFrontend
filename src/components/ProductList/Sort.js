import React from 'react'
import close from '../../images/close-outline.svg'
import { Grid,IconButton } from '@mui/material'
import sort from '../../images/sort.svg'
import { Chip } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';


function Sort({setOption,sortOptions,setSortOptions}) {
  const matchesMd=useMediaQuery(theme=>theme.breakpoints.down('md'))
  const handleSort=i=>{
    const newOptions=[...sortOptions]
    newOptions.map(option=>option.active=false)
    newOptions[i].active=true
    setSortOptions(newOptions)
  }
  return (
    <Grid item container justifyContent='space-between' alignItems='center'>
        <Grid item>
            <IconButton  onClick={()=>setOption(null)}>
                <img src={sort} alt='sort'/>
            </IconButton>
        </Grid>
        <Grid item xs>
        <Grid container justifyContent='space-around'>
        {sortOptions.map((option,i)=>(
            <Grid item key={option.label}>
                <Chip label={option.label} onClick={()=>handleSort(i)}
                style={{backgroundColor:option.active!==true?'transparent':"#0f5191",color:"#fff",fontWeight:500,fontSize:"1.5rem", fontFamily:"Montserrat",margin:matchesMd?'0.5rem':null}}/>
            </Grid>
        ))}
        </Grid>
        </Grid>        
        <Grid item>
            <IconButton onClick={()=>setOption(null)}>
                <img src={close} alt="close"/>
            </IconButton>
        </Grid>
    </Grid>

  )
}

export default Sort