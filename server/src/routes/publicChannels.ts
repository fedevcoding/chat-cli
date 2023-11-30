import { CHANNELS, Channel } from "@/services/Channels";
import { handleServerError } from "@/utils";
import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  try {
    const channels = CHANNELS.getChannels(CHANNEL_TYPES.PUBLIC);

    res.send(channels);
  } catch (e) {
    handleServerError(e, res);
  }
});

router.post("/", (req, res) => {
  try {
    const { name } = req.body;

    if (typeof name !== "string") {
      res.status(400).json({
        message: "Invalid request",
      });
      return;
    }

    const channel = new Channel<CHANNEL_TYPES.PUBLIC>({
      type: CHANNEL_TYPES.PUBLIC,
      name,
    });

    CHANNELS.addChannel(channel);

    res.send(channel);
  } catch (e) {
    handleServerError(e, res);
  }
});

export default router;
