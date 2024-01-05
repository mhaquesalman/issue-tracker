import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Box, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import IssueDeleteButton from "../edit/_components/IssueDeleteButton";
import IssueEditButton from "../edit/_components/IssueEditButton";
import AssigneeSelect from "./AssigneeSelect";
import { NextAuthOptions, getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/authOptions";
import { cache } from "react";

interface Props {
  params: { id: string };
}

const fetchIssue = cache((issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);

const IssueDetailPage = async ({ params }: Props) => {
  const auth = authOptions as NextAuthOptions;
  const session = await getServerSession(auth);
  // console.log("auth sess ", session);

  const id = parseInt(params.id);

  if (isNaN(id)) notFound();

  const issue = await fetchIssue(id);

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="4">
      <Box className="md:col-span-4">
        <Heading>{issue.title}</Heading>
        <Flex gap="3" my="2">
          <IssueStatusBadge status={issue.status} />
          <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card className="prose max-w-full" mt="2">
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
      </Box>
      <Box>
        <Flex direction="column" gap="2">
          <AssigneeSelect issue={issue} />
          {session && (
            <>
              <IssueEditButton issueId={issue.id} />
              <IssueDeleteButton issueId={issue.id} />
            </>
          )}
        </Flex>
      </Box>
    </Grid>
  );
};

export async function generateMetadata({ params }: Props) {
  const issue = await fetchIssue(parseInt(params.id));

  return {
    title: issue?.title,
    description: issue?.description,
  };
}

export default IssueDetailPage;
