import { PrismaAdapter } from '@auth/prisma-adapter';
import { getServerSession, type DefaultSession, type NextAuthOptions } from 'next-auth';
import { type Adapter } from 'next-auth/adapters';
import CredentialsProvider from 'next-auth/providers/credentials';

import { db, purePrisma } from '@/server/db';
import { HelperClass } from '@/utils/helper-class';

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      role: string;
      roleName: string;
    } & DefaultSession['user'];
  }

  interface User {
    // ...other properties
    role: string;
    roleName: string;
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    role: string;
    roleName: string;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/signin',
  },
  session: { strategy: 'jwt' },

  callbacks: {
    jwt: async ({ token, user }) => {
      return { ...token, ...user };
    },
    session: async ({ session, token }) => {
      session.user.id = token.sub!;
      session.user.email = token.email!;
      session.user.image = token.picture!;
      session.user.role = token.role;
      session.user.roleName = token.roleName;

      return {
        ...session,
      };
    },
  },
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Add logic here to look up the user from the credentials supplied

        const user = await purePrisma.user.findUnique({
          where: { email: credentials?.username },
          include: {
            roleUser: { select: { name: true } },
          },
        });

        if (!user) {
          // You can also Reject this callback with an Error or with a URL:
          throw new Error('Akun tidak ditemukan');
        }

        const isMatch = await HelperClass.comparePassword(String(credentials?.password), String(user?.password));

        if (!isMatch) {
          // You can also Reject this callback with an Error or with a URL:
          throw new Error('Password tidak sesuai');
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...rest } = user;

        // Any object returned will be saved in `user` property of the JWT
        return { ...rest, roleName: user.roleUser.name };
      },
    }),
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
