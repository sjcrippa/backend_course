import express, { json } from 'express';

import { ProductManager } from './functions/productManager.js';
import productsRouter from './routes/products.router.js'

const app = express();
const port = 8080;

const NewProductManager = new ProductManager();

app.use(json());
app.use(express.static('../public'))

// Ruta para obtener todos los productos
/* app.get('/products', async (req, res) => {
  const limit = parseInt(req.query.limit);
  if (!isNaN(limit)) {
    const limitedProducts = NewProductManager.getProducts().slice(0, limit);
    res.json(limitedProducts);
  } else {
    res.json(NewProductManager.getProducts());
  }
}); */

// Usando rutas:
app.use('/products', productsRouter);

// Ruta para obtener un producto por su ID
app.get('/products/:pid', async (req, res) => {
  const productId = parseInt(req.params.pid);
  const product = NewProductManager.getProductById(productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

app.listen(port, () => {
  console.log(`Servidor Express funcionando en el puerto ${port}`);
});