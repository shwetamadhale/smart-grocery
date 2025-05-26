const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Enable CORS for frontend
const corsOptions = {
  origin: "http://localhost:3000", // React frontend
};
app.use(cors(corsOptions));
app.use(express.json()); // For parsing JSON bodies

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Grocery Item Schema & Model
const grocerySchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  purchaseDate: { type: Date, required: true },
  expiryDate: { type: Date, required: true },
  category: { type: String, required: true },
});

const GroceryItem = mongoose.model("GroceryItem", grocerySchema);

// Routes
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User");

require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error("FATAL ERROR: JWT_SECRET is not defined in .env");
  process.exit(1);
}

// Register user
app.post("/api/auth/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: "7d" });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login user
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all grocery items
app.get("/api/grocery", async (req, res) => {
  try {
    const items = await GroceryItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single grocery item by ID
app.get("/api/grocery/:id", async (req, res) => {
  try {
    const item = await GroceryItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create new grocery item
app.post("/api/grocery", async (req, res) => {
  try {
    const newItem = new GroceryItem(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update grocery item by ID
app.put("/api/grocery/:id", async (req, res) => {
  try {
    const updatedItem = await GroceryItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedItem) return res.status(404).json({ message: "Item not found" });
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE grocery item by ID
app.delete("/api/grocery/:id", async (req, res) => {
  try {
    const deletedItem = await GroceryItem.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ message: "Item not found" });
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET analytics & suggestions
app.get("/api/analytics", async (req, res) => {
  try {
    const items = await GroceryItem.find();

    const totalItems = items.length;
    const totalSpent = items.reduce((sum, item) => sum + item.price, 0);

    const now = new Date();

    // Items about to expire (within 7 days)
    const soonExpiryItems = items.filter(item => {
      const expiry = new Date(item.expiryDate);
      const daysLeft = (expiry - now) / (1000 * 60 * 60 * 24);
      return daysLeft >= 0 && daysLeft <= 7;
    });

    // Items already expired
    const expiredItems = items.filter(item => new Date(item.expiryDate) < now);

    // Count items per category
    const categoryCount = {};
    items.forEach(item => {
      categoryCount[item.category] = (categoryCount[item.category] || 0) + 1;
    });

    const popularCategories = Object.entries(categoryCount)
      .sort((a, b) => b[1] - a[1])
      .map(([category, count]) => ({ category, count }));

    const toRebuy = [...soonExpiryItems, ...expiredItems];

    res.json({
      totalItems,
      totalSpent,
      soonExpiryItems,
      expiredItems,
      popularCategories,
      toRebuy,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Root route to fix "Cannot GET /"
app.get("/", (req, res) => {
  res.send("Smart Grocery Backend is running 🚀");
});

//Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
