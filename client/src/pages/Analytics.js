import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Analytics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:4000/api/analytics")
      .then(res => setData(res.data))
      .catch(err => console.error("Error loading analytics:", err));
  }, []);

  if (!data) return <p>Loading analytics...</p>;

  return (
    <div>
      <h2>Grocery Analytics & Suggestions</h2>

      <p><strong>Total Items:</strong> {data.totalItems}</p>
      <p><strong>Total Spent:</strong> ₹{data.totalSpent.toFixed(2)}</p>

      <h3>Items About to Expire (within 7 days):</h3>
      <ul>
        {data.soonExpiryItems.length === 0 ? <li>None</li> :
          data.soonExpiryItems.map(item => (
            <li key={item._id}>{item.name} - Expires on {new Date(item.expiryDate).toLocaleDateString()}</li>
          ))
        }
      </ul>

      <h3>Expired Items:</h3>
      <ul>
        {data.expiredItems.length === 0 ? <li>None</li> :
          data.expiredItems.map(item => (
            <li key={item._id}>{item.name} - Expired on {new Date(item.expiryDate).toLocaleDateString()}</li>
          ))
        }
      </ul>

      <h3>Popular Categories:</h3>
      <ul>
        {data.popularCategories.map(cat => (
          <li key={cat.category}>{cat.category} - {cat.count} item(s)</li>
        ))}
      </ul>

      <h3>Smart Suggestions - What to Rebuy:</h3>
      <ul>
        {data.toRebuy.length === 0 ? <li>Nothing to rebuy now.</li> :
          data.toRebuy.map(item => (
            <li key={item._id}>{item.name} (Category: {item.category})</li>
          ))
        }
      </ul>
    </div>
  );
}

export default Analytics;
