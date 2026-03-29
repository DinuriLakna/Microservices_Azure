import { useState } from "react";

const API = "http://localhost:5000";

const DOT_COLORS = ["#ff6b35","#00b4a6","#7c3aed","#f59e0b","#10b981","#ec4899"];

function Items() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API}/items`);
      if (!res.ok) throw new Error(`Failed to load items (${res.status})`);
      const data = await res.json();
      setItems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addItem = async () => {
    if (!name.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() }),
      });
      if (!res.ok) throw new Error(`Failed to add item (${res.status})`);
      setName("");
      loadItems();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => { if (e.key === "Enter") addItem(); };

  return (
    <div className="page">
      <div className="page-banner orange">
        <h1><span className="banner-emoji">🛍️</span> Items Management</h1>
        <p>Add and browse your product catalogue</p>
      </div>

      <div className="card">
        <div className="form-grid" style={{ gridTemplateColumns: "1fr auto auto" }}>
          <div className="form-group">
            <label>Item name</label>
            <input
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKey}
              placeholder="e.g. Grilled Salmon Bowl"
              disabled={loading}
            />
          </div>
          <div className="form-group" style={{ display: "flex", alignItems: "flex-end" }}>
            <button
              className="btn btn-orange btn-lg"
              onClick={addItem}
              disabled={loading || !name.trim()}
            >
              {loading ? "Adding…" : "➕ Add Item"}
            </button>
          </div>
          <div className="form-group" style={{ display: "flex", alignItems: "flex-end" }}>
            <button
              className="btn btn-outline btn-lg"
              onClick={loadItems}
              disabled={loading}
            >
              {loading ? "Loading…" : "↻ Refresh"}
            </button>
          </div>
        </div>

        {error && <div className="alert alert-error">⚠️ {error}</div>}
      </div>

      <div className="card">
        <h2 className="section-heading">Catalogue</h2>

        {loading && <p className="loading-row">Loading items…</p>}

        {!loading && items.length === 0 && (
          <div className="empty-state">
            <span className="emoji">🌟</span>
            <p>No items yet — add something above!</p>
          </div>
        )}

        {items.length > 0 && (
          <div className="items-list">
            {items.map((item, i) => (
              <div key={i} className="item-row" style={{ animationDelay: `${i * 0.05}s` }}>
                <span
                  className="item-dot"
                  style={{ background: DOT_COLORS[i % DOT_COLORS.length] }}
                />
                {typeof item === "object" ? item.name : item}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Items;