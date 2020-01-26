// External Import
const express = require('express');
const routes = express.Router();

// Models
const Customer = require('../models/Customer');

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

// Validate Customer Data
const { validateCustomer } = require('../functions');


/**
 *
 * Routes
 *
 */


// List all Customers
routes.get('', async (req, res) => {
  try {
    const customers = await Customer.find({})
    res.json(customers.reverse());
  } catch (err) {
    res.json([])
  }
});
// Gets the customer info
routes.get('/search/:id', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (customer) res.json(customer);
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
    // Checks Customer Data
    let result = validateCustomer(req.body);
    if (!result.status) throw new Error(result.msg);

    // Check Duplicated CPF
    let duplicated = await Customer.findOne({ cpf: req.body.cpf });
    if (duplicated) throw new Error('Duplicated CPF');

    // Creates the Customer
    await Customer.create(req.body);
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
    if (!req.params.id)  throw new Error('Invalid Customer');

    // Checks Customer Data
    let result = validateCustomer(req.body);
    if (!result.status) throw new Error(result.msg);

    // Check if customer Exists
    const cust = await Customer.findById(req.params.id);
    if (!cust) throw new Error('Invalid Customer');

    // Check Duplicated CPF
    let duplicated = await Customer.findOne({ cpf: req.body.cpf, _id: { $ne: req.params.id } });
    if (duplicated) throw new Error('Duplicated CPF');

    // Updates the Customer
    await Customer.findOneAndUpdate({ _id: req.params.id }, req.body);
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
    await Customer.findByIdAndDelete(req.params.id);
    res.json(true);
  } catch (err) {
    res.json(err.mess);
  }
});

module.exports = app => app.use('/api/customer', routes);