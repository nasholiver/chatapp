import typeDefs from './tpedefs.js';
import resolvers from './resolvers.js';
import { ApolloServer } from 'apollo-server';
import jwt from 'jsonwebtoken';
// Create server
const server = new ApolloServer({ 
  typeDefs, 
  resolvers,

  context: ({ req }) => {
    // Get the user token from the headers.
    const {authorization} = req.headers;

    // try to retrieve a user with the token
    if (authorization) {
      
      const { userId } = jwt.verify(authorization, process.env.JWT_SECRET);
      // add the user to the context
      return { userId };
    }
  }
});

// Start server
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
