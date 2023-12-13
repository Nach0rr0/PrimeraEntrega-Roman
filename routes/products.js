const express = require('express');
const routerProduct = express.Router(); // const router = express.Router();

const ProductManager = require('../productManager.js'); // const ProductManager = require('../productManager.js')
const bodyParser = require('body-parser');

const productManager = new ProductManager();

routerProduct.use(bodyParser.urlencoded({ extended: true }));
routerProduct.use(express.json());


// Listar todos los productos 

routerProduct.get('/products', (req , res) => {   
    const limite = req.query.limite;
    try {
        let products = productManager.getProducts();
        // if(limite) {
        //     limiteProductos = products.slice(0, limite);
        //     res.status(200).send(limiteProductos);
        //    } else {
        //     res.status(200).send(products);
        //    }
        const limiteProductos = products.slice(0, limite);
        limite ? res.status(200).send(limiteProductos) : res.status(200).send(products);
    } catch (error) {
        return res.status(404).send(error);   
    }
});


// Trae el producto con el id proporcionado

routerProduct.get('/products/:pid' , async (req, res) => {
    const productId = req.params.pid;
    try {
        const productsById = await productManager.getProductId(parseInt(productId));
        if (!productsById) {
            res.status(404).send(`No se encontró ID ${productId}`);
          } else {
            return res.status(200).send(productsById);
          }
    } catch (error) {
        return res.status(404).send(error);
    }
});


// Agregar un nuevo producto

routerProduct.post('/products', (req, res) => {
    const product_new = req.body;
    try {
        productManager.addProduct(product_new); 
        res.status(200).send({estado: 'ok', mensaje: 'Producto Agregado Correctamente'}); 
    } catch (error) {
        return res.status(404).send(error)
    }
});



// Toma un producto y actualiza los campos enviados desde body. 

routerProduct.put('/products/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    const updateData = req.body;
    try {
        productManager.updateProduct(productId, updateData)
        res.status(200).send({estado: 'ok', mensaje: 'Producto Modificado Correctamente'})
    } catch (error) {
        return res.status(404).send(error)
    }
});



// Elimina el producto con el pid indicado.

routerProduct.delete('/products/:pid', (req, res) => {
    const productoIdToDelete = parseInt(req.params.pid);
    try {
        productManager.deleteProduct(productoIdToDelete);
        res.status(200).send({estado: 'ok', mensaje:'Producto Eliminado Correctamente'});
    } catch (error) {
        return res.status(404).send(error);
    }
});


module.exports = routerProduct;