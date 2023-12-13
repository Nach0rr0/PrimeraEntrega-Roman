const express = require('express');
const ProductManager = require ('../productManager.js');
const CartManager = require('../cartManager.js'); 

const productManager = new ProductManager();
const cartManager = new CartManager();
const routerCart = express.Router();


// Listar los productos que pertenezcan al carrito con el cid proporcionado.

routerCart.post('/carts', (req, res) => {
    cartManager.createCart();
    res.status(200).send({estado:'ok', mensaje:'Carrito creado correctamente'})
})

routerCart.get('/carts/:cid', async (req, res) => {
  const cartId = req.params.cid;
    try {
        const cartById = await cartManager.getCartId(parseInt(cartId));
        if (!cartById) {
            res.status(404).send(`No se encontró ID ${cartId}`);
          } else {
            return res.status(200).send(cartById);
          }
    } catch (error) {
        return res.status(404).send(error);
    }
});

routerCart.post('/carts/:cid/product/:pid', (req, res) => {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt (req.params.pid);
    cartManager.addProductToCart(cartId, productId);
    res.status(200).send({estado:'ok', mensaje:'Carrito cargado correctamente'})
})

module.exports = routerCart;