import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddItem() {
  const [form, setForm] = useState({
    name: '',
    price: '',
    purchaseDate: '',
    expiryDate: '',
    category: '',
  });

  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/grocery", form);
      navigate("/");
    } catch (err) {
      console.error("Error adding item:", err);
    }
  };

  return (
    <div>
      <h2>Add Grocery Item</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="price" type="number" placeholder="Price" onChange={handleChange} required />
        <input name="purchaseDate" type="date" onChange={handleChange} required />
        <input name="expiryDate" type="date" onChange={handleChange} required />
        <input name="category" placeholder="Category" onChange={handleChange} required />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddItem;
