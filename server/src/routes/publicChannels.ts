import { addPublicChannel, getPublicChannels, removePublicChannel } from "@/cache/publicChannels";
import { getRandomId, handleServerError } from "@/utils";
import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  try {
    const channels = getPublicChannels();

    res.send(channels);
  } catch (e) {
    handleServerError(e, res);
  }
});

router.post("/", (req, res) => {
  try {
    const { name } = req.body;
    const channel: PUBLIC_CHANNEL = {
      id: getRandomId(),
      name,
      type: "public",
      users: 0,
    };
    addPublicChannel(channel);

    res.send(channel);
  } catch (e) {
    handleServerError(e, res);
  }
});

router.delete("/", (req, res) => {
  try {
    const { id } = req.body;
    removePublicChannel(id);

    res.send(id);
  } catch (e) {
    handleServerError(e, res);
  }
});

export default router;
