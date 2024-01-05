import { Button, Flex, Table } from "@radix-ui/themes";
import prisma from "@/prisma/client";
import MyLink from "../components/Link";
import Link from "next/link";
import IssueStatusBadge from "../components/IssueStatusBadge";
import delay from "delay";
import IssueStatusFilter from "./IssueStatusFilter";
import { Issue, Status } from "@prisma/client";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Metadata } from "next";

const BASE_URL = "http://localhost:3000/api";

interface Props {
  searchParams: { status: Status; orderBy: keyof Issue; orderIn: string };
}

async function getIssues(status: string, orderBy: string, orderIn: string) {
  // console.log("getissue called");
  // const url =  `/issues?status=${status}&orderBy=${orderBy}`

  let url = null;
  if (status) url = BASE_URL + "/issues?status=" + status;
  if (status && orderBy)
    url = `${BASE_URL}/issues?status=${status}&orderBy=${orderBy}`;
  else url = BASE_URL + "/issues?orderBy=" + orderBy;
  if (status && orderBy && orderIn)
    url = `${BASE_URL}/issues?status=${status}&orderBy=${orderBy}&orderIn=${orderIn}`;
  if (status && orderIn)
    url = `${BASE_URL}/issues?status=${status}&orderIn=${orderIn}`;
  if (orderBy && orderIn)
    url = `${BASE_URL}/issues?orderBy=${orderBy}&orderIn=${orderIn}`;
  if (!status && !orderBy && !orderIn) url = BASE_URL + "/issues/";

  try {
    const { data } = await axios.get<Issue[]>(url);
    return data;
  } catch (err) {
    const emptyList: Issue[] = [];
    console.log("issues error " + err);
    return emptyList;
  }
}

const Issues = async ({ searchParams }: Props) => {
  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  ];

  /*   const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined; */

  const orderIn = searchParams.orderIn ? searchParams.orderIn : "asc";

  /*   const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: orderIn }
    : undefined; */

  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? searchParams.orderBy
    : "id";

  /*   const issues = await prisma.issue.findMany({
    where: { status: status },
    orderBy: {
      [orderBy]: orderIn
    },
  }); */

  const issues = await getIssues(
    searchParams.status,
    searchParams.orderBy,
    searchParams.orderIn
  );
  // console.log("issue page ");

  // await delay(2000);

  return (
    <div>
      <Flex mb="5" justify="between">
        <IssueStatusFilter />
        <Button>
          <Link href="/issues/new"> New Issue </Link>
        </Button>
      </Flex>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell key={column.value}>
                <Link
                  href={{
                    query: { ...searchParams, orderBy: column.value },
                  }}
                >
                  {column.label}
                </Link>
                {column.value === searchParams.orderBy && (
                  <Link
                    href={{
                      query: {
                        ...searchParams,
                        orderBy: column.value,
                        orderIn: searchParams.orderIn
                          ? searchParams.orderIn === "asc"
                            ? "desc"
                            : "asc"
                          : "desc",
                      },
                    }}
                  >
                    {searchParams.orderIn ? (
                      searchParams.orderIn === "asc" ? (
                        <ArrowUpIcon className="inline" />
                      ) : (
                        <ArrowDownIcon className="inline" />
                      )
                    ) : (
                      <ArrowUpIcon className="inline" />
                    )}
                  </Link>
                )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => {
            return (
              <Table.Row key={issue.id}>
                <Table.Cell>
                  <MyLink href={`/issues/${issue.id}`}>{issue.title}</MyLink>
                </Table.Cell>
                <Table.Cell>
                  <IssueStatusBadge status={issue.status} />
                </Table.Cell>
                <Table.Cell>
                  {new Date(issue.createdAt).toDateString()}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

// enable cache and turn pages to static to dynamic
//which means page will reload data in refreshing page
// export const dynamic = 'focre-dynamic';

// export const revalidate = 0;

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "View all project issues",
};

export default Issues;
