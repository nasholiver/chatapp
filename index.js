import typeDefs from './typedefs.js';
import resolvers from './resolvers.js';

const { ApolloServer } = require('apollo-server');

// Create server
const server = new ApolloServer({ typeDefs, resolvers });

// Start server
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
