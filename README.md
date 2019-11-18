### What is this
A repo for learning GraphQL.
See the commits for the learning history.

* clone from `Complete React Developer in 2020 (w/ Redux, Hooks, GraphQL)` course at Udemy

### GraphQL server
https://crwn-clothing.com/

#### Schema
```
type Collection {
  id: ID!
  title: String!
  items: [Item!]!
}

type Item {
  id: ID!
  name: String!
  price: Float!
  imageUrl: String!
  collection: Collection
}

type Query {
  collections: [Collection!]!
  collection(id: ID!): Collection
  getCollectionsByTitle(title: String): Collection
}
```

### Local Cache
#### data
```
data: {
  cartHidden: true,
  cartItems: [],
  itemCount: 0
}
```
#### Schema
```
extend type Mutation {
  ToggleCartHidden: Boolean!
  AddItemToCart(item: Item): [Item]!
}
extend type Item {
  quantity: Int
}
```