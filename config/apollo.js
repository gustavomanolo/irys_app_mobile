import { ApolloClient, InMemoryCache } from "@apollo/client";

// Initialize Apollo Client
const client = new ApolloClient({
  // uri: 'http://192.168.1.177:4000/',
  uri: 'https://irys-apollo.herokuapp.com/',
  cache: new InMemoryCache()
});

export default client