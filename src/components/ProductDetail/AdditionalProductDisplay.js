import React from 'react'
import { Link } from "gatsby"
import './ProductDisplay.css'
import { style } from '@mui/system'

function AdditionalProductDisplay({product}) {
  var splitName=product.product_2.Name.toLowerCase()
  var variant=product.product_2.variants[product.Index]
    
  if(!variant.style){style=null}else{style=variant.style||undefined}
  var color=variant.Color_label
  return (

    <div >
      <Link to={`/${splitName.split('_')[1]}/${splitName.split('_')[0]}${style?`?style=${variant.style}&color=${color}`:`?color=${color}`}`}> 
      <div className="product-card">
        <img 
          src={`${variant.images[0].url}`}
          width={250}
          height={250}
          className="product-images"
          />
        <p className="product-name">{splitName}</p>
        <p className="product-price">₹{variant.Price}</p>
      </div>
          </Link>
  </div>)
}

export default AdditionalProductDisplay