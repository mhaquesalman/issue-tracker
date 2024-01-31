"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import MyLink from "@/app/components/Link";
import Spinner from "@/app/components/Spinner";

const Register = () => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const router = useRouter();
  const handleSubmit: any = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get("name");
    const email = data.get("email");
    const password = data.get("password");
    // console.log("regsiter email", email);
    // console.log("regsiter pswrd", password);

    try {
      setSubmitting(true);
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });
      switch (response.status) {
        case 201:
          router.push("/dashboard/login");
          break;
        case 404:
          setSubmitting(false);
          setError(true);
          const resData = await response.json();
          // console.log("response err", resData.error);
          setMessage(resData.error);
          break;
        case 400:
          setSubmitting(false);
          setError(true);
          // const resData2 = await response.json();
          // console.log("response err", resData.error);
          setMessage("Something wrong!");
          break;
      }
    } catch (err) {
      setSubmitting(false);
      // console.log("Resigster error", err);
      setError(true);
      // setMessage("There is an error!");
    }
  };

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
          name="name"
          type="text"
          placeholder="Username"
          required
        />
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
            Register <Spinner />
          </button>
        ) : (
          <button type="submit" className={styles.button}>
            Register
          </button>
        )}
        <br />
        <p style={{ textAlign: "center" }}>
          Already have an account?{" "}
          <span style={{ fontWeight: "bold" }}>
            <MyLink href="/dashboard/login">Login</MyLink>
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
