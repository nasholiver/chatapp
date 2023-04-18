import pc from "@prisma/client";
import bcrypt from "bcryptjs";
import { AuthenticationError, ForbiddenError } from "apollo-server";
import jwt from "jsonwebtoken";

const prisma = new pc.PrismaClient();
// Example data
const users = [
    { id: '1', name: 'Alice', email: 'alice@example.com' },
    { id: '2', name: 'Bob', email: 'bob@example.com' },
  ];
  
  
  // Resolver functions
  const resolvers = {
    Query: {
      users: async (_, args, {userId}) => {
        // console.log(userId);
        // if (!userId) {
        //     throw new ForbiddenError('Not authenticated as user.');
        // }
        return await prisma.user.findMany();
      },
    messageByUser: async (_, {receivedId}, {userId}) => {
            if (!userId) {
                throw new ForbiddenError('Not authenticated as user.');
            }
        const message= await prisma.message.findMany({
                where: {
                    OR: [
                        { receivedId: receivedId, senderId: userId },
                        { senderId: receivedId, receivedId: userId },
                    ],                        
                },
                orderBy: {
                    createdAt: 'desc',
                },
            });
            return message;
        },
    },
    Mutation: {
        SignupUser: async (_, { Usernew }) => {
        const user = await prisma.user.findUnique({
            where: {
                email: Usernew.email,
            },
        });
        if (user) {
            throw new Error('User already exists');
        }
        const hashedPassword = await bcrypt.hash(Usernew.password, 10);

        const newUser = await prisma.user.create({
            data: {
                ...Usernew,
                password: hashedPassword,
            },
        });
        return newUser;
      },
        SigninUser: async (_, { Usersignin }) => {
            const user = await prisma.user.findUnique({
                where: {
                    email: Usersignin.email,
                },
            });
            if (!user) {
                throw new AuthenticationError('User does not exist');
            }
            const passwordValid = await bcrypt.compare(Usersignin.password, user.password);
            if (!passwordValid) {
                throw new AuthenticationError('Invalid email or password');
            }
            const sercret = process.env.JWT_SECRET;
          
            const token = jwt.sign({ userId: user.id }, sercret);
           
            return {
                token
                };
        },
    
        CreateMessage: async (_, { text, receivedId }, {userId}) => {
            if (!userId) {
                throw new ForbiddenError('Not authenticated as user.');
            }
            const newMessage = await prisma.message.create({
                data: {
                    text,
                    receivedId,
                    senderId: userId,
                },
            });
            return newMessage;
        },
    },
  };

export default resolvers;