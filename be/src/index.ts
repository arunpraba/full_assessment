import express from "express";
import bodyParser from "body-parser";
import { nanoid } from "nanoid";
import cors from "cors";
import { PORT } from "./constants/index";

import { prisma } from "./db/index";

const app = express();

app.use(bodyParser.json({ type: "application/json" }));

app.use(cors());
app.get("/:shortCode", async (req, res) => {
  const shortCode = req.params.shortCode;
  const originalUrl = await prisma.urlShortener.findFirst({
    where: { short_url: shortCode },
    select: {
      original_url: true,
    },
  });
  if (!originalUrl) {
    return res.status(404).json({ message: "Short code not found" });
  }
  res.status(302).json({ original_url: originalUrl.original_url });
});

app.post("/shorten", async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }
  // Check url exist is db
  const originalUrl = await prisma.urlShortener.findFirst({
    where: { original_url: url },
  });
  // If exist, return the short url
  if (originalUrl) {
    return res.status(200).json({ short_url: originalUrl.short_url });
  }

  // If not exist, create a new short url
  const shortCode = nanoid(9);
  const newUrl = await prisma.urlShortener.create({
    data: {
      original_url: url,
      short_url: shortCode,
    },
    select: {
      short_url: true,
    },
  });

  // Return the short url
  res.status(201).json({ short_url: newUrl.short_url });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
