import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    price: '',
    purchaseDate: '',
    expiryDate: '',
    category: '',
  });

  useEffect(() => {
    axios.get(`http://localhost:4000/api/grocery/${id}`)
      .then(res => {
        const data = res.data;
        setForm({
          name: data.name,
          price: data.price,
          purchaseDate: data.purchaseDate.split('T')[0],
          expiryDate: data.expiryDate.split('T')[0],
          category: data.category,
        });
      })
      .catch(err => console.error("Error fetching item:", err));
  }, [id]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.put(`http://localhost:4000/api/grocery/${id}`, form)
      .then(() => navigate('/'))
      .catch(err => console.error("Error updating item:", err));
  };

  return (
    <div>
      <h2>Edit Grocery Item</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} required />
        <input name="price" type="number" value={form.price} onChange={handleChange} required />
        <input name="purchaseDate" type="date" value={form.purchaseDate} onChange={handleChange} required />
        <input name="expiryDate" type="date" value={form.expiryDate} onChange={handleChange} required />
        <input name="category" value={form.category} onChange={handleChange} required />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditItem;
