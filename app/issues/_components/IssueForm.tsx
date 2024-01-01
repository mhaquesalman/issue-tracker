"use client";

import React, { useState } from "react";
import { TextField, Button, Callout, Select } from "@radix-ui/themes";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import SimpleMde from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { issueSchema } from "@/app/ValidationSchemas";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { Issue } from "@prisma/client";
import IssueStatusMenu from "./IssueStatusMenu";

/* interface IssueForm {
    title: string;
    description: string;
} */
const statuses: { label: string; value: string }[] = [
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

type IssueFormData = z.infer<typeof issueSchema>;

type Props = {
  issue?: Issue;
};

interface InputType {
  title: string;
  description: string;
  status: string;
}

const IssueForm = ({ issue }: Props) => {
  const router = useRouter();
  /*   const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(createIssueSchema),
  });
   */

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InputType>();

  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      // console.log("data ", data);
      setSubmitting(true);
      if (issue) await axios.patch("/api/issues/" + issue.id, data);
      else await axios.post("/api/issues", data);
      router.push("/issues");
      // router.refresh();
      // alert(JSON.stringify(data));
    } catch (e) {
      setSubmitting(false);
      setError("An unexpected error occurred..");
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-2">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input
            defaultValue={issue?.title}
            placeholder="Title"
            {...register("title")}
          />
        </TextField.Root>
        {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
        <Controller
          name="description"
          defaultValue={issue?.description}
          control={control}
          render={({ field }) => (
            <SimpleMde placeholder="Description" {...field} />
          )}
        />
        {errors.description && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Select.Root
              defaultValue={issue ? issue.status : undefined}
              onValueChange={field.onChange}
              {...field}
            >
              <Select.Trigger placeholder="Select Status..." />
              <Select.Content>
                {statuses.map((status) => (
                  <Select.Item key={status.value} value={status.value}>
                    {status.label}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          )}
        />
        <br />
        <Button disabled={isSubmitting}>
          {issue ? "Update Issue" : "Create Issue"}{" "}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;

/*        <select
          className="border-solid border-gray-400"
          {...register("status")}
        >
          {statuses.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select> */
