const mongoose = require("mongoose");

const grocerySchema = new mongoose.Schema({
  clerkUserId: { type: String, required: true }, // tie groceries to user
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  purchaseDate: { type: Date, required: true },
  expiryDate: { type: Date, required: true },
  usageFrequency: { type: Number, default: 0 } // weekly/monthly usage count
}, { timestamps: true });

module.exports = mongoose.model("GroceryItem", grocerySchema);
