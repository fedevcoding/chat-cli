import express, { Express } from "express";
import requestIp from "request-ip";

import publicChannelsRouter from "@/routes/publicChannels";
import privateChannelsRouter from "@/routes/privateChannels";
import { LIMITER } from "@/constants";

export const useRoutes = (app: Express) => {
  app.use(requestIp.mw());
  app.use(LIMITER);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/publicChannels", publicChannelsRouter);
  app.use("/privateChannels", privateChannelsRouter);
};
