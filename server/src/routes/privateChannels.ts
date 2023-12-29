import { CHANNELS, Channel } from "@/services/Channels";
import { CHANNEL_TYPES } from "@/types";
import { handleServerError } from "@/utils";
import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  try {
    const channels = CHANNELS.getChannels(CHANNEL_TYPES.PRIVATE);

    res.send(channels);
  } catch (e) {
    handleServerError(e, res);
  }
});

router.post("/", (req, res) => {
  try {
    const { name, password } = req.body;

    if (typeof name !== "string" || typeof password !== "string") {
      res.status(400).json({
        message: "Invalid request",
      });
      return;
    }

    const channel = new Channel<CHANNEL_TYPES.PRIVATE>({
      type: CHANNEL_TYPES.PRIVATE,
      name,
      password,
    });
    CHANNELS.addChannel(channel);

    res.send(channel);
  } catch (e) {
    handleServerError(e, res);
  }
});

export default router;
