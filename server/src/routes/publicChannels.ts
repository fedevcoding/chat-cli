import { addPublicChannel, getPublicChannels, removePublicChannel } from "@/cache/publicChannels";
import { getRandomId } from "@/utils";
import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  const channels = getPublicChannels();

  res.send(channels);
});

router.post("/", (req, res) => {
  const { name } = req.body;
  const channel: PUBLIC_CHANNEL = {
    id: getRandomId(),
    name,
    type: "public",
    users: [],
  };
  addPublicChannel(channel);

  res.send(channel);
});

router.delete("/", (req, res) => {
  const { id } = req.body;
  removePublicChannel(id);

  res.send(id);
});

export default router;
