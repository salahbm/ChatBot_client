import { Account } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: any = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any) {
        try {
          console.log(credentials);
          return credentials;
        } catch (error: any) {
          throw new Error(error.message);
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ account }: { account: Account }) {
      if (account?.provider == 'credentials') {
        return true;
      }
    },
  },
};
