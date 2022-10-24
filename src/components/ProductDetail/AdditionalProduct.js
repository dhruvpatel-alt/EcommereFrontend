import React from 'react'
import AdditionalProductDisplay from './AdditionalProductDisplay'
import './AdditionalProduct.css'
function AdditionalProduct({products}) {
  return (
    <div className="maylike-products-wrapper">
          <h2>You may also like</h2>
          <div className="marquee">
            <div className="maylike-products-container track2">
              {products.map((item) => (
                <AdditionalProductDisplay key={item.product_2.variants[item.Index].images[0].url} product={item} />
              ))}
            </div>
          </div>
      </div>
  )
}

export default AdditionalProduct