import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "@/lib/db";
import { getUserById, updateEmailVerified } from "./data/user";
import authConfig from "./auth.config";
import UserModel from "./models/User";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await UserModel.findByIdAndUpdate(user.id, { emailVerified: new Date() });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // allow Oauth without verifying
      if (account?.provider !== "credentials") return true;

      return true;
    },

    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = (token.role as "ADMIN") || "USER";
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      token.role = existingUser.role;
      return token;
    },
  },
  adapter: MongoDBAdapter(client),
  session: { strategy: "jwt" },
  ...authConfig,
});
