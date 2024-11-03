const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  category: String,
  available: Boolean
});

module.exports = mongoose.model('Product', productSchema);
