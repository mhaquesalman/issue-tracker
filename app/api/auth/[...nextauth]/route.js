import NextAuth from "next-auth/next";
import authOptions from "../authOptions";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
