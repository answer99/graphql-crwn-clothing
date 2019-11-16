import { gql } from 'apollo-boost';

export const typeDefs = gql `
  extend type Mutation {
    ToggleCartHidden: Boolean!
  }
`;
// extend: extend mutation define from existing backend graphql server

const GET_CART_HIDDEN = gql`
  {
    cartHidden @client
  }
`;

export const resolvers = {
  // The actual Mutation definition inside of this javascript
  Mutation: {
    // _root: represent the parent, 
    // _args: represent the all argments get passed inside of the mutation
    // _context: the thing that Apollo client has access to
    // https://www.apollographql.com/docs/react/data/local-state/#local-resolvers
    toggleCartHidden: (_root, _args, { cache }, _info) =>{
      const { cartHidden } = cache.readQuery({
        query: GET_CART_HIDDEN,
      });
      cache.writeQuery({
        query: GET_CART_HIDDEN,
        data: { cartHidden: !cartHidden },
      });
      return !cartHidden;
    },
  }
}