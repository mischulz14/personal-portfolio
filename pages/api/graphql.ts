import { typeDefs } from '@/server/src/schema';
import { CreateFeedbackInput } from '@/server/types/graphqlTypes';
import { PrismaClient } from '@prisma/client';
import { ApolloServer, gql } from 'apollo-server-micro';
import { MicroRequest } from 'apollo-server-micro/dist/types';
import { IncomingMessage, ServerResponse } from 'http';

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
  cache: 'bounded',
});

export const config = {
  api: {
    bodyParser: false,
  },
};

let isApolloServerStarted = false;

const startServerAndCreateHandler = async () => {
  if (!isApolloServerStarted) {
    await apolloServer.start();
    isApolloServerStarted = true;
  }
  return apolloServer.createHandler({ path: '/api/graphql' });
};

const handler = async (
  req: MicroRequest,
  res: ServerResponse<IncomingMessage>,
) => {
  const apolloHandler = await startServerAndCreateHandler();
  return apolloHandler(req, res);
};

export default handler;
