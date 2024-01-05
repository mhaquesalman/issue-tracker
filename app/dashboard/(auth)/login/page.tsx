"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import { useRouter, useSearchParams, redirect } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import Spinner from "@/app/components/Spinner";
import delay from "delay";
import MyLink from "@/app/components/Link";
import { authenticate, isAuthenticate } from "@/app/utils/utils";

const Login = () => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const router = useRouter();
  const { status, data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    // console.log("regsiter ", data);
    const signinData = {
      email: email,
      password: password,
      callbackUrl: "/",
      redirect: false,
    };

    signIn("credentials", signinData).then(async (res) => {
      console.log("auth res: ", res);
      setSubmitting(true);
      // await delay(4000);
      if (res?.error === "CredentialsSignin") {
        setSubmitting(false);
        setError(true);
        setMessage("Wrong Credentials!");
      } else if (res?.error !== "CredentialsSignin" && !res?.ok) {
        setSubmitting(false);
        setError(true);
        setMessage("User not found");
      }
    });
  };

  if (status === "authenticated") {
    // if (!isAuthenticate()) {
    //   authenticate(session.expires);
    // }
    // router.push("/");
    redirect("/");
  }

  return (
    <div className={styles.container}>
      {error && (
        <span style={{ color: "tomato", fontWeight: "bold", fontSize: "14px" }}>
          {message}
        </span>
      )}
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          name="email"
          type="text"
          placeholder="Email"
          required
        />
        <input
          className={styles.input}
          name="password"
          type="password"
          placeholder="Passwrod"
          required
        />
        {isSubmitting ? (
          <button disabled type="submit" className={styles.button}>
            Please Wait <Spinner />
          </button>
        ) : (
          <button type="submit" className={styles.button}>
            Login
          </button>
        )}
        <br />
        <p style={{ textAlign: "center" }}>
          {"Don't have an account? "}
          <span style={{ fontWeight: "bold" }}>
            <MyLink href="/dashboard/register">Register</MyLink>
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
