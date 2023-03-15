import React,{useEffect,useState} from 'react'
import useMediaQuery from '@mui/material/useMediaQuery';
import { Grid} from '@mui/material'
import { useQuery } from "@apollo/react-hooks";
import GET_DETAILS from '../../templates/Query'
import ProductFrame from './ProductFrame'
import ProductFrameList from './ProductFrameList'
import ProductNotFound from './ProductNotFound';
function ListOfProduct({products,layout,page,productsPerPage,content,sortOptions}) {
  const matchesMd=useMediaQuery(theme=>theme.breakpoints.down('md'))
  const matchesSm=useMediaQuery(theme=>theme.breakpoints.down('sm'))
  const selectedSort=sortOptions.filter(option=>option.active)[0]
  var sortedcontent=content
  if(!selectedSort.label.includes('-')){
    sortedcontent=selectedSort.function(content)
  }
  const FrameHelper=({Frame,product,variant})=>{
    var sizes=[]
    var colors=[]
    var res=[]
    const [selectedSize,setSelectedSize]=useState(null)
    const [selectedVariant,setSelectedVariant]=useState(null)
    const [selectedColor,setSelectedColor]=useState(null)
    product.node.variants.map(item=>{
      if(item.style===variant.style){
        sizes.push(item.size)
      }
      if(!colors.includes(item.Color_label)&&item.size===(selectedSize||variant.size)
      &&item.style===variant.style){
          colors.push(item.Color_label)
      }
    })
      for (let i = colors.length; i--;){
        if (res.indexOf(colors[i]) < 0) {
          res.push(colors[i]);
        };
      }
      const hasStyles=product.node.variants.some(variant=>variant.style!==null)
      const hasColors=product.node.variants.some(variant=>variant.Color_label!==null)
      useEffect(() => {
        if(selectedSize===null)return undefined;
        setSelectedColor(null)
        const newVariant=product.node.variants.find(item=>item.size===selectedSize
            &&item.style===variant.style&&item.Color_label===
            colors[0])
            setSelectedVariant(newVariant)
    }, [selectedSize])
      const { data, loading, error } = useQuery(GET_DETAILS, {
        variables: { id: product.node.strapi_id }
      
    });
    const [stock,setStock]=useState(null);
    useEffect(() => {
      if(error){
        setStock(-1)
      }else if(data){
        setStock(data.products.data[0].attributes.variants)
      }
    }, [error,data])
      return (
        <Frame variant={selectedVariant||variant} product={product} res={res} stock={stock}
        sizes={sizes} setSelectedColor={setSelectedColor}  hasStyles={hasStyles}
    selectedColor={selectedColor} selectedSize={selectedSize||variant.size} setSelectedSize={setSelectedSize} hasColors={hasColors}/>
    )
  }
  
  return (
    <Grid item container justifyContent={matchesMd?'center':'space-between'} style={{width:matchesMd?'100%':'95%'}} alignItems='center'> 
    { sortedcontent.length<=0&& <ProductNotFound/>}
        {sortedcontent.slice((page-1)*productsPerPage,page*productsPerPage).map(item=>( 
                <FrameHelper  Frame={ !matchesSm&&layout==='list'?ProductFrameList:ProductFrame}
                key={item.variant.id} variant={item.variant} product={products[item.product]}/>
            ))} 
    </Grid>
  )
}

export default ListOfProduct