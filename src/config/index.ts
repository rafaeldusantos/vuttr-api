const isLocalDev = process.env.NODE_ENV !== "production";

export const CONFIG = {
  isLocalDev,
  serverPort: process.env.SERVER_PORT || "3000",

  apiVersion: process.env.MAJOR_VERSION || "v1",
};
