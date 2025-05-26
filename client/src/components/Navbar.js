import React from "react";
import { Link } from "react-router-dom";
import { useClerk } from "@clerk/clerk-react";

const Navbar = () => {
  const clerk = useClerk();

  const handleLogout = () => {
    clerk.signOut();
  };

  return (
    <nav style={{ padding: 10, backgroundColor: "#eee", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div>
        <Link to="/dashboard" style={{ marginRight: 10 }}>Dashboard</Link>
        <Link to="/analytics" style={{ marginRight: 10 }}>Analytics</Link>
        <Link to="/profile" style={{ marginRight: 10 }}>Profile</Link>
      </div>
      <button onClick={handleLogout} style={{ cursor: "pointer", padding: "6px 12px", borderRadius: 4, border: "none", backgroundColor: "#3f51b5", color: "white" }}>
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
