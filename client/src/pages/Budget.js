import React, { useState } from "react";

export default function Budget({ onBack, onSubmit }) {
  const [budgetData, setBudgetData] = useState({
    durationWeeks: 4,
    amount: 100,
  });

  const handleSubmit = () => {
    onSubmit(budgetData);
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <h2>Set Your Budget</h2>

      <label>Budget Duration (weeks): {budgetData.durationWeeks}</label>
      <input
        type="range"
        min={1}
        max={12}
        value={budgetData.durationWeeks}
        onChange={(e) => setBudgetData({ ...budgetData, durationWeeks: +e.target.value })}
      />

      <label style={{ marginTop: 20 }}>Budget Amount ($): {budgetData.amount}</label>
      <input
        type="range"
        min={10}
        max={1000}
        step={10}
        value={budgetData.amount}
        onChange={(e) => setBudgetData({ ...budgetData, amount: +e.target.value })}
      />

      <div style={{ marginTop: 30 }}>
        <button onClick={onBack}>Back: Preferences</button>
        <button onClick={handleSubmit} style={{ marginLeft: 10 }}>
          Save & Continue
        </button>
      </div>
    </div>
  );
}
