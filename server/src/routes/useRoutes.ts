import { Express } from "express";

import publicChannelsRouter from "@/routes/publicChannels";

export const useRoutes = (app: Express) => {
  app.use("/publicChannels", publicChannelsRouter);
};
