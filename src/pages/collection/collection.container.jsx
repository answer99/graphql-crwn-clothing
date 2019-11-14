import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import Spinner from '../../components/spinner/spinner.component';
import CollectionPage from './collection.component';

const GET_COLLECTIONS_BY_TITLE = gql`
  query getCollectionsByTitle($title: String!) {
    getCollectionsByTitle(title: $title) {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`;

const CollectionContainer = ({ match }) => {
  return (
    <Query
      query={GET_COLLECTIONS_BY_TITLE}
      variables={{ title: match.params.collectionId }}
    >
      {
        ({ loading, data }) => {
          if(loading) return <Spinner />;
          return <CollectionPage collection={data.getCollectionsByTitle} />;
        }
      }
    </Query>
  );
}

export default CollectionContainer;
