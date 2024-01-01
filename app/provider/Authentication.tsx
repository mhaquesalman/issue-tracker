"use client";

import React from "react";
import { isAuthenticate } from "../utils/utils";

const Authentication = () => {
  if (isAuthenticate()) {
    return <h2>Logged in....</h2>;
  } else {
    return <h2>Not Logged in...</h2>;
  }
};

export default Authentication;
