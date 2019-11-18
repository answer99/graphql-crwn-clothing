import React from 'react';
import { gql } from 'apollo-boost';
import { Query, Mutation } from 'react-apollo';

import CartDropdown from './cart-dropdown.component';

const GET_CART_ITEMS = gql`
  {
    cartItems @client
  }
`;

const TOGGLE_CART_HIDDEN = gql`
  mutation ToggleCartHidden {
    toggleCartHidden @client
  }
`;
const CartDropdownContainer = () => (
  <Query query={GET_CART_ITEMS}>
    {({ data: { cartItems } }) => (
      <Mutation mutation={TOGGLE_CART_HIDDEN}>
        {toggleCartHidden => (
          <CartDropdown
            cartItems={cartItems}
            toggleCartHidden={toggleCartHidden}
          />
        )}
      </Mutation>
    )}
  </Query>
);

export default CartDropdownContainer;
