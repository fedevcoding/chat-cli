import crypto from "crypto";
import { Response } from "express";

export const IS_DEVELOPMENT = process.env.NODE_ENV === "development";

export const parseBlob = (blob: Buffer) => {
  return JSON.parse(blob.toString());
};
export const getRandomId = () => {
  return crypto.randomUUID();
};

export const handleServerError = (e: unknown, res: Response) => {
  if (e instanceof Error) {
    res.status(500).json(e.message);
    return;
  }
  res.status(500).json({
    message: "Something went wrong",
  });
};
