const fs = require('fs');

class ProductManager {
    constructor() {
        this.products = [];
        this.id = 0,
        this.path = './data/products.json';
    }

    addProduct(data) {
        // Validar que todos los campos sean obligatorios 
        if (!data.title || !data.description || !data.code || !data.price || !data.stock || !data.thumbnail) {
            console.log(data);
            return;
        }

        // Validar que no se repita el campo "code"
        const codeRepetido = this.products.some(product => product.code === code) // some() comprueba si al menos un elemento del array cumple con la condición.Este método devuelve true/false.
        if (codeRepetido) {
            console.log(`Existe un producto con el codigo ${code}`);
        }
        const idNuevo = this.id + 1 ;
        const producto_nuevo = {
            id: idNuevo,
            title: data.title,
            description: data.description,
            code: data.code,
            price: data.price,
            stock: data.stock,
            thumbnail: data.thumbnail
        }
        
        if(fs.existsSync(this.path)) {
            const data = fs.readFileSync(this.path, 'utf-8');
            const products = JSON.parse(data);
            products.push(producto_nuevo)
            fs.writeFileSync(this.path, JSON.stringify(products), (err) => {
                if (err) throw err;
                console.log("Productos almacenados con exito en el archivo");
            });
            }        
    }


    async getProducts() {
        // Leer el archivo de productos y devolver todos los productos en formato arreglo
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8'); // Leer el archivos de productos
            const products = JSON.parse(data); // Devolver todos los productos en formato arreglo      
            console.log(products);
            return products;
        } catch (error) {
            console.log(error);
            return;
        }
    }


    async getProductId(productId) {
        // Leer el archivo, buscar el producto con el id especificado y devolverlo en formato objeto
        const data = await fs.promises.readFile(this.path, 'utf-8'); // Leer el archivo
        const productsById = JSON.parse(data);
        const product = productsById.find(product => product.id === productId) // find() devuelve el valor del primer elemento del array que cumple la función de prueba proporcionada.
        if (product) { // Devolverlo en formato objeto
            console.log(product);
            return product;
        } else {
            console.log("Producto no existe")
        }
    }


    async updateProduct(productId, updateData) {
        const data = await fs.promises.readFile(this.path, 'utf-8');
        let products = JSON.parse(data)
        let index = products.findIndex(product => product.id === productId); // findIndex() devuelve el índice del primer elemento de un array que cumpla la condicion. En caso contrario devuelve -1.
        if (index === -1) {
            return "Producto no encontrado";
          }
          
        products[index] = Object.assign({}, products[index], updateData);
    
        fs.writeFile(this.path, JSON.stringify(products), err => {
            if(err) throw err;
            return "Producto actualizado correctamente"
        });
    }


    async deleteProduct(productIdToDelete) {
        const data = await fs.promises.readFile(this.path, 'utf-8');
        const products = JSON.parse(data);
        const productoEliminado = products.findIndex(product => product.id === productIdToDelete)
        if(productoEliminado === -1) {
            console.log(`No se encontró producto con ID ${productIdToDelete}`);
            return;
        }

        products.splice(productoEliminado, 1);
        fs.writeFile(this.path, JSON.stringify(products), err => {
            if(err) throw err;
            console.log("Producto eliminado correctamente")
        });
    }
}

module.exports = ProductManager;

 