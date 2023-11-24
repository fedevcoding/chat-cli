import { addPrivateChannel, getPivateChannels } from "@/cache/privateChannels";
import { getRandomId, handleServerError } from "@/utils";
import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  try {
    const channels = getPivateChannels();

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

    const channel: PRIVATE_CHANNEL = {
      id: getRandomId(),
      name,
      type: "private",
      password: password,
      users: 0,
    };
    addPrivateChannel(channel);

    res.send(channel);
  } catch (e) {
    handleServerError(e, res);
  }
});

export default router;
