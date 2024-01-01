"use client";

import Link from "next/link";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import classNames from "classnames";
import { Box, Button, Text } from "@radix-ui/themes";
import { removeAuthentication } from "./utils/utils";

const NavBar = () => {
  const currentPath = usePathname();
  const router = useRouter();
  const { status, data: session } = useSession();
  console.log("session: ", useSession());

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center bg-slate-300">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              className={classNames({
                "text-zinc-800": link.href === currentPath,
                "text-zinc-500": link.href !== currentPath,
                "hover:text-yellow-600": true,
              })}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <Box>
        {status !== "authenticated" ? (
          <Link
            className={classNames({
              "text-zinc-800": "/dashboard/login" === currentPath,
              "text-zinc-500": "/dashboard/login" !== currentPath,
              "hover:text-yellow-600": true,
            })}
            href="/dashboard/login"
          >
            Login
          </Link>
        ) : (
          <Link
            className={classNames({
              "text-zinc-500": "/dashboard/login" !== currentPath,
              "hover:text-yellow-600": true,
            })}
            href="#"
            onClick={() => {
              removeAuthentication();
              signOut({
                callbackUrl: "/dashboard/login",
              });
              // use redirect: false for using router.push()
              // router.push("/dashboard/login");
            }}
          >
            Logout
          </Link>
        )}
      </Box>
    </nav>
  );
};

export default NavBar;

// /api/auth/signin
// /api/auth/signout
