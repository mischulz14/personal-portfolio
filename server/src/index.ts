import { PrismaClient } from '@prisma/client';
// pages/api/graphql.js or pages/api/graphql.ts
import { ApolloServer, gql } from 'apollo-server-micro';

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

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: '/api/graphql' });
