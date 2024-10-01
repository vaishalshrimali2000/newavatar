"use client";

import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

instance.interceptors.response.use(
  (res: any) => {
    // console.log("res:", res);
    if (res?.config?.method === "get") {
      if (res.headers["content-type"].includes("application/json")) {
        return res;
      } else {
        throw new Error("Unexpected response format");
      }
    } else {
      return res;
    }
  },
  async (err) => {
    // console.log("err:", err);
    if (err?.response?.status === 404) {
      window.location.href = "/";
      return;
    }
  }
);

export default instance;
