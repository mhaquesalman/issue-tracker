import React from "react";
import { Select } from "@radix-ui/themes";

const statuses: { label: string; value: string }[] = [
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssueStatusMenu = () => {
  const changeStatus = (status: string) => {
    console.log("status ", status);
  };

  return (
    <Select.Root defaultValue={statuses[0].value} onValueChange={changeStatus}>
      <Select.Trigger placeholder="Filter by status.." />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.value} value={status.value}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusMenu;
