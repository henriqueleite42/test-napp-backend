// External Import
const express = require('express');
const routes = express.Router();

// Models
const Product = require('../models/Product');

/**
 *
 * Functions
 *
 */

// Check if (min >= Number <= max)
Number.prototype.between = function (min, max) {
  if (this >= min && this <= max) return true;
  else return false;
}

// Validate Product Data
const { validateProduct } = require('../functions');


/**
 *
 * Routes
 *
 */


/**
 *
 * List
 *
 */
// List all Customers
routes.get('', async (req, res) => {
  try {
    const products = await Product.find({})
    res.json(products.reverse());
  } catch (err) {
    res.json([])
  }
});
// Gets the product info
routes.get('/search/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) res.json(product);

    res.json({});
  } catch (err) {
    res.json({});
  }
});

/**
 *
 * Create
 *
 */
routes.post('/add', async (req, res) => {
  try {
    // Check Product Info
    let result = validateProduct(req.body);
    if (!result.status) throw new Error(result.msg)

    // Check Duplicated SKU
    let duplicated = await Product.findOne({ sku: req.body.sku });
    if (duplicated) throw new Error('Duplicated SKU');

    // Creates the Product
    await Product.create(req.body);
    res.json({ status: true })
  } catch (err) {
    res.json({ status: false, msg: err.message })
  }
});

/**
 *
 * Edit
 *
 */
routes.post('/edit/:id', async (req, res) => {
  try {
    // Check if is Defined and Not Empty
    if (!req.params.id)  throw new Error('Invalid Product');

    // Check Product Info
    let result = validateProduct(req.body);
    if (!result.status) throw new Error(result.msg)

    // Check if product Exists
    const prod = await Product.findById(req.params.id);
    if (!prod) throw new Error('Invalid Product');

    // Check Duplicated SKU
    let duplicated = await Product.findOne({ sku: req.body.sku, _id: { $ne: req.params.id } });
    if (duplicated) throw new Error('Duplicated SKU');

    // Updates the Product
    await Product.findOneAndUpdate({ _id: req.params.id }, req.body);
    res.json({ status: true })
  } catch (err) {
    res.json({ status: false, msg: err.message })
  }
});

/**
 *
 * Delete
 *
 */
routes.delete('/delete/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json(true);
  } catch (err) {
    res.json(false);
  }
});

module.exports = app => app.use('/api/product', routes);