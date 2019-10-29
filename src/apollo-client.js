import ApolloClient from 'apollo-boost';
import { AsyncStorage } from 'react-native';

const client = new ApolloClient({
  uri: 'https://graphql.fauna.com/graphql',
  request: async operation => {
    const token = await AsyncStorage.getItem('token');

    operation.setContext({
      headers: {
        authorization: token
          ? `Bearer ${token}`
          : 'Bearer fnADbqlvLjACAqplpcapYmlMRqc56a6Qg40Q85cq',
      },
    });
  },
});

export default client;
