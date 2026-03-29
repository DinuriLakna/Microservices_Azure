import { useState, useEffect } from "react";

const API = "http://localhost:5000";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [formData, setFormData] = useState({
    item: "",
    quantity: 1,
    customerId: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    const res = await fetch(`${API}/orders`);
    const data = await res.json();
    setOrders(data);
  };

  const createOrder = async () => {
    if (!formData.item || !formData.customerId) {
      setError("Fill all fields");
      return;
    }

    await fetch(`${API}/orders`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(formData),
    });

    setFormData({ item: "", quantity: 1, customerId: "" });
    setError(null);
    loadOrders();
  };

  return (
    <div className="page">
      <div className="page-banner purple">
        <h1>📦 Orders</h1>
        <p>Create and manage orders</p>
      </div>

      <div className="card">
        <div className="form-grid">
          <input
            className="input"
            placeholder="Item"
            value={formData.item}
            onChange={(e) => setFormData({...formData, item: e.target.value})}
          />
          <input
            className="input"
            type="number"
            value={formData.quantity}
            onChange={(e) => setFormData({...formData, quantity: e.target.value})}
          />
          <input
            className="input"
            placeholder="Customer ID"
            value={formData.customerId}
            onChange={(e) => setFormData({...formData, customerId: e.target.value})}
          />
        </div>

        <div style={{ marginTop: "15px" }}>
          <button className="btn btn-purple" onClick={createOrder}>
            ➕ Create Order
          </button>
          <button className="btn btn-outline" onClick={loadOrders}>
            ↻ Refresh
          </button>
        </div>

        {error && <div className="alert alert-error">{error}</div>}
      </div>

      <div className="card">
        <h2>Order List</h2>

        {orders.map((o) => (
          <div key={o.id} className="item-row">
            #{o.id} - {o.item} ({o.quantity}) — {o.status}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;