import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { PrismaClient } from "@prisma/client";
import { typeDefs } from "../../../../graphql/typedefs";
import { resolvers } from "../../../../graphql/resolvers";

export const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
}

const apolloServer = new ApolloServer<Context>({
  typeDefs,
  resolvers,
  introspection: true, // ✅ Enables schema introspection for Sandbox/Playground
});

const handler = startServerAndCreateNextHandler(apolloServer, {
  context: async () => ({ prisma }),
});

export { handler as GET, handler as POST };
