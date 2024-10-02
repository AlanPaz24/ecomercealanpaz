const express = require('express');
const fs = require('fs');
const router = express.Router();
const productsFilePath = './src/data/productos.json';

// Función para leer productos desde el archivo
const readProducts = () => {
  const data = fs.readFileSync(productsFilePath);
  return JSON.parse(data);
};

// Ruta para obtener todos los productos
router.get('/', (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : null;
  const products = readProducts();
  res.json(limit ? products.slice(0, limit) : products);
});

// Ruta para obtener un producto por ID
router.get('/:pid', (req, res) => {
  const products = readProducts();
  const product = products.find(p => p.id === parseInt(req.params.pid));
  res.json(product || { error: 'Producto no encontrado' });
});

// Ruta para agregar un nuevo producto
router.post('/', (req, res) => {
  const products = readProducts();
  const newProduct = {
    id: products.length + 1, // Generación de ID simple
    ...req.body,
    status: req.body.status !== undefined ? req.body.status : true,
  };
  products.push(newProduct);
  fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
  res.status(201).json(newProduct);
});

// Ruta para actualizar un producto
router.put('/:pid', (req, res) => {
  const products = readProducts();
  const index = products.findIndex(p => p.id === parseInt(req.params.pid));
  if (index !== -1) {
    const updatedProduct = { ...products[index], ...req.body };
    products[index] = updatedProduct;
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
    res.json(updatedProduct);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

// Ruta para eliminar un producto
router.delete('/:pid', (req, res) => {
  const products = readProducts();
  const index = products.findIndex(p => p.id === parseInt(req.params.pid));
  if (index !== -1) {
    products.splice(index, 1);
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

module.exports = router;
