const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.json());

// Importa las rutas
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');

// Usa las rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
