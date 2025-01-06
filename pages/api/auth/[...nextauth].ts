import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { Adapter } from "next-auth/adapters";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "../../../lib/prisma";

export default NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    jwt: async ({ token, user, account }) => {
      return token;
    },
    session: async ({ session }) => {
      if (session) {
        const userCount = await prisma.user.count();

        if (userCount === 1) {
          await prisma.user.update({
            where: { email: String(session.user?.email) },
            data: {
              admin: true,
            },
          });
        }
      }

      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    newUser: "/auth/welcome",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
