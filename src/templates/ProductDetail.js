import React,{useState,useEffect,useRef} from 'react'
import { graphql } from 'gatsby';
import ProductImage from '../components/ProductDetail/ProductImage'
import Layout from '../components/ui/Layout'
import {Grid} from '@mui/material'
import ProductInfo from '../components/ProductDetail/ProductInfo';
import {colorIndex} from '../components/ProductList/ProductFrame'
import {useMediaQuery} from '@mui/material';
import AdditionalProduct from '../components/ProductDetail/AdditionalProduct';
import RecentlyViewed from '../components/ProductDetail/RecentlyViewed';
import { useQuery } from "@apollo/react-hooks";
import GET_DETAILS from './Query'
function ProductDetail({pageContext:{Name,id,category,Description,variants,product},data:{allStrapiProduct:{edges:products}}}) {
  const [selectedVariant,setSelectedVariant]=useState(0);
  const [selectedImage,setSelectedImage]=useState(0);  
  const [selectedColor,setSelectedColor]=useState(null)
  const imageIndex=colorIndex({node:{variants:variants}},selectedColor,variants[selectedVariant])
  if (typeof window !== 'undefined') {
  var recentlyViewed=JSON.parse(window.localStorage.getItem('recentlyViewed'))}
 
  var AdditionalProducts=JSON.parse(window.sessionStorage.getItem('AdditionalProducts'))
  const params=new URLSearchParams(window.location.search)
  const styledVariant=variants.filter(variant=>variant.style===
    params.get('style')&&variant.Color_label===`${params.get('color')}`)[0]
    var variantIndex=variants.indexOf(styledVariant)
    var AdditionalProducts=[]
    var requiredVariant=product.variants[variantIndex]; 
    useEffect(() => {
      if(imageIndex!==-1){
        setSelectedVariant(imageIndex)
      }
      
  }, [imageIndex])
  products.forEach(element => {
    var sum=0;
    var variants=element.node.variants
    var product_2=element.node
    variants.forEach(variant=>{
      sum=sum+variant.Rating
    })
    var avgRating=sum/variants.length
    var Price=requiredVariant.Price
    var highPrice=Price+Price/10
    var lowPrice=Price-Price/10
    var additionalVariant=variants.filter(variant=>(variant.Color===requiredVariant.Color||variant.Rating>=avgRating)
    &&(variant.style?variant.style===requiredVariant.style:true)&&(variant.strapi_id!==requiredVariant.strapi_id)&&(highPrice<Price<lowPrice))
    
    for (let i = 0; i < additionalVariant.length; i++) {
      var Index=variants.indexOf(additionalVariant[i])
      AdditionalProducts.push({product_2,Index}) 
    }
  }
  );
  if (typeof window !== 'undefined') {
  window.sessionStorage.setItem('AdditionalProducts',
  JSON.stringify(AdditionalProducts))}
  const matchesMd=useMediaQuery(theme=>theme.breakpoints.down('md'))
  useEffect(() => {
    setSelectedVariant(variantIndex)
  }, [params.get('color')])
  
  useEffect(() => {
    var selectedVariant=variantIndex
    if(recentlyViewed){
      if(recentlyViewed.length===10){
        recentlyViewed.shift()
      }
      if(!recentlyViewed.some(product=>product.product.Name===Name &&product.selectedVariant===variantIndex)){
        recentlyViewed.push({product,selectedVariant:variantIndex})
      }
    }else{
      recentlyViewed=[{product,selectedVariant}]
    }
    if(typeof window !=='undefined'){
    window.localStorage.setItem('recentlyViewed',
    JSON.stringify(recentlyViewed))}
  }, [])
  const scrollRef=useRef(null)
  const scroll=()=>{
    scrollRef.current.scrollIntoView({behavior:'smooth'})
  } 

  const { data, loading, error } = useQuery(GET_DETAILS, {
    variables: { id: id }
  
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
    <Layout>
      <Grid container direction='column'>
        <Grid item container direction={matchesMd?'column':'row'} ref={scrollRef}>
        <ProductImage images={variants[selectedVariant].images}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}/>
        <ProductInfo Name={Name} Description={Description} variants={variants} selectedColor={selectedColor} imageIndex={imageIndex}
        stock={stock}
        selectedVariant={selectedVariant} setSelectedVariant={setSelectedVariant} setSelectedColor={setSelectedColor} scroll={scroll}/>
        </Grid>
        {AdditionalProducts &&<AdditionalProduct products={AdditionalProducts} />}
        {recentlyViewed &&<RecentlyViewed products={recentlyViewed} />}
      </Grid>

    </Layout>
  )
}
export const query=graphql`
query RecommendedProduct($category:String!) {
  allStrapiProduct(filter: {variant_2: {Name: {eq: $category}}}) {
    edges {
      node {
        variants {
          Color
          Color_label
          id
          strapi_id
          Price
          createdAt
          qty
          Rating
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
export default ProductDetail