import React from "react";
import { Button } from "@radix-ui/themes";
import { Pencil2Icon } from "@radix-ui/react-icons";
import MyLink from "@/app/components/Link";
import Link from "next/link";

const IssueEditButton = ({ issueId }: { issueId: number }) => {
  return (
    <Button>
      <Pencil2Icon />
      <Link href={`/issues/edit/${issueId}`}>Edit </Link>
    </Button>
  );
};

export default IssueEditButton;
