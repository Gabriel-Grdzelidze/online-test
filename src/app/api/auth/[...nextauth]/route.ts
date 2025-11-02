import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        // Find student in DB
        const user = await prisma.student.findUnique({
          where: { email: credentials.email },
        });

        if (!user) throw new Error("No user found");

        // Plain-text comparison (not secure)
        if (user.password !== credentials.password) {
          throw new Error("Invalid password");
        }

        return { id: user.id, email: user.email };
      },
    }),
  ],

  pages: {
    signIn: "/", // redirect to your main page
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
