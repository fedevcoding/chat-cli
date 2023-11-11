import express, { Express } from "express";

import publicChannelsRouter from "@/routes/publicChannels";

export const useRoutes = (app: Express) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/publicChannels", publicChannelsRouter);
};
