import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { env } from "~/env.mjs";
import { prisma } from "~/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      username: string;
    };
  }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    signIn({ user }) {
      if (user) {
        return true;
      }
      return false;
    },
    redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url;
      else if (url.startsWith("/")) return new URL(url, baseUrl).toString();
      return baseUrl;
    },
    session({ session, token }) {
      if (token) {
        // @ts-expect-error - next auth types
        session.user = { id: token.id, username: token.username };
      }
      return session;
    },
    jwt({ token, user }) {
      if (user) {
        // @ts-expect-error - next auth types
        token.username = user.username;
        token.id = user.id;
      }
      return token;
    },
  },
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(prisma),
  secret: env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "joogie" },
      },
      async authorize(creds) {
        const user = await prisma.user.findUnique({
          where: { username: creds?.username },
          select: { id: true, username: true },
        });

        if (!user && creds?.username) {
          return await prisma.user.create({
            data: { username: creds.username },
            select: { id: true, username: true },
          });
        }

        return user;
      },
    }),
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
