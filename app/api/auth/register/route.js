import { registerSchema } from "@/app/ValidationSchemas";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import bcrypt from "bcryptjs";

export const POST = async (request) => {
  const body = await request.json();
  const valid = registerSchema.safeParse(body);

  if (!valid.success)
    return NextResponse.json(valid.error.format(), { status: 400 });

  const user = await prisma.user.findFirst({
    where: { email: body.email },
  });

  // console.log("user ", user);

  if (user)
    return NextResponse.json({ error: "User already exist" }, { status: 404 });

  const hashedPassword = await bcrypt.hash(body.password, 5);

  const newUser = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: hashedPassword,
    },
  });

  // console.log("newuser ", newUser);

  return NextResponse.json(newUser, { status: 201 });
};
