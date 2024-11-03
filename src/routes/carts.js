const express = require('express');
const { getCart, addProductToCart, updateCart, deleteProductFromCart } = require('../controllers/cartController');
const router = express.Router();

router.get('/:cid', getCart);
router.post('/:cid/products/:pid', addProductToCart);
router.put('/:cid', updateCart);
router.delete('/:cid/products/:pid', deleteProductFromCart);

module.exports = router;
