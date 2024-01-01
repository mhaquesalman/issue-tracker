import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { issueSchema } from "../../ValidationSchemas";
import { Status, Issue } from "@prisma/client";
import { NextAuthOptions, getServerSession } from "next-auth";
import authOptions from "../auth/authOptions";

export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;

  const orderIn = sp.get("orderIn") ? sp.get("orderIn") : "asc";

  const orderByParam = sp.get("orderBy") ? sp.get("orderBy") : "id";

  const statusParam = sp.get("status") ? sp.get("status") : "ALL";

  const orderBy = ["title", "status", "createdAt"].includes(orderByParam!)
    ? { [orderByParam!]: orderIn! }
    : undefined;

  let status = null;
  if (Status.OPEN === statusParam) status = Status.OPEN;
  if (Status.IN_PROGRESS === statusParam) status = Status.IN_PROGRESS;
  if (Status.CLOSED === statusParam) status = Status.CLOSED;

  // console.log("searchparams ", sp);

  const issues = await prisma.issue.findMany({
    where: { status: status ? status : undefined },
    orderBy,
  });

  return NextResponse.json(issues);
}

export async function POST(request: NextRequest) {
  // const auth = authOptions as NextAuthOptions
  // const session = await getServerSession(auth)

  // if (!session)
  // return NextResponse.json({}, { status: 401})

  const body = await request.json();
  const valid = issueSchema.safeParse(body);
  if (!valid.success)
    return NextResponse.json(valid.error.errors, { status: 400 });

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
      status: body.status,
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
