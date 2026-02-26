import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";
import Card from "../src/models/Card.js";
import User from "../src/models/User.js";
import { seedCards } from "./config/seedCardsConfig.js";

const MONGO_URI = "mongodb://mongo:27017/flashcards";

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);

    console.log("Connected to Mongo");

    const uploadsPath = path.resolve("uploads");
    const seedImagesPath = path.resolve("seed/images");

    await createAdminUser();

    for (const card of seedCards) {
      const existing = await Card.findOne({ text: card.text });

      if (existing) {
        console.log(`Card "${card.text}" already exists — skipping`);
        continue;
      }

      // copy image if exists
      if (card.imageUrl) {
        const imageName = path.basename(card.imageUrl);
        const sourcePath = path.join(seedImagesPath, imageName);

        if (!fs.existsSync(sourcePath)) {
          console.warn(`Image ${imageName} not found in seed/images`);
        } else {
          const destPath = path.join(uploadsPath, imageName);
          fs.copyFileSync(sourcePath, destPath);
          console.log(`Copied ${imageName} to uploads`);
        }
      }

      await Card.create({
        text: card.text,
        level: card.level,
        imageUrl: `/uploads/${card.imageUrl}`,
        meanings: card.meanings,
        category: card.category,
      });

      console.log(`Card "${card.text}" inserted`);
    }

    console.log("Database seeded successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

async function createAdminUser() {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  if (await User.findOne({ username: "admin" })) {
    console.log("Admin user already exists — skipping");
    return;
  }

  await User.create({
    username: "admin",
    password: hashedPassword,
    role: "ADMIN",
  });
}

seed();
