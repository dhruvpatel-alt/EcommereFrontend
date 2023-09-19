require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});
const strapiConfig = {
  apiURL: `${process.env.BACKEND_URL}`,
  accessToken: '4c367ecd0d52c95b2397af2b5588dd83b560b83dc400b09c15c5a45f2212fee904ce18f9fa5f8086ea5ed85d24f5b6b1ba2172c5e28ae6192275dd9f6ed92c42b7a7850d3f3496f885dad83f8365b7c72f4909c70037a03ac9a20ca0986126a88ce617b9dd23eb9e9c64bbeb647d714ea71d933706ad65d36cc1b0e7c5784374',
  collectionTypes: ['product','variant','variant2'],
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
    },
  
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
