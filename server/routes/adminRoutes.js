const express = require('express');
const router = express.Router();
const Product = require('../models/productModels');

// CREATE
router.post('/products', async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
});

// READ
router.get('/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// UPDATE
router.put('/products/:id', async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE
router.delete('/products/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Product deleted' });
});

module.exports = router;
