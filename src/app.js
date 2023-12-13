const express = require('express');
const routerProduct = require('../routes/products'); //import routerProduct from '../routes/products';
const routerCart = require('../routes/carts'); //import routerCart from '../routes/carts';
const server = express();


server.use(express.json());
server.use('/api', routerProduct);
server.use('/api', routerCart);
// server.use(express.static('public'));

const PUERTO = 8080;

server.listen(PUERTO, () => {
    console.log(`Servidor ejecutandose en el ${PUERTO}`)
});


// Devuelve products completo
// server.get('/products', (req, res) => {
//     res.statusCode(200).send(usuarios);
//     res.send(usuarios[0]);
// })

// Cargar un producto nuevo 
// server.post('/products', (req, res) => {
//      res.send('Endpoint alcanzado);
//      console.log(req.body); // body.parser    
// })


module.exports = server;