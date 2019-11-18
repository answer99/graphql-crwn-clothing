import { gql } from 'apollo-boost';

import { addItemToCart, getCartItemCount } from './cart.utils';

export const typeDefs = gql `
  extend type Item {
    quantity: Int
  }

  extend type Mutation {
    ToggleCartHidden: Boolean!
    AddItemToCart(item: Item): [Item]!
  }
`;
// extend: extend mutation define from existing backend graphql server

const GET_CART_HIDDEN = gql`
  {
    cartHidden @client
  }
`;

const GET_CART_ITEMS = gql`
  {
    cartItems @client
  }
`;

const GET_ITEM_COUNT = gql`
{
  itemCount @client
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

    addItemToCart: (_root, { item }, { cache }) => {
      const { cartItems } = cache.readQuery({
        query: GET_CART_ITEMS
      });

      const newCartItems = addItemToCart(cartItems, item);

      cache.writeQuery({
        query: GET_ITEM_COUNT,
        data: { itemCount: getCartItemCount(newCartItems) }
      });

      cache.writeQuery({
        query: GET_CART_ITEMS,
        data: { cartItems: newCartItems}
      });
      return newCartItems;
    }
  }
}