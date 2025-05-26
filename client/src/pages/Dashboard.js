import React, { useState, useEffect, useRef } from "react";
import { useUser } from "@clerk/clerk-react";

const Dashboard = () => {
  const { user } = useUser();
  const stockedDays = 7;

  // Sample items, empty array to test "no items" message
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Apples",
      category: "Fruit",
      price: "$3.00",
      quantity: 5,
      useBy: "2025-06-01",
      usageFrequency: "Weekly",
    },
    {
      id: 2,
      name: "Milk",
      category: "Dairy",
      price: "$2.50",
      quantity: 1,
      useBy: "2025-05-28",
      usageFrequency: "Daily",
    },
  ]);

  // Context menu state
  const [contextMenu, setContextMenu] = useState(null); // { mouseX, mouseY, itemId }
  const contextMenuRef = useRef(null);

  // Close context menu on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
        setContextMenu(null);
      }
    }
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  // Handle right click on a row
  const handleContextMenu = (event, itemId) => {
    event.preventDefault();
    setContextMenu({
      mouseX: event.clientX + 2,
      mouseY: event.clientY - 6,
      itemId,
    });
  };

  const handleEdit = (itemId) => {
    alert(`Edit item with id: ${itemId}`);
    setContextMenu(null);
  };

  const handleDelete = (itemId) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setItems((prev) => prev.filter((item) => item.id !== itemId));
    }
    setContextMenu(null);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      {/* Header */}
      <header style={{ marginBottom: "2rem" }}>
        <h1>Welcome {user?.firstName || "User"}!</h1>
        <p>
          You are stocked for <strong>{stockedDays} days</strong>
        </p>
      </header>

      {/* Bottom split */}
      <div style={{ display: "flex", height: "60vh" }}>
        {/* Left panel */}
        <nav
          style={{
            flex: "1",
            borderRight: "1px solid #ccc",
            paddingRight: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <button style={buttonStyle}>Restock soon</button>
          <button style={buttonStyle}>Consider skipping</button>
          <button style={buttonStyle}>Use up items</button>
        </nav>

        {/* Right panel */}
        <main style={{ flex: "3", paddingLeft: "1rem", display: "flex", flexDirection: "column" }}>
          {/* Header and Add */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <h2>Here are your items</h2>
            <button style={addButtonStyle} onClick={() => alert("Add item clicked!")}>
              + Add
            </button>
          </div>

          {/* Conditional table or no items message */}
          {items.length === 0 ? (
            <p>You have no items.</p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={thTdStyle}>Item Name</th>
                  <th style={thTdStyle}>Category</th>
                  <th style={thTdStyle}>Price</th>
                  <th style={thTdStyle}>Quantity</th>
                  <th style={thTdStyle}>Use By</th>
                  <th style={thTdStyle}>Usage Frequency</th>
                </tr>
              </thead>
              <tbody>
                {items.map(({ id, name, category, price, quantity, useBy, usageFrequency }) => (
                  <tr
                    key={id}
                    style={{ borderBottom: "1px solid #ddd", cursor: "context-menu" }}
                    onContextMenu={(e) => handleContextMenu(e, id)}
                  >
                    <td style={thTdStyle}>{name}</td>
                    <td style={thTdStyle}>{category}</td>
                    <td style={thTdStyle}>{price}</td>
                    <td style={thTdStyle}>{quantity}</td>
                    <td style={thTdStyle}>{useBy}</td>
                    <td style={thTdStyle}>{usageFrequency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Context menu */}
          {contextMenu && (
            <ul
              ref={contextMenuRef}
              style={{
                position: "fixed",
                top: contextMenu.mouseY,
                left: contextMenu.mouseX,
                backgroundColor: "white",
                boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
                listStyle: "none",
                padding: "8px 0",
                margin: 0,
                borderRadius: "4px",
                zIndex: 1000,
                width: "120px",
              }}
            >
              <li
                style={contextMenuItemStyle}
                onClick={() => handleEdit(contextMenu.itemId)}
              >
                Edit
              </li>
              <li
                style={contextMenuItemStyle}
                onClick={() => handleDelete(contextMenu.itemId)}
              >
                Delete
              </li>
            </ul>
          )}
        </main>
      </div>
    </div>
  );
};

const buttonStyle = {
  padding: "12px",
  fontSize: "16px",
  borderRadius: "6px",
  border: "1px solid #3f51b5",
  backgroundColor: "white",
  color: "#3f51b5",
  cursor: "pointer",
  textAlign: "left",
};

const addButtonStyle = {
  padding: "8px 16px",
  fontSize: "16px",
  borderRadius: "6px",
  border: "none",
  backgroundColor: "#3f51b5",
  color: "white",
  cursor: "pointer",
};

const thTdStyle = {
  padding: "8px",
  textAlign: "left",
};

const contextMenuItemStyle = {
  padding: "8px 16px",
  cursor: "pointer",
  userSelect: "none",
};

export default Dashboard;
