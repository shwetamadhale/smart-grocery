import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/grocery");
      setItems(res.data);
    } catch (err) {
      console.error("Error fetching items:", err);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/grocery/${id}`);
      fetchItems();
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div>
      <h2>Your Grocery Items</h2>
      <ul>
        {items.map(item => (
          <li key={item._id}>
            <strong>{item.name}</strong> - ₹{item.price} ({item.category})<br />
            Purchased: {new Date(item.purchaseDate).toLocaleDateString()}<br />
            Expires: {new Date(item.expiryDate).toLocaleDateString()}<br />
            <Link to={`/edit/${item._id}`}>Edit</Link> | <button onClick={() => deleteItem(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
