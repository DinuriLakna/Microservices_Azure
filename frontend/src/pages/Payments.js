import { useState } from "react";

const API = "http://localhost:5000";

function Payments() {
  const [payments, setPayments] = useState([]);
  const [orderId, setOrderId] = useState("");
  const [amount, setAmount] = useState("");

  const loadPayments = async () => {
    const res = await fetch(`${API}/payments`);
    const data = await res.json();
    setPayments(data);
  };

  const processPayment = async () => {
    await fetch(`${API}/payments/process`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        orderId: Number(orderId),
        amount: Number(amount),
        method: "CARD"
      }),
    });

    setOrderId("");
    setAmount("");
    loadPayments();
  };

  return (
    <div className="page">
      <div className="page-banner pink">
        <h1>💳 Payments</h1>
        <p>Process payments securely</p>
      </div>

      <div className="card">
        <div className="form-grid">
          <input
            className="input"
            placeholder="Order ID"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
          />
          <input
            className="input"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div style={{ marginTop: "15px" }}>
          <button className="btn btn-pink" onClick={processPayment}>
            💰 Pay
          </button>
          <button className="btn btn-outline" onClick={loadPayments}>
            ↻ Refresh
          </button>
        </div>
      </div>

      <div className="card">
        <h2>Payments</h2>

        {payments.map((p) => (
          <div key={p.id} className="item-row">
            Order #{p.orderId} — ${p.amount} — {p.status}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Payments;