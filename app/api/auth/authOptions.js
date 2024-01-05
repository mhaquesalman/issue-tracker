import CredentialsProvider from "next-auth/providers/credentials";
import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";

const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      async authorize(credentials, req) {
        try {
          const user = await prisma.user.findFirst({
            where: { email: credentials.email },
          });

          if (user) {
            const hashedPassword = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (hashedPassword) return { id: user.id, email: user.email };
            else return null;
          } else {
            throw Error("User not found");
          }
        } catch (err) {
          console.log("err ", err);
          throw Error(err);
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // console.log("login ", user);
      return true;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      // console.log("jwt ", token);
      if (user) {
        // passing id to the session via token
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token, user }) {
      if (token) {
        session.user.id = token.id;
        session.user.jti = token.jti;
      }
      return session;
    },
  },
  pages: {
    signIn: "/dashboard/login",
  },
};

export default authOptions;
