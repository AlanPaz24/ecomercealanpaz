const Cart = require('../models/Cart');

// Crear un nuevo carrito
exports.createCart = async (req, res) => {
    try {
        const cart = new Cart();
        await cart.save();
        res.status(201).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un carrito por ID
exports.getCartById = async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id);
        if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Agregar un producto al carrito
exports.addProductToCart = async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id);
        if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });

        const { productId, quantity } = req.body;
        cart.products.push({ productId, quantity });
        await cart.save();

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
