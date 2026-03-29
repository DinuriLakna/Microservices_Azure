// payment-service/index.js
const express = require('express');
const app = express();
app.use(express.json());

let payments = [];
let id = 1;

app.get('/', (req, res) => res.json(payments));

app.post('/process', (req, res) => {
  const payment = { id: id++, ...req.body, status: "SUCCESS" };
  payments.push(payment);
  res.json(payment);
});

app.get('/:id', (req, res) => {
  const payment = payments.find(p => p.id == req.params.id);
  if (!payment) return res.status(404).json({ error: "Not found" });
  res.json(payment);
});

app.listen(5003, () => console.log("Payment running on 5003"));