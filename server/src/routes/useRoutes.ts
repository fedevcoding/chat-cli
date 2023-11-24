import express, { Express } from "express";

import publicChannelsRouter from "@/routes/publicChannels";
import privateChannelsRouter from "@/routes/privateChannels";

export const useRoutes = (app: Express) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/publicChannels", publicChannelsRouter);
  app.use("/privateChannels", privateChannelsRouter);
};
