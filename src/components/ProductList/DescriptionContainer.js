import React from 'react'
import useMediaQuery from '@mui/material/useMediaQuery';
import { Grid,Button,ButtonGroup,Typography } from '@mui/material'
import ListIcon from '../../images/List.js';
import GridIcon from '../../images/Grid.js';
import background from '../../images/toolbar-background.svg'
function DescriptionContainer({name,description,layout,setLayout}) {
  const matchesMd=useMediaQuery(theme=>theme.breakpoints.down('md'))
  return (
    <Grid item container direction={matchesMd?'column':'row'} alignItems={matchesMd?'center':null}
    style={{padding:matchesMd?'3rem 0':'3rem',backgroundImage:`url(${background})`,
    backgroundSize:'cover',backgroundPosition:'center',backgroundRepeat:'no-repeat',position:'relative'}}
     justifyContent='center'>
        <Grid item style={{backgroundColor:'#1e90ff',height:'15rem',width:matchesMd?'100%':'60%',borderRadius:matchesMd?0:25,padding:'1rem'}}>
            <Typography variant="h4" paragraph gutterBottom align='center'>
                {name}
            </Typography>
            <Typography variant='body1' style={{color:'#fff',fontSize:'1.5rem'}} align='center'>
                {description}
            </Typography>
        </Grid>
        <Grid item style={{position:matchesMd?'relative':'absolute',display:matchesMd?'flex':null,right:0,ottom:0,marginRight:matchesMd?'0':'3rem',marginBottom:matchesMd?'0rem':'3rem',alignSelf:matchesMd?'end':null,marginTop:matchesMd?'1rem':null}}>
            <ButtonGroup  style={{display:matchesMd?'none':null}}>
                <Button onClick={()=>{setLayout('list'); }}
                style={{border:'2px solid #1e90ff',borderRadius:'25px 0px 0px 0px',backgroundColor:layout==='list'?'#1e90ff':null}}>
                    <ListIcon  color={layout==='list'?'#fff':'#1e90ff'}/>
                </Button>
                <Button onClick={()=>{setLayout('grid'); }}
                style={{border:'2px solid #1e90ff',borderRadius:'0px 0px 25px 0px',backgroundColor:layout==='grid'?'#1e90ff':null}}>
                    <GridIcon color={layout==='grid'?'#fff':'#1e90ff'}/>
                </Button>
            </ButtonGroup>
        </Grid>
    </Grid>
  )
}

export default DescriptionContainer