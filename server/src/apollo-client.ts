import { ApolloClient, InMemoryCache } from '@apollo/client';

const createApolloClient = () => {
  return new ApolloClient({
    uri: 'http://localhost:4000/api/graphql',
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
