import { Box } from "@radix-ui/themes";
import delay from "delay";
import React from "react";
import { Skeleton } from "@/app/components";

const LoadingEditIssuePage = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <Skeleton height="20rem" />
    </Box>
  );
};

export default LoadingEditIssuePage;