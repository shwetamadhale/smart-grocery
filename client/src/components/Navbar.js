import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ padding: 10, backgroundColor: "#eee" }}>
      <Link to="/" style={{ marginRight: 10 }}>Dashboard</Link>
      <Link to="/add">Add Item</Link>
    </nav>
  );
};

export default Navbar;
