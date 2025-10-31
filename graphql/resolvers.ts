import { Context } from "../src/app/api/graphql/route";

export const resolvers = {
  Query: {
    students: async (_parent: any, _args: any, context: Context) => {
      return context.prisma.student.findMany();
    },
    question: async (_parent: any, _args: any, context: Context) => {
      return context.prisma.question.findMany();
    },
  },
  Mutation: {
    createStudent: async (_parent: any, args: { password: string; email: string }, context: Context) => {
      const { password, email } = args;
      return context.prisma.student.create({ data: { password, email } });
    },
    createQuestion: async (
      _parent: any,
      args: { question: string; options: string[]; correct: string },
      context: Context
    ) => {
      const { question, options, correct } = args;
      return context.prisma.question.create({ data: { question, options, correct } });
    },
  },
};
