const Product = require('../models/Product');

const productController = {
  async getAllProducts(req, res) {
    const products = await Product.find();
    res.json(products);
  },
  async getProductById(req, res) {
    const product = await Product.findById(req.params.id);
    res.json(product);
  },
  async createProduct(req, res) {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  },
  async updateProduct(req, res) {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProduct);
  },
  async deleteProduct(req, res) {
    await Product.findByIdAndDelete(req.params.id);
    res.status(204).end();
  }
};

module.exports = productController;
