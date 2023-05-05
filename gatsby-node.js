
exports.createPages = async ({graphql, actions }) => {
  const { createPage } = actions
  const result=await graphql (
    ` {
      products:allStrapiProduct {
        nodes {
          variants {
            Color_label
            strapi_id
            id
            Price
            size
            qty
            images {
              url
            }
            style
          }
          Name
          Description
          variant_2 {
            Name
          }
          strapi_id
        }
      }
      
      categories:allStrapiVariant2  {
        nodes {
          Name
          Description
          strapi_id
          filterOptions {
            Size {
              checked
              label
            }
            Style {
              checked
              label
            }
            Color {
              checked
              label
            }
          }
        }
      }
    }    
    `
  )
  if(result.errors){
    throw result.errors;
  }
  let products=JSON.parse(JSON.stringify(result.data.products.nodes))
  let categories=JSON.parse(JSON.stringify(result.data.categories.nodes))
  products.forEach(product=>{
      createPage({
        path:`/${product.variant_2.Name.toLowerCase()}/${product.Name.split('_')[0]}`,
        component:require.resolve('./src/templates/ProductDetail.js'),
        context:{
          Name:product.Name,
          category:product.variant_2.Name,
          Description:product.Description,
          id:product.strapi_id,
          variants:product.variants,
          product:product
        }
      })
    }
  )

  categories.forEach(category=>{
    createPage({
      path:`/${category.Name.toLowerCase()}`,
      component:require.resolve('./src/templates/ProductList.js'),
      context:{
        Name:category.Name,
        Description:category.Description,
        id:category.strapi_id,
        filterOptions:category.filterOptions
      }
    })
  })
 
}
