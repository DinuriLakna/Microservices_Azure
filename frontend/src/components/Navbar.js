import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const linkStyle = (path) => ({
    color: "white",
    textDecoration: "none",
    padding: "10px 15px",
    borderRadius: "6px",
    backgroundColor: location.pathname === path ? "#444" : "transparent"
  });

  return (
    <nav style={{
      background: "#4f46e5",
      padding: "10px 20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      
      <h2 style={{ color: "white" }}>🚀 MicroDash</h2>

      <div>
        <Link to="/" style={linkStyle("/")}>Home</Link>
        <Link to="/items" style={linkStyle("/items")}>Items</Link>
        <Link to="/orders" style={linkStyle("/orders")}>Orders</Link>
        <Link to="/payments" style={linkStyle("/payments")}>Payments</Link>
      </div>
    </nav>
  );
}

export default Navbar;