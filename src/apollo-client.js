import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { RestLink } from 'apollo-link-rest';
import { setContext } from 'apollo-link-context';
import { AsyncStorage } from 'react-native';

const cache = new InMemoryCache();

const faunaLink = new HttpLink({
  uri: 'https://graphql.fauna.com/graphql',
});

const lambdaLink = new HttpLink({
  uri: 'http://localhost:8888/.netlify/functions/graphql',
});

const restLink = new RestLink({
  uri: 'http://localhost:8888/.netlify/functions',
});

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem('token');

  return {
    headers: {
      ...headers,
      Authorization: token
        ? `Bearer ${token}`
        : 'Bearer fnADcuFlk7ACAC2eAW2YzfTZiA9vbQZ5-caS0x6Q',
    },
  };
});

const client = new ApolloClient({
  cache,
  link: authLink.concat(
    restLink.split(
      operation => operation.getContext().useLambda,
      lambdaLink,
      faunaLink
    )
  ),
});

export default client;
