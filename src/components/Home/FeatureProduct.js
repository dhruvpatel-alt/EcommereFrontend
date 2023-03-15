import React,{useState} from 'react'
import { Link } from 'gatsby';
import Rating from './Rating'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import explore from '../../images/explore.svg'
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import frame from '../../images/product-frame-grid.svg'
import featuredAdornment from '../../images/featured-adornment.svg'
import { useStaticQuery, graphql } from "gatsby"
import useMediaQuery from '@mui/material/useMediaQuery';

function FeatureProduct() {
  const matchesMd=useMediaQuery(theme=>theme.breakpoints.down('md'))
    const [expanded,setExpanded]=useState(null)
    const data = useStaticQuery(graphql`
    query getFeature {
        allStrapiVariant(filter: {Featured: {eq: true}}) {
          nodes {
            product {
              Name
            }
            images {
              url
            }
            strapi_id
            Price
            id
          }
        }


    }
      
    `)
    

  return (
    <Grid container direction='column'
     style={{backgroundImage:`url(${featuredAdornment})`
     ,backgroundPosition:'top',backgroundSize:'cover',
     backgroundRepeat:'no-repeat'
     ,width:'100%',height:matchesMd?'220rem':"180rem",justifyContent:matchesMd?'space-between':'center',padding:"0 5rem"}}>
{data.allStrapiVariant.nodes.map((node,i)=>{
    const alignment=matchesMd?'center':i===0||i===3?'flex-start':i===1||i===4?'center':'flex-end';
    return (
 <Grid container key={node.strapi_id}  alignItems='center' justifyContent={alignment} style={{margin:'5rem 0'}}>
<IconButton style={{backgroundImage:`url(${frame})`
     ,backgroundPosition:'center',backgroundSize:'cover',
     backgroundRepeat:'no-repeat'
     ,borderRadius:0,width:matchesMd?'20rem':'25rem',height:matchesMd?'19.8rem':'24.5rem',boxSizing:'border-box'
     ,boxShadow:"5px",position:'absolute',zIndex:1}} 
     onClick={()=>expanded===i?setExpanded(null):setExpanded(i)} >
    <img  style={{height:matchesMd?'15rem':'20rem',width:matchesMd?'15rem':'20rem'}} src={`${node.images[0].url}`} alt={node.product.Name}/>
    </IconButton>     
    <Grid container direction='column' style={{backgroundColor:'#1e90ff',height:matchesMd?'15.2rem':'20rem',width:matchesMd?'19.5rem':'24.5rem',transform :(!matchesMd&&expanded)===i&&alignment==='flex-end'?'translate(-24.95rem,0px)':(!matchesMd&&expanded===i)&&(alignment==='flex-start'||alignment==='center')?'translate(24.95rem,0px)':matchesMd&&expanded===i?'translate(0,17rem)':null, transition:"transform 0.5s ease",zIndex:0,padding:"1rem 2rem"}}
 >
<Grid item>
<Typography variant='h4'>{node.product.Name.split('_')[0]}</Typography>
<Grid item>
<Rating number={4.5}/>
<Grid item>
<Chip label={`₨ ${node.Price}`} style={{backgroundColor:'#0f5191'
,fontSize:'2rem',color:'#fff',fontWeight:700, fontFamily:"Philosopher", fontStyle:"italic"}}/>
</Grid>
<Grid item style={{marginTop:'6rem'}}>
  <Button style={{textTransform:'none'}} component={Link}
    to={`/${node.product.Name.split('_')[1]}/${node.product.Name.split('_')[0]}?${node.product.Name.split('_')[1]==='hats'?'&':'style=Male&'}color=white`}>
<Typography variant='h5'>
  Details
</Typography>
<img src={explore} alt='go to product details' style={{height:'2rem',width:'2rem',marginLeft:'1rem'}}/>
  </Button>
</Grid>
</Grid>
 </Grid>
 </Grid>
 </Grid>)
})       }
    </Grid>
  )
}

export default FeatureProduct