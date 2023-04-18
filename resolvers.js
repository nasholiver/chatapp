// Example data
const users = [
    { id: '1', name: 'Alice', email: 'alice@example.com' },
    { id: '2', name: 'Bob', email: 'bob@example.com' },
  ];
  
  
  // Resolver functions
  const resolvers = {
    Query: {
      users: () => users,
    },
    Mutation: {
      createUser: (_, { input }) => {
        const newUser = { id: String(users.length + 1), ...input };
        users.push(newUser);
        return newUser;
      },
    },
  };

export default resolvers;