import { PrismaClient } from '@prisma/client';
import { ApolloServer } from 'apollo-server';

import { CreateFeedbackInput } from '../types/graphqlTypes';
import { typeDefs } from './schema';

const db = new PrismaClient();

const resolvers = {
  Query: {
    getFeedback: async () => {
      return await db.feedback.findMany();
    },
  },
  Mutation: {
    createFeedback: async (
      _: any,
      { input }: { input: CreateFeedbackInput },
    ) => {
      return await db.feedback.create({
        data: {
          feedback: input.feedback,
        },
      });
    },
  },
};

const server = new ApolloServer({
  resolvers,
  typeDefs,
  introspection: true,
});

async function start() {
  const { url } = await server.listen({ port: 4000 });
  console.log(`🚀 Apollo Server is running at ${url}`);
}

start();
