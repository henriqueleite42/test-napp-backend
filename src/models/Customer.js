/**
 * Sale Schema
 *
 * NodeJs version 10
 *
 * @author Henrique Leite <henriqueleite616@gmail.com>
 */
const db = require('../config/database');

const CustomerShema = new db.Schema({
  cpf: { // Customer CPF
    type: Number,
    required: true,
    unique: true,
    min: 10000000000,
    max: 99999999999
  },
  fname: { // Customer First Name
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  lname: { // Customer Last Name
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  createdAt: { // Creation Date
    type: Date,
    default: Date.now
  }
});

module.exports = db.model('customer', CustomerShema);