const express = require('express');
const fs = require('fs');
const router = express.Router();
const cartsFilePath = './src/data/carrito.json';

// Función para leer carritos desde el archivo
const readCarts = () => {
  const data = fs.readFileSync(cartsFilePath);
  return JSON.parse(data);
};

// Ruta para crear un nuevo carrito
router.post('/', (req, res) => {
  const carts = readCarts();
  const newCart = {
    id: carts.length + 1, // Generación de ID simple
    products: [],
  };
  carts.push(newCart);
  fs.writeFileSync(cartsFilePath, JSON.stringify(carts, null, 2));
  res.status(201).json(newCart);
});

// Ruta para obtener los productos de un carrito
router.get('/:cid', (req, res) => {
  const carts = readCarts();
  const cart = carts.find(c => c.id === parseInt(req.params.cid));
  res.json(cart ? cart.products : { error: 'Carrito no encontrado' });
});

// Ruta para agregar un producto al carrito
router.post('/:cid/product/:pid', (req, res) => {
  const carts = readCarts();
  const cart = carts.find(c => c.id === parseInt(req.params.cid));
  if (cart) {
    const product = { product: parseInt(req.params.pid), quantity: 1 };
    const existingProduct = cart.products.find(p => p.product === product.product);
    
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.products.push(product);
    }

    fs.writeFileSync(cartsFilePath, JSON.stringify(carts, null, 2));
    res.json(cart);
  } else {
    res.status(404).json({ error: 'Carrito no encontrado' });
  }
});

module.exports = router;
