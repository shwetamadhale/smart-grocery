import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddItem from './pages/AddItem';
import EditItem from './pages/EditItem';
import Analytics from './pages/Analytics';

function App() {
  return (
    <Router>
      <div>
        <h1>Smart Grocery</h1>
        
        <nav>
          <Link to="/">Dashboard</Link> | <Link to="/add">Add Item</Link> | <Link to="/analytics">Analytics</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<AddItem />} />
          <Route path="/edit/:id" element={<EditItem />} />
          <Route path="/analytics" element={<Analytics />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
