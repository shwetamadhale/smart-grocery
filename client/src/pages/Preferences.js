import React from "react";
import { useNavigate } from "react-router-dom";

const Preferences = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    // Save preferences (optional)
    navigate("/budget");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>What are your dietary preferences?</h2>
      <label><input type="checkbox" /> Vegetarian</label><br />
      <label><input type="checkbox" /> Vegan</label><br />
      <label><input type="checkbox" /> Gluten-Free</label><br />
      <label><input type="checkbox" /> Keto</label><br />
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default Preferences;
