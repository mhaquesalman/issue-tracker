// export { default } from "next-auth/middleware";
import { NextRequest } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // console.log("middleware token ", req.nextauth.token);
    // console.log("middleware token 2", req.nextUrl.pathname);
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        // console.log("middleware callbacks token ", token);
        return Boolean(token);
      },
    },
  }
);

export const config = {
  matcher: ["/issues/new", "/issues/edit/:id+"],
};

// matcher: ["/issues/new", "/issues/edit/:id+"],

/* export default withAuth(
  function middleware(req) {
    console.log("middleware token ", req.nextauth.token);
  },
  {
  callbacks: {
    authorized: ({ req, token }) => {
      console.log("middleware callbacks token ", token);
      if (req.nextUrl.pathname === "/issues/new") {
        return token?.role === "admin";
      }
      return Boolean(token);
    },
  },
}); */
