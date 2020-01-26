/**
 * Sale Schema
 *
 * NodeJs version 10
 *
 * @author Henrique Leite <henriqueleite616@gmail.com>
 */
const db = require('../config/database');

const ProductInfoSchema = new db.Schema({
  product: { // Product ID
    type: db.Schema.Types.ObjectId,
    ref: 'product',
    required: true,
    autopopulate: true
  },
  qtd: { // Sold Amount
    type: Number,
    min: 0,
    required: true
  },
  profitability: { // Profitability Level
    type: String,
    required: true
  },
  price: { // Unit Selling Price
    type: Number,
    min: 0,
    required: true
  }
})

const SaleShema = new db.Schema({
  customer: { // Customer ID
    type: db.Schema.Types.ObjectId,
    ref: 'customer',
    required: true,
    autopopulate: true
  },
  date: { // Creation Date
    type: Date,
    default: Date.now
  },
  products: [ProductInfoSchema] // Product Info
});

module.exports = db.model('sale', SaleShema);