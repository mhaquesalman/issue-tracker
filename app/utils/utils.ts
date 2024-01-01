"use client";

export const authenticate = (expireTime: string) => {
  console.log("expireTime", expireTime);
  if (typeof window !== "undefined")
    localStorage.setItem("expireTime", expireTime);
};

export const isAuthenticate = () => {
  if (typeof window !== "undefined") {
    const expireFromStorage = localStorage.getItem("expireTime");
    if (expireFromStorage) {
      const expireTime = new Date(expireFromStorage);
      if (expireTime > new Date()) return true;
      else return false;
    } else {
      return false;
    }
  }
};

export const removeAuthentication = () => {
  if (typeof window !== "undefined") localStorage.removeItem("expireTime");
};
