function Home() {
  return (
    <div className="container" style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="card" style={{ textAlign: "center", maxWidth: "700px" }}>
        <h1 style={{ fontSize: "3.8rem", background: "linear-gradient(to right, #6366f1, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Microservices Dashboard 🚀
        </h1>
        <p style={{ fontSize: "1.5rem", color: "#4f46e5", margin: "2rem 0 1.5rem", fontWeight: 500 }}>
          Welcome to your powerful system
        </p>
        <p style={{ fontSize: "1.3rem", color: "#6b7280", lineHeight: 1.6 }}>
          Manage <strong>Items</strong> • <strong>Orders</strong> • <strong>Payments</strong> in real-time with style
        </p>
      </div>
    </div>
  );
}

export default Home;