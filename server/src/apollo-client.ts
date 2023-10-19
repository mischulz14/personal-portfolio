import { ApolloClient, InMemoryCache } from '@apollo/client';

const createApolloClient = () => {
  return new ApolloClient({
    uri: 'https://personal-portfolio-gi9v3oj56-mischulz14.vercel.app',
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
