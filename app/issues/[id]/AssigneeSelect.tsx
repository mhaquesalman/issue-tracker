"use client";

import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "@/app/components/Skeleton";
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 3600 * 1000, // 60mins
    retry: 3,
  });
  // console.log("users ", users);

  /*   const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get<User[]>("api/users");
      setUsers(data);
    };

    fetchUsers()
  }, []); */

  if (isLoading) return <Skeleton />;

  if (error) return null;

  if (users) {
    return (
      <>
        <Select.Root
          defaultValue={issue.assignedToUserId?.toString() || "U"}
          onValueChange={(userId) => {
            axios
              .patch("/api/issues/" + issue.id, {
                assignedToUserId: parseInt(userId) || null,
              })
              .then((res) => toast.success("Issue has been assigned"))
              .catch(() => toast.error("Changes could not be saved"));
          }}
        >
          <Select.Trigger placeholder="Select user" />
          <Select.Content>
            <Select.Group>
              <Select.Label>Suggestions</Select.Label>
              <Select.Item value="U">Unassigned</Select.Item>
              {users.map((user: User) => (
                <Select.Item key={user.id} value={user.id.toString()}>
                  {user.name}
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Content>
        </Select.Root>
        <Toaster />
      </>
    );
  }
};

export default AssigneeSelect;
