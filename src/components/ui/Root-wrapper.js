import React from 'react';
import {ThemeProvider} from '@mui/material/styles';
import theme from './Theme';
import { ApolloProvider } from "@apollo/react-hooks";
// import {ApolloWrapper} from '../../apollo/ApolloWrapper.js'

import { ApolloClient } from "@apollo/client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { UserWrapper } from '../../context/wrappers/UserWrapper';
import { FeedbackWrapper } from '../../context/wrappers/FeedbackWrapper';
import CartWrapper from '../../context/wrappers/CartWrapper';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: `https://ecommerce-backend-atr1.onrender.com/graphql`
});
const client = new ApolloClient({
  cache,
  link
});
const rootWrapper= ({element})=>{
return(
    <ThemeProvider theme={theme}>
    <ApolloProvider client={client}>
    <UserWrapper>
      <FeedbackWrapper>
        <CartWrapper>
    {element}
        </CartWrapper>
      </FeedbackWrapper>
    </UserWrapper>
        </ApolloProvider>
    </ThemeProvider>

)
}
export default rootWrapper;