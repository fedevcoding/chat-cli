import crypto from "crypto";

export const IS_DEVELOPMENT = process.env.NODE_ENV === "development";

export const parseBlob = (blob: Buffer) => {
  return JSON.parse(blob.toString());
};
export const getRandomId = () => {
  return crypto.randomUUID();
};
