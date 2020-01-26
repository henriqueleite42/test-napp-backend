const express = require('express');
const dotenv = require('dotenv');

const Customer = require('./models/Customer');
const Product = require('./models/Product');
const Sale = require('./models/Sale');

const app = express();

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set CORS headers
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', process.env.FRONT_URL);
  next();
});

// Controllers
require('./controllers/saleController')(app);
require('./controllers/productController')(app);
require('./controllers/customerController')(app);

// Home
app.get('/api', async (req, res) => {
  const customer = await Customer.countDocuments({});
  const product = await Product.countDocuments({});
  const sale = await Sale.countDocuments({});

  // Set the Total
  res.json({
    customer: customer,
    product: product,
    sale: sale
  });
});


app.listen(process.env.PORT || 3001);