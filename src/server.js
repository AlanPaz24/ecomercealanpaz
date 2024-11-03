const express = require('express');
const mongoose = require('mongoose');
const handlebars = require('express-handlebars');
const { Server } = require('socket.io');
const path = require('path');

const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/carts');
const viewsRouter = require('./routes/views');

const app = express();
const httpServer = app.listen(8080, () => console.log('Server running on port 8080'));
const io = new Server(httpServer);

// Conexión a MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/ecommerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Configurar Handlebars
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/', viewsRouter);
