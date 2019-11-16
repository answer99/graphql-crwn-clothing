import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient, gql } from 'apollo-boost';
import { typeDefs, resolvers } from './graphql/resolvers';

import { store, persistor } from './redux/store';

import './index.css';
import App from './App';

const httpLink = createHttpLink({
  uri: 'https://crwn-clothing.com/'
});

/* in-memory cache to dramatically speed up
 the execution of queries that don't rely on
 real-time data.
 Also, mutate data like mutating a redux store.

*/
const cache = new InMemoryCache();

const client = new ApolloClient({
  link: httpLink,
  cache,
  typeDefs,
  resolvers
});

/* Direct writes data to the cache
  (not validate that the data you're writing to
  the cache is in the shape of valid GraphQL data.)
*/
client.writeData({
  data: {
    cartHidden: true
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);
