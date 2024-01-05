"use client";

import React, { useState } from "react";
import { Button, AlertDialog, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import Spinner from "@/app/components/Spinner";
import { TrashIcon } from "@radix-ui/react-icons";

const IssueDeleteButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const [openAlert, setAlert] = useState(false);

  const deleteIssue = async () => {
    try {
      setDeleting(true);
      await axios.delete(`/api/issues/${issueId}`);
      router.push("/issues");
      router.refresh();
    } catch (err) {
      setError(true);
      setDeleting(false);
    }
  };

  const onDeleteClick = () => {
    setAlert(true);
  };

  return (
    <>
      <Button color="red" onClick={onDeleteClick} disabled={isDeleting}>
        <TrashIcon /> Delete {isDeleting && <Spinner />}
      </Button>
      <AlertDialog.Root open={openAlert}>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description>
            Are you want to delete?
          </AlertDialog.Description>
          <Flex gap="2">
            <AlertDialog.Cancel>
              <Button
                variant="outline"
                color="gray"
                onClick={() => {
                  setAlert(false);
                }}
              >
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button variant="outline" color="blue" onClick={deleteIssue}>
                Confirm
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            Could not be deleted
          </AlertDialog.Description>
          <Button variant="soft" color="gray" onClick={() => setError(false)}>
            Ok
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default IssueDeleteButton;
