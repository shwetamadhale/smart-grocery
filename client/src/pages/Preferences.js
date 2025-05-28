import React, { useState } from "react";

const CUISINES = ["Italian", "Chinese", "Mexican", "Indian", "Thai"];
const ALLERGIES = ["None", "Peanuts", "Dairy", "Gluten", "Shellfish"];
const DIETS = ["No diet", "Keto", "Vegetarian", "Pescetarian", "Vegan"];

export default function Preferences({ onNext }) {
  const [form, setForm] = useState({
    favoriteCuisines: [],
    customCuisine: "",
    allergies: [],
    customAllergy: "",
    diet: "No diet",
    customDiet: "",
    flavorProfile: {
      spicy: 1,
      sweet: 1,
      savory: 1,
      sour: 1,
      salty: 1,
    },
    staplePreferences: "",
    mealPreferences: {
      breakfast: 0,
      lunch: 0,
      dinner: 0,
      snacks: 0,
    },
    cookingSkills: "Beginner",
    toolsAvailable: [],
  });

  // Helper: toggle multi-select arrays (cuisines, allergies, tools)
  const toggleArrayValue = (key, value) => {
    setForm((f) => {
      const arr = f[key];
      if (arr.includes(value)) {
        return { ...f, [key]: arr.filter((v) => v !== value) };
      } else {
        return { ...f, [key]: [...arr, value] };
      }
    });
  };

  // Tools list
  const TOOLS = ["Oven", "Microwave", "Air Fryer", "Blender", "Instant Pot", "Grill", "N/A"];

  // Cooking skill options
  const COOKING_SKILLS = ["Beginner", "Intermediate", "Advanced"];

  const handleFlavorChange = (flavor, val) => {
    setForm((f) => ({
      ...f,
      flavorProfile: {
        ...f.flavorProfile,
        [flavor]: val,
      },
    }));
  };

  const handleMealPrefChange = (meal, val) => {
    setForm((f) => ({
      ...f,
      mealPreferences: {
        ...f.mealPreferences,
        [meal]: val,
      },
    }));
  };

  // On Next click: prepare data (combine custom inputs with dropdowns)
  const handleNext = () => {
    const data = {
      favoriteCuisines: form.favoriteCuisines.concat(form.customCuisine ? [form.customCuisine] : []),
      allergies: form.allergies.includes("None") && form.allergies.length === 1
        ? []
        : form.allergies.concat(form.customAllergy ? [form.customAllergy] : []),
      diet: form.customDiet || form.diet,
      flavorProfile: form.flavorProfile,
      staplePreferences: form.staplePreferences,
      mealPreferences: form.mealPreferences,
      cookingSkills: form.cookingSkills,
      toolsAvailable: form.toolsAvailable,
    };
    onNext(data);
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <h2>User Preferences</h2>

      <label>Favorite Cuisines (multi-select):</label>
      <div>
        {CUISINES.map((c) => (
          <label key={c} style={{ marginRight: 10 }}>
            <input
              type="checkbox"
              checked={form.favoriteCuisines.includes(c)}
              onChange={() => toggleArrayValue("favoriteCuisines", c)}
            />
            {c}
          </label>
        ))}
        <input
          type="text"
          placeholder="Add custom cuisine"
          value={form.customCuisine}
          onChange={(e) => setForm({ ...form, customCuisine: e.target.value })}
          style={{ marginLeft: 10 }}
        />
      </div>

      <label>Allergies (multi-select):</label>
      <div>
        {ALLERGIES.map((a) => (
          <label key={a} style={{ marginRight: 10 }}>
            <input
              type="checkbox"
              checked={form.allergies.includes(a)}
              onChange={() => {
                if (a === "None") {
                  // If None selected, reset all other allergies
                  setForm({ ...form, allergies: ["None"] });
                } else {
                  setForm((f) => {
                    let newAllergies = [...f.allergies];
                    if (newAllergies.includes("None")) {
                      newAllergies = newAllergies.filter((x) => x !== "None");
                    }
                    if (newAllergies.includes(a)) {
                      newAllergies = newAllergies.filter((x) => x !== a);
                    } else {
                      newAllergies.push(a);
                    }
                    return { ...f, allergies: newAllergies };
                  });
                }
              }}
            />
            {a}
          </label>
        ))}
        <input
          type="text"
          placeholder="Add custom allergy"
          value={form.customAllergy}
          onChange={(e) => setForm({ ...form, customAllergy: e.target.value })}
          style={{ marginLeft: 10 }}
        />
      </div>

      <label>Diet:</label>
      <select
        value={form.diet}
        onChange={(e) => setForm({ ...form, diet: e.target.value, customDiet: "" })}
      >
        {DIETS.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Add custom diet"
        value={form.customDiet}
        onChange={(e) => setForm({ ...form, customDiet: e.target.value })}
        style={{ marginLeft: 10 }}
      />

      <h3>Flavor Profile (1 = Mild/Low to 3 = High/Intense)</h3>
      {["spicy", "sweet", "savory", "sour", "salty"].map((flavor) => (
        <div key={flavor}>
          <label style={{ textTransform: "capitalize" }}>{flavor}:</label>
          <input
            type="range"
            min={1}
            max={3}
            value={form.flavorProfile[flavor]}
            onChange={(e) => handleFlavorChange(flavor, +e.target.value)}
          />
          <span style={{ marginLeft: 10 }}>{form.flavorProfile[flavor]}</span>
        </div>
      ))}

      <label>Staple Preferences (comma separated):</label>
      <input
        type="text"
        placeholder="e.g. rice, bread, eggs"
        value={form.staplePreferences}
        onChange={(e) => setForm({ ...form, staplePreferences: e.target.value })}
        style={{ width: "100%" }}
      />

      <h3>Meal Preferences - frequency cooked per week (0-7)</h3>
      {["breakfast", "lunch", "dinner", "snacks"].map((meal) => (
        <div key={meal}>
          <label style={{ textTransform: "capitalize" }}>{meal}:</label>
          <input
            type="number"
            min={0}
            max={7}
            value={form.mealPreferences[meal]}
            onChange={(e) => handleMealPrefChange(meal, +e.target.value)}
          />
        </div>
      ))}

      <label>Cooking Skills:</label>
      <select
        value={form.cookingSkills}
        onChange={(e) => setForm({ ...form, cookingSkills: e.target.value })}
      >
        {COOKING_SKILLS.map((skill) => (
          <option key={skill} value={skill}>
            {skill}
          </option>
        ))}
      </select>

      <label>Tools Available (multi-select):</label>
      <div>
        {TOOLS.map((tool) => (
          <label key={tool} style={{ marginRight: 10 }}>
            <input
              type="checkbox"
              checked={form.toolsAvailable.includes(tool)}
              onChange={() => toggleArrayValue("toolsAvailable", tool)}
            />
            {tool}
          </label>
        ))}
      </div>

      <button onClick={handleNext} style={{ marginTop: 20 }}>
        Next: Budget
      </button>
    </div>
  );
}
