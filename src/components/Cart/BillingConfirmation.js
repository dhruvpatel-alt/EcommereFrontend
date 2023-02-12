import React from 'react'
import {Grid, Typography } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery';

function BillingConfirmation({detailValues:{name,email,phone}
    ,locationValues:{street,zip,city,state}}) {
        const fields=[{title:'Billing Info',values:{name,email,phone}},{title:'Billing Address',values:{
            address1:street ,address2:`${city}, ${state} ${zip}`
        }}]
        const matchesMd=useMediaQuery(theme=>theme.breakpoints.down('md'))

  return (
    <Grid item container justifyContent='flex-end'>
        {fields.map((field,i)=>(
            <Grid item key={field.title} style={{margin:i===1?'':'0.1rem 2rem',width:matchesMd?'9rem':null}}>
                <Typography variant='h4' alignItems='right' style={{color:'#0f5191',fontSize:'1.5rem'}}>
                    {field.title}
                </Typography>
                <Typography variant='h3' alignItems='right'  style={{fontSize:'1.25rem'}}>
                    {Object.keys(field.values).map(value=>(
                        <span>
                            {field.values[value]}
                            <br/>
                        </span>
                    ))}
                </Typography>
                </Grid>
        ))}
    </Grid>
  )
}

export default BillingConfirmation