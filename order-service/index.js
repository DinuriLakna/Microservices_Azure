// order-service/index.js
const express = require('express');
const app = express();
app.use(express.json());

let orders = [];
let id = 1;

app.get('/', (req, res) => res.json(orders));

app.post('/', (req, res) => {
  const order = { id: id++, ...req.body, status: "PENDING" };
  orders.push(order);
  res.json(order);
});

app.get('/:id', (req, res) => {
  const order = orders.find(o => o.id == req.params.id);
  if (!order) return res.status(404).json({ error: "Not found" });
  res.json(order);
});

app.listen(5002, () => console.log("Order service running on 5002"));