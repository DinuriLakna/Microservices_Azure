// item-service/index.js
const express = require('express');
const app = express();
app.use(express.json());


let items = ["Book", "Laptop"];

app.get('/', (req, res) => res.json(items));

app.post('/', (req, res) => {
  items.push(req.body.name);
  res.json({ message: "Item added" });
});

app.get('/:id', (req, res) => {
  const item = items[req.params.id];
  if (!item) return res.status(404).json({ error: "Item not found" });
  res.json(item);
});
app.listen(5001, () => console.log("Item service running on 5001"));