import { Context } from "../src/app/api/graphql/route";


export const resolvers = {
  Query: {
    students: async (_parent: any, _args: any, context: Context) => {
      return context.prisma.student.findMany();
    },
  },
  Mutation: {
    createStudent: async (_parent: any, args: { password: string; email: string }, context: Context) => {
      const { password, email } = args;
      return context.prisma.student.create({
        data: {
          password,
          email,
        },
      });
    },
  },
};