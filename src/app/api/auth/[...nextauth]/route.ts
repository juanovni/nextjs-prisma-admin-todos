import prisma from '@/lib/prisma';
import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from '@auth/prisma-adapter';
import { Adapter } from 'next-auth/adapters';
import CredentialsProvider from "next-auth/providers/credentials";


import GithubProvider from "next-auth/providers/github";
import { signInEmailPassword } from '@/app/auth/actions/auth-actions';

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma) as Adapter,

  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
    // ...add more providers 

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Correo electrónico", type: "email", placeholder: "usuario@google.com" },
        password: { label: "Contraseña", type: "password", placeholder: '******' }
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const user = await signInEmailPassword(credentials!.email, credentials!.password);

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        }

        return null;
      }
    }),

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