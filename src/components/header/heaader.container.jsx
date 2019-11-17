import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import Header from './header.component';

/* can easily put this Query def. in a different file,
  and read them in. so you dont write them twice.
  wrote here just for visually seeing what it is
  that we are calling.
*/
const GET_CART_HIDDEN = gql`
  {
    cartHidden @client
  }
`;

const HeaderContainer = () => (
  <Query query={GET_CART_HIDDEN}>
    {
      ({ data: { cartHidden } }) => <Header hidden={cartHidden}/>
    }
  </Query>
)

export default HeaderContainer;