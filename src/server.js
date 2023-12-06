import express from 'express'
import ProductManager from './app.js'

const app = express()
const port = 3000

const path = 'products.json';
const manager = new ProductManager(path);

app.get('/', (req, res) => {
  res.json({ message: 'Hi coders' })
})

app.get('/products', async (req, res) => {
  const limit = req.query.limit;
  let products;

  if (limit) {
    products = await manager.getProducts();
    products = JSON.parse(products).slice(0, parseInt(limit));
  } else {
    products = await manager.getProducts();
  }

  res.json({ products });
});

app.get('/products/:pid', async (req, res) => {
  const productId = parseInt(req.params.pid);
  const product = await manager.getProductsById(productId);

  if (product) {
    res.json({ product });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
})