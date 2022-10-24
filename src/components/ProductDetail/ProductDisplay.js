import React from 'react'
import { Link } from "gatsby"
import './ProductDisplay.css'
import { style } from '@mui/system'
function ProductDisplay({product}) {
  var variant=product.product.variants[product.selectedVariant]
  var splitName=product.product.Name.toLowerCase()
  if(!variant.style){style=null}else{style=variant.style}
  var color=variant.Color.split('#')[1]
  return (

    <div >
      <Link to={`/${splitName.split('_')[1]}/${splitName.split('_')[0]}${style?`?style=${variant.style}&color=${color}`:`?color=${color}`}`}> 
      <div className="product-card">
        <img
        alt={'image'} 
          src={`http://localhost:1337${variant.images[0].url}`}
          width={250}
          height={250}
          className="product-images"
          />
        <p className="product-name">{splitName}</p>
        <p className="product-price">₹{variant.Price}</p>
      </div>
          </Link>
  </div>

  )
}

export default ProductDisplay