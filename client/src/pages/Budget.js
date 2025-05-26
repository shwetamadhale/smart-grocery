import React from "react";
import { useNavigate } from "react-router-dom";

const Budget = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    // Save budget (optional)
    navigate("/dashboard");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Set Your Monthly Grocery Budget</h2>
      <input type="number" placeholder="Enter amount in $" /><br />
      <button onClick={handleNext}>Continue to Dashboard</button>
    </div>
  );
};

export default Budget;
