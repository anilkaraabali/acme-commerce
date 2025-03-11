import type { NextAuthOptions } from 'next-auth';

import { User as IUser } from '@/features/auth';
import { readUsersFromFile } from '@/features/auth/utils/user';
import { compare } from 'bcryptjs';
import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
// import FacebookProvider from 'next-auth/providers/facebook';
// import GoogleProvider from 'next-auth/providers/google';

// if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
//   throw new Error('Google credentials are missing!');
// }

// if (!process.env.FACEBOOK_CLIENT_ID || !process.env.FACEBOOK_CLIENT_SECRET) {
//   throw new Error('Facebook credentials are missing!');
// }

const authOptions = {
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.provider = user.provider;
        token.providerId = user.providerId;
        token.id = user.id;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.provider = token.provider || null;
        session.user.providerId = token.providerId || null;
        session.user.image = session.user.image || null;
        session.user.id = token.id;
        session.user.reviews = session.user.reviews || [];
      }

      return session;
    },
  },
  debug: !!process.env.AUTH_DEBUG,
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    verifyRequest: '/auth/verify-request', // (used for check email message)
  },
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    // }),
    // FacebookProvider({
    //   authorization: {
    //     params: {
    //       scope: 'email,public_profile',
    //     },
    //   },
    //   clientId: process.env.FACEBOOK_CLIENT_ID!,
    //   clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    // }),
    CredentialsProvider({
      async authorize(credentials) {
        if (!credentials) {
          throw new Error('No credentials provided');
        }

        const { email, password } = credentials;

        const users = await readUsersFromFile();
        const user = users.find((u) => u.email === email);

        if (!user) {
          throw new Error('Invalid credentials');
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
          throw new Error('Invalid credentials');
        }

        return user;
      },
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      name: 'Credentials',
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
} satisfies NextAuthOptions;

export { authOptions };
export default NextAuth(authOptions);

declare module 'next-auth' {
  interface User extends DefaultUser, IUser {}

  interface Session {
    user: DefaultSession['user'] & IUser;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends IUser {}
}
