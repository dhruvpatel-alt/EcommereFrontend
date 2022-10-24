import React,{useState,useRef,useEffect} from 'react'
import { graphql } from 'gatsby';
import {Pagination} from '@mui/material';
import Layout from '../components/ui/Layout';
import { Grid,Fab } from '@mui/material';
import Toolbar from '../components/ProductList/Toolbar';
import ListOfProduct from '../components/ProductList/ListOfProduct';
import {alphabetic,time,price} from '../components/ProductList/SortFunction'
function ProductList({pageContext,data:{allStrapiProduct:{edges:products}}}) {
  const [layout,setLayout]=useState('grid')
  const [page, setPage] = React.useState(1);
  const scrollRef=useRef(null)
  const scroll=()=>{
    scrollRef.current.scrollIntoView({behavior:'smooth'})
  }
  var content=[]
  const [sortOptions,setSortOptions]=useState([
    {label:'A-Z',active:true,function:data=>alphabetic(data,'asc')},
    {label:"Z-A",active:false,function:data=>alphabetic(data,'desc')},
    {label:'NEWEST',active:false , function:data=>time(data,'asc')},
    {label:'OLDEST',active:false ,function:data=>time(data,'desc')},
    {label:'PRICE ↑',active:false,function:data=>price(data,'asc')}, 
    {label:'PRICE ↓',active:false,function:data=>price(data,'desc')},
    {label:'REVIEWS',active:false,function:data=>data}])
    const selectedSort=sortOptions.filter(option=>option.active)[0]
    var sortedProducts
    if(selectedSort.label.includes('-')){
      sortedProducts=selectedSort.function(products)
    }else{
      sortedProducts=products
    }
    const [filterOptions,setFilterOptions]=useState(pageContext.filterOptions)
    var Price=[]
    const productsPerPage=layout==='grid'?9:6
    sortedProducts.map((product,i)=>product.node.variants.map(variant => {
      Price.push(variant.Price)
      content.push({product:i,variant:variant})}))
      var isFilter=false;
      var filters={}
      var filterProducts=[]
      Object.keys(filterOptions).filter(option=>filterOptions[option]!==null).map(option=>{
        filterOptions[option].forEach(value=>{
          if(value.checked){
            isFilter=true
            if(filters[option]===undefined){
              filters[option]=[];
        }
        if(!filters[option].includes(value)){
          filters[option].push(value)
        }
        content.forEach(item=>{
          if(option==='Color'){
            if(item.variant.Color_label===value.label&&
              !filterProducts.includes(item)){
                filterProducts.push(item)
              }
            }else if(item.variant[option.toLowerCase()]===value.label&&!filterProducts.includes(item)){
              filterProducts.push(item)
            }
          })
        }
      })
    })
    Object.keys(filters).forEach(filter=>{
      filterProducts=filterProducts.filter(item=>{
        let valid
    filters[filter].some(value=>{
      if(filter==='Color'){
        if(item.variant.Color_label===value.label){
          valid=item
        }
      } else if(item.variant[filter.toLowerCase()]===value.label){
        valid=item
      }
    })
    return valid
  })
})
if(isFilter){content=filterProducts}
const [priceRange, setPriceRange] = React.useState([ Math.min(...Price), Math.max(...Price)]);
const checkprice=(content)=>{
  var price=content.variant.Price
  return price>=priceRange[0]&&price<=priceRange[1]
  }
  content=content.filter(checkprice)
  const numPages=Math.ceil(content.length/productsPerPage)
  useEffect(()=>{
      setPage(1)
  },[sortOptions,filterOptions,layout,priceRange])
  
  return (
    <>
    <Layout>
      <Grid container direction='column' alignItems='center' >
        <div ref={scrollRef}/>
          <Toolbar setFilterOptions={setFilterOptions} sortOptions={sortOptions} setSortOptions={setSortOptions} price={Price} priceRange={priceRange}
          setPriceRange={setPriceRange} filterOptions={filterOptions} layout={layout} setLayout={setLayout} name={pageContext.Name}
           description={pageContext.Description}/>
          <ListOfProduct products={products} content={content} layout={layout} page={page} productsPerPage={productsPerPage}
          filterOptions={filterOptions} sortOptions={sortOptions} setSortOptions={setSortOptions}/>
          <Pagination onClick={scroll}  count={numPages} page={page} onChange={(e,newpage)=>setPage(newpage)} color='primary'/>
          <Fab onClick={scroll}
           color='primary' style={{color:'#fff',fontSize:'3rem',alignSelf:'flex-end',marginRight:'2rem',marginBottom:'2rem'}}>^</Fab>
      </Grid>
    </Layout>
    </>
  )
}
export const query=graphql`
query MyQuery($Name:String!) {
  allStrapiProduct(filter: {variant_2: {Name: {eq: $Name}}}) {
    edges {
      node {
        variants {
          Color
          Color_label
          id
          Price
          createdAt
          qty
          strapi_id
          size
          style
          images {
            url
          }
        }
        Name
        strapi_id
        variant_2 {
          Name
        }
      }
    }
  }
}
`
export default ProductList