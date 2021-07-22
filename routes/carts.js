const express = require('express');

const cartsRepo = require('../repositories/carts');

const router = express.Router();

router.post('/cart/products', (req, res) => {
  res.send('Product added to the cart');
});

router.get('/cart', async (req, res) => {
  const carts = await cartsRepo.getAll();
});

module.exports = router;
