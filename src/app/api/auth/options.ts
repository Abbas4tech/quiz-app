import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import verifyGoogleSignIn from "@/actions/google-signin";
import { env } from "@/lib/env";

/**
 * NextAuth configuration with Google OAuth provider
 * Includes session management and database integration
 */
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: env.NEXT_AUTH_GOOGLE_CLIENT_ID as string,
      clientSecret: env.NEXT_AUTH_GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: env.NEXT_AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/",
  },
  callbacks: {
    redirect() {
      return env.BASE_AUTHENTICATED_URL as string;
    },
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        return await verifyGoogleSignIn(user);
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.role = token.role;
      }
      return session;
    },
  },
};
