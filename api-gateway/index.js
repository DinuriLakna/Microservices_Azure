const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const app = express();
app.use(cors({                              // ← add this block
  origin: 'http://localhost:3000',          // allow your React dev server
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));
app.use('/items', createProxyMiddleware({
  target: 'http://item-service:5001',
  changeOrigin: true,
  logLevel: 'debug',
  pathRewrite: {
    '^/items': ''          // ← remove /items prefix → backend gets /
  }
}));

app.use('/orders', createProxyMiddleware({
  target: 'http://order-service:5002',
  changeOrigin: true,
  logLevel: 'debug',
  pathRewrite: {
    '^/orders': ''
  }
}));

app.use('/payments', createProxyMiddleware({
  target: 'http://payment-service:5003',
  changeOrigin: true,
  logLevel: 'debug',
  pathRewrite: {
    '^/payments': ''
  }
}));


app.listen(5000, () => console.log("Gateway running on 5000"));