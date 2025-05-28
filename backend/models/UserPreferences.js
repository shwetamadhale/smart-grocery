const mongoose = require("mongoose");

const preferencesSchema = new mongoose.Schema({
  clerkUserId: { type: String, required: true, unique: true },
  favoriteCuisines: [String],
  allergies: [String],
  diet: String,
  flavorProfile: {
    spicy: Number,
    sweet: Number,
    savory: Number,
    sour: Number,
    salty: Number,
  },
  staples: [String],
  mealPreferences: {
    breakfast: Number,
    lunch: Number,
    dinner: Number,
    snacks: Number,
  },
  cookingSkill: String,
  toolsAvailable: [String],
  budget: {
    durationDays: Number,
    amount: Number,
  },
  hasCompletedOnboarding: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("UserPreferences", preferencesSchema);
