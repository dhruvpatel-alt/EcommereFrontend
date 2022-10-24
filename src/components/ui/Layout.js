
import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import useMediaQuery from '@mui/material/useMediaQuery';

import Header from "./Header"
import Footer from "./Footer"

const Layout = ({ children }) => {
  const matchesMd=useMediaQuery(theme=>theme.breakpoints.down('md'))
  const data = useStaticQuery(graphql`
  query Getcategories {
    allStrapiVariant2 {
      nodes {
          Name
          strapi_id
        }
      }
    }
  `)

  return (
    <>
      <Header categories={data.allStrapiVariant2.nodes} />
      <div
        style={{
          marginBottom:matchesMd?'2rem':"4rem"
        }}
     / >
        <main>{children}</main>
          <Footer/>
    
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
