require('newrelic')
const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;
 
app.use(express.json());
 
// Health check

app.get('/health', (req, res) => {

  res.status(200).json({ status: 'ok', uptime: process.uptime() });

});
 
// Checkout endpoint

app.get('/checkout', (req, res) => {

  res.status(200).json({ message: 'Checkout successful', timestamp: new Date() });

});
 
// Products endpoint

app.get('/products', (req, res) => {

  res.status(200).json([

    { id: 1, name: 'Product A', price: 100 },

    { id: 2, name: 'Product B', price: 200 },

  ]);

});
 
app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`);

});
 
module.exports = app;