const strapiConfig = {
  apiURL: 'https://ecommerce-backend-nt72.onrender.com',
  // accessToken: '025ea3bb33ffec944caf21ea440fd4fabcaa02a2b091edfca4b06a152c0680a8dcebf5f8f3814ca5228700d7be38d6056fffba964ada67f962f7ec12b62bceb96b120c36eb0db2bffd7348c371b30631ca107f7dba52daf8ba3e3203c05cb6c891d4cd331dbbba30bb77746ac3100d6d9c3c6776946c84c9762d24615fe04f39',
  // accessToken: '4bb65af01a8578db370780dc61a4f67edaee45d02c82f04d5eeeaf4f5a211e3f4864e4661ea4b173517660289d4ac77b3af6dafaf1ebdc4b99476fb701b6367ef54a7af495c2d251ab752373e39ddf78ed9170fc17f601b9327e0e177ff9b71fe19ca42c2b257388410b338fe109575942a1dd58908e80cd3032de79f5d8e852',
  // accessToken: 'e2fdb51ff0e7f26164c59ba6bc2b83ccd416974654113a22aa8b76b55ba042039d867702848d29e8e6fae80fcbf080934891e4463cdc48c49ebe5a07f11f6b08c314df2728a6743245ecd571b7386fcc21292db8cdd3f88c985504e710df67bde5f7cf6991f669d7e1d589dcec3178f77497886e748aef36011d6947a6d66b74',
  accessToken: 'dee1f438badbfbfebcc302bece6bfef38ca340fcea9c53fd3376b9bd76bc41ebda35a03e8bf44c4fe765bf0531626014d965bf9ebbfb81e5867667d77524b9a83d1faaefa9b99c99b286c48d8a5df8cbc013e43166b4e3c43c45035a2686b000134245f192c1669f7c550b213aa36d3d8749edd1e3ce70ba75be8d745a6a06fa',
  // accessToken: '220848de78a6eb0569b82069e66492ea72bc6d3bba9df5c46b5c8b003a9d97003ec274ffea1ba0219c31f90899966756910da0e7c258c1e5a1f26cb1f63e4174435c89a5b4acc26cc6b3fc8b083175a9cbb0baba0fa6dccc1d7a9ad65dcdea3af302f9fa93beda58982f602761cb29702021711ad7b8511eadf923b2d89f7b01',
  collectionTypes: [  'product','variant','variant2'],
  singleTypes: [],
};
module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
    siteUrl: `https://gatsbystarterdefaultsource.gatsbyjs.io/`,
  },
  plugins: [
    'gatsby-plugin-react-helmet', 'gatsby-plugin-material-ui',{
      resolve: `gatsby-source-strapi`,
      options: strapiConfig,
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Philosopher:i7:latin','Montserrat:n5,n4,n3:latin']
        }
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
