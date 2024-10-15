const express = require('express');
const router = express.Router();

// Simulación de una lista de productos
let products = [
  { id: 1, title: 'Producto 1', description: 'Descripción 1', price: 100 },
  { id: 2, title: 'Producto 2', description: 'Descripción 2', price: 200 }
];

// Ruta para la vista 'home'
router.get('/', (req, res) => {
  res.render('home', { products });
});

// Ruta para la vista de productos en tiempo real
router.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts', { products });
});

module.exports = router;
