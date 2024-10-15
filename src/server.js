const express = require('express');
const handlebars = require('express-handlebars');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const httpServer = app.listen(8080, () => console.log('Server running on port 8080'));
const io = new Server(httpServer);
const viewsRouter = require('./routes/views'); 
app.use('/', viewsRouter); 

// Configurar Handlebars
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simulación de una lista de productos (puedes modificarlo para que sea dinámico)
let products = [
  { id: 1, title: 'Producto 1', description: 'Descripción 1', price: 100 },
  { id: 2, title: 'Producto 2', description: 'Descripción 2', price: 200 }
];

// Ruta para la vista 'home'
app.get('/', (req, res) => {
  res.render('home', { products });
});

// Ruta para la vista de productos en tiempo real
app.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts', { products });
});

// Conexión de WebSocket
io.on('connection', (socket) => {
  console.log('Cliente conectado');
  socket.emit('updateProducts', products);

  // Escuchar cuando se agrega un nuevo producto
  socket.on('addProduct', (newProduct) => {
    products.push(newProduct);
    io.emit('updateProducts', products); // Actualizar la lista en todos los clientes
  });

  // Escuchar cuando se elimina un producto
  socket.on('deleteProduct', (id) => {
    products = products.filter(product => product.id !== id);
    io.emit('updateProducts', products); // Actualizar la lista en todos los clientes
  });
});
