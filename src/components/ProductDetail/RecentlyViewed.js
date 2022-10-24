import React from 'react'
import ProductDisplay from './ProductDisplay'
import './AdditionalProduct.css'
function RecentlyViewed({products}) {
  return (
    <div className="maylike-products-wrapper2">
          <h2>Your Recently Views</h2>
          <div className="marquee">
            <div className="maylike-products-container track">
              {products.map((item) => (
                <ProductDisplay key={item.product.variants[item.selectedVariant].images[0].url} product={item} />
              ))}
            </div>
          </div>
      </div>
  )
}

export default RecentlyViewed