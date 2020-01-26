/**
 * Product Schema
 *
 * NodeJs version 10
 *
 * @author Henrique Leite <henriqueleite616@gmail.com>
 */
const db = require('../config/database');

const ProductShema = new db.Schema({
  sku: { // Product Identifier Code
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 20
  },
  name: { // Product Name
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  price: { // Product Price
    type: Number,
    required: true,
    min: 0
  },
  min: { // Minimum Purchase Quantity
    type: Number,
    required: true,
    min: 1,
    default: 1
  }
});

module.exports = db.model('product', ProductShema);