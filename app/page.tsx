import Image from "next/image";
import dynamic from "next/dynamic";
import IssueSummary from "./IssueSummary";
import prisma from "@/prisma/client";
import { Flex, Grid } from "@radix-ui/themes";
import IssueChart from "./IssueChart";
import LatestIssues from "./LatestIssues";
import { Metadata } from "next";
import { revalidatePath } from "next/cache";

const Authentication = dynamic(() => import("./provider/Authentication"), {
  ssr: false,
});

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const close = await prisma.issue.count({ where: { status: "CLOSED" } });
  revalidatePath("/");

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <IssueSummary open={open} inProgress={inProgress} closed={close} />
        <IssueChart open={open} inProgress={inProgress} closed={close} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}

// export const revalidate = 10;

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "View a summary of project issues",
};
