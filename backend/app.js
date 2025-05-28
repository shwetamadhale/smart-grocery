const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

const GroceryItem = require("./models/GroceryItem"); // <- Move grocery schema into its own file
const UserPreferences = require("./models/UserPreferences");

// Save or update user preferences
app.post("/api/preferences", async (req, res) => {
  const { clerkUserId, ...preferencesData } = req.body;

  try {
    let userPrefs = await UserPreferences.findOne({ clerkUserId });

    if (userPrefs) {
      userPrefs = await UserPreferences.findOneAndUpdate(
        { clerkUserId },
        preferencesData,
        { new: true }
      );
    } else {
      userPrefs = new UserPreferences({ clerkUserId, ...preferencesData });
      await userPrefs.save();
    }

    res.status(200).json(userPrefs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET preferences for user
app.get("/api/preferences/:clerkUserId", async (req, res) => {
  try {
    const userPrefs = await UserPreferences.findOne({ clerkUserId: req.params.clerkUserId });
    if (!userPrefs) return res.status(404).json({ message: "Preferences not found" });
    res.json(userPrefs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new grocery item
app.post("/api/grocery", async (req, res) => {
  try {
    const newItem = new GroceryItem(req.body); // contains clerkUserId
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all grocery items for a user
app.get("/api/grocery/:clerkUserId", async (req, res) => {
  try {
    const items = await GroceryItem.find({ clerkUserId: req.params.clerkUserId });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

