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
}

// Segmentar
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST } // PETICIONES POST Y GET EN NEXT
/* export default NextAuth(authOptions) */

//http://localhost:3000/api/auth/signin