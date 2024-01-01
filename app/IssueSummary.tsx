import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

type statusType = {
  label: string;
  value: number;
  status: Status;
};

const IssueSummary = ({ open, inProgress, closed }: Props) => {
  const statuses: statusType[] = [
    { label: "Open Issues", value: open, status: "OPEN" },
    { label: "In Progress Issues", value: inProgress, status: "IN_PROGRESS" },
    { label: "Closed Issues", value: closed, status: "CLOSED" },
  ];

  return (
    <Flex gap="4">
      {statuses.map((s) => (
        <Card key={s.label}>
          <Flex direction="column" gap="2">
            <Link
              className="text-sm font-medium"
              href={`/issues?status=${s.status}`}
            >
              {s.label}
            </Link>
            <Text size="5" className="font-bold">
              {s.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
