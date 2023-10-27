import crypto from "crypto";
import log from "npmlog";

export const IS_DEVELOPMENT = process.env.NODE_ENV === "development";
export const parseBlob = (blob: Buffer) => {
  return JSON.parse(blob.toString());
};

export const removeLastLine = () => {
  process.stdout.moveCursor(0, -1);
  process.stdout.clearLine(1);
};

export const getRandomId = (): string => crypto.randomUUID();

export const logger = log;
