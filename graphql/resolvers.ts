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
    createStudent: async (
      _parent: any,
      args: {
        password: string;
        email: string;
        idNumber: string;
        score?: number;
      },
      context: Context
    ) => {
      const { password, email, idNumber, score } = args;
      return context.prisma.student.create({
        data: {
          password,
          email,
          idNumber,
          score: score ?? null,
        },
      });
    },

    createQuestion: async (
      _parent: any,
      args: { question: string; options: string[]; correct: string },
      context: Context
    ) => {
      const { question, options, correct } = args;
      return context.prisma.question.create({
        data: { question, options, correct },
      });
    },
    setScore: async (
      _parent: any,
      args: { score: number; email: string },
      context: Context
    ) => {
      const { score, email } = args;
      return context.prisma.student.update({
        where: { email },
        data: { score },
      });
    },
    changeQuestion: async (
      _parent: any,
      args: {
        id: string;
        question: string;
        options: string[];
        correct: string;
      },
      context: Context
    ) => {
      const { id, question, options, correct } = args;
      return context.prisma.question.update({
        where: { id },
        data: {
          question,
          options,
          correct,
        },
      });
    },
    deleteQuestion: async (
      _parent: any,
      args: {
        id: string;
      },
      context: Context
    ) => {
      const { id } = args;
      return context.prisma.question.delete({
        where: { id },
      });
    },
  },
};
