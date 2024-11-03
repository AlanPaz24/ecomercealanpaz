const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Rutas para carritos
router.get('/:id', cartController.getCartById);
router.post('/', cartController.createCart);
router.post('/:id/products', cartController.addProductToCart);
router.delete('/:id/products/:productId', cartController.removeProductFromCart);

module.exports = router;
