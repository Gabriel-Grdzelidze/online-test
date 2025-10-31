import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// Example: You can use GoogleProvider or GitHubProvider instead if you want OAuth

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Example: Replace this with your real DB lookup
        if (
          credentials?.email === "test@example.com" &&
          credentials?.password === "1234"
        ) {
          return { id: "1", name: "Test User", email: "test@example.com" };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin", // Optional custom sign-in page
  },
  secret: process.env.AUTH_SECRET, // Add this to your .env.local
});

export { handler as GET, handler as POST };
