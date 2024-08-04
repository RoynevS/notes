import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./lib/db";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      authorize: async (Credentials) => {
        const email = Credentials.email as string | undefined;
        const password = Credentials.password as string | undefined;

        if (!email || !password) {
          throw new CredentialsSignin("Please provide email & password");
        }

        const user = await prisma.user.findUnique({
          where: { email },
        });

        console.log(user);

        if (!user) {
          throw new Error("Invalid email or password");
        }

        const isMatched = await bcrypt.compare(password, user.password);

        console.log(isMatched);

        if (!isMatched) {
          throw new Error("Invalid email or password");
        }

        const userData = {
          username: user.username,
          email: user.email,
          id: user.id,
        };

        return userData;
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async session({ session, token }) {
      if (token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
});
