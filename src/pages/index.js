import * as React from "react"
import CalltoAction from "../components/Home/CalltoAction"
import FeatureProduct from "../components/Home/FeatureProduct"
import Heroblock from "../components/Home/Hero-block"
import Marketing from "../components/Home/Marketing"
import PromotionalProduct from "../components/Home/PromotionalProduct"
import Layout from "../components/ui/Layout"
const IndexPage = () => (


  <Layout >
    <Heroblock/>
    <PromotionalProduct/>
    <FeatureProduct/>
    <Marketing/>
    <CalltoAction/>   
  </Layout>
 
)

export default IndexPage
