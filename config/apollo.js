import { ApolloClient, InMemoryCache } from "@apollo/client";
import config from './config.json'

// Initialize Apollo Client
const client = new ApolloClient({
  uri: config.apollo_uri,
  cache: new InMemoryCache()
});

export default client