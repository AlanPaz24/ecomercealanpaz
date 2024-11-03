const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Ruta para crear un nuevo carrito
router.post('/', cartController.createCart);

// Ruta para obtener un carrito por ID
router.get('/:id', cartController.getCartById);

// Ruta para agregar un producto al carrito
router.post('/:id/products', cartController.addProductToCart);

module.exports = router;
