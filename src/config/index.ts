const isLocalDev = process.env.NODE_ENV !== "Production";

export const CONFIG = {
  isLocalDev,
  serverPort: process.env.PORT || "8080",

  apiVersion: process.env.MAJOR_VERSION || "v1",
};
