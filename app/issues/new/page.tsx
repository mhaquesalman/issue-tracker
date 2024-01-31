import React from "react";
import dynamic from "next/dynamic";
import { NextAuthOptions, getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/authOptions";
import { redirect } from "next/navigation";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
});

const NewIssuePage = async () => {
  const auth = authOptions as NextAuthOptions;
  const session = await getServerSession(auth);
  console.log("auth sess", session);

  // if (!session) {
  //   redirect("/dashboard/login");
  // }
  return <IssueForm />;
};

export default NewIssuePage;
