// External Import
const express = require('express');
const routes = express.Router();

// Models
const Sale = require('../models/Sale');
const Product = require('../models/Product');
const Customer = require('../models/Customer');

/**
 *
 * List
 *
 */
routes.get('', async (req, res) => {
  try {
    var sales = await Sale.find({}).populate('customer');
    res.json(sales.reverse());
  } catch (err) {
    res.json([])
  }
});
// Gets the sale info
routes.get('/search/:id', async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id);
    if (sale) res.json(sale);
    else res.json({});
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
    // Check if is Defined and Not Empty
    if (!req.body.customer)  throw new Error('Customer is required');
    if (!req.body.products)  throw new Error('The sale must have at least one product');

    // Get the Products values and IDs
    let prodIds = [];
    let total = 0;
    for (let product of req.body.products) {
      prodIds.push(product.product);
      total += product.price;
    }

    // Check Final Value
    if (!total > 0) throw new Error('Final value must be greater than zero');

    // Check if Customer Exists
    const cust = await Customer.findById(req.body.customer);
    if (!cust) throw new Error('Invalid Customer');

    // Check if Products Exists
    const products = await Product.find({ _id: prodIds });
    if (products.length != prodIds.length) throw new Error('One or More Invalid Products');

    // Creates the Sale
    await Sale.create(req.body);
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
    if (!req.params.id) throw new Error('Invalid Sale')

    // Check if Sale Exists
    const ord = Sale.findById(req.params.id);
    if (!ord) throw new Error('Invalid Sale');

    // Check if is Defined and Not Empty
    if (!req.body.customer)  throw new Error('Customer is required');
    if (!req.body.products)  throw new Error('The sale must have at least one product');

    // Get the Products values and IDs
    let prodIds = [];
    let total = 0;
    for (let product of req.body.products) {
      prodIds.push(product.product);
      total += product.price;
    }

    // Check Final Value
    if (!total > 0) throw new Error('Final value must be greater than zero');

    // Check if Customer Exists
    const cust = await Customer.findById(req.body.customer);
    if (!cust) throw new Error('Invalid Customer');

    // Check if Products Exists
    const products = await Product.find({ _id: prodIds });
    if (products.length != prodIds.length) throw new Error('One or More Invalid Products');

    // Updates the Sale
    await Sale.findOneAndUpdate({ _id: req.params.id }, req.body);
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
    await Sale.findByIdAndDelete(req.params.id);
    res.json(true);
  } catch (err) {
    res.json(false);
  }
});

module.exports = app => app.use('/api/sale', routes);