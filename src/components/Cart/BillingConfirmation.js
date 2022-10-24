import React from 'react'
import {Grid, Typography } from '@mui/material'

function BillingConfirmation({detailValues:{name,email,phone}
    ,locationValues:{street,zip,city,state}}) {
        const fields=[{title:'Billing Info',values:{name,email,phone}},{title:'Billing Address',values:{
            address1:street ,address2:`${city}, ${state} ${zip}`
        }}]
  return (
    <Grid item container justifyContent='flex-end'>
        {fields.map(field=>(
            <Grid item key={field.title} style={{margin:'0.1rem 2rem'}}>
                <Typography variant='h4' style={{color:'#0f5191',fontSize:'1.5rem'}}>
                    {field.title}
                </Typography>
                <Typography variant='h3' style={{fontSize:'1.25rem'}}>
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