import prisma from '@/lib/prisma';
import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from '@auth/prisma-adapter';
import { Adapter } from 'next-auth/adapters';


import GithubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma) as Adapter,

  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
    // ...add more providers here
  ],

  session: {
    strategy: 'jwt'
  },

  callbacks: {

    async signIn({ user, account, profile, email, credentials }) {
      // console.log({user});
      return true;
    },

    async jwt({ token, user, account, profile }) {
      // console.log({ token });
      const dbUser = await prisma.user.findUnique({ where: { email: token.email ?? 'no-email' } });
      if (dbUser?.isActive === false) {
        throw Error('Usuario no está activo');
      }

      token.roles = dbUser?.roles ?? ['no-roles'];
      token.id = dbUser?.id ?? 'no-uuid';

      return token;
    },

    async session({ session, token, user }) {

      if (session && session.user) {
        session.user.roles = token.roles;
        session.user.id = token.id;

      }

      return session;
    }

  }
}

// Segmentar
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST } // PETICIONES POST Y GET EN NEXT
/* export default NextAuth(authOptions) */

//http://localhost:3000/api/auth/signin