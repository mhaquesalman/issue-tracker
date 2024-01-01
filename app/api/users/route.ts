import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

// if we don't use request parameter then output will be cached
export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany({
    orderBy: { name: "asc" },
  });

  return NextResponse.json(users, { status: 200 });
}
