import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello world!");
});

router.post("/", (req, res) => {
  res.send("Hello world!");
});

router.delete("/", (req, res) => {
  res.send("Hello world!");
});

export default router;
