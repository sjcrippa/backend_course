import express from 'express';
import ProductManager from './app.js';

const app = express();
const port = 8080;

app.use(express.json());

const productsPath = 'productos.json';
const cartsPath = 'carrito.json';

const readFromFile = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return [];
  }
};

const writeToFile = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(`Error writing to file ${filePath}:`, error);
  }
};

app.get('/api/products', (req, res) => {
  const limit = req.query.limit;
  let products = readFromFile(productsPath);

  if (limit) {
    products = products.slice(0, parseInt(limit));
  }

  res.json({ products });
});

app.get('/api/products/:pid', (req, res) => {
  const productId = parseInt(req.params.pid);
  const products = readFromFile(productsPath);
  const product = products.find((prod) => prod.id === productId);

  if (product) {
    res.json({ product });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

app.post('/api/products', (req, res) => {
  const newProduct = req.body;
  const products = readFromFile(productsPath);

  // Validación de campos obligatorios
  const requiredFields = ['title', 'description', 'code', 'price', 'status', 'stock', 'category'];
  const missingFields = requiredFields.filter((field) => !newProduct.hasOwnProperty(field));

  if (missingFields.length > 0) {
    return res.status(400).json({ message: `Missing required fields: ${missingFields.join(', ')}` });
  }

  products.push(newProduct);
  writeToFile(productsPath, products);

  res.status(201).json({ message: 'Product added successfully', product: newProduct });
});

app.put('/api/products/:pid', (req, res) => {
  const productId = parseInt(req.params.pid);
  const updatedProduct = req.body;
  let products = readFromFile(productsPath);
  let productIndex = products.findIndex((prod) => prod.id === productId);

  if (productIndex !== -1) {
    products[productIndex] = { ...products[productIndex], ...updatedProduct };
    writeToFile(productsPath, products);
    res.json({ message: 'Product updated successfully', product: products[productIndex] });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

app.delete('/api/products/:pid', (req, res) => {
  const productId = parseInt(req.params.pid);
  let products = readFromFile(productsPath);
  const filteredProducts = products.filter((prod) => prod.id !== productId);

  if (products.length !== filteredProducts.length) {
    writeToFile(productsPath, filteredProducts);
    res.json({ message: 'Product deleted successfully' });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

app.post('/api/carts', (req, res) => {
  const newCart = {
    id: Math.floor(Math.random() * 1000), // Generación de ID único 
    products: []
  };

  writeToFile(cartsPath, newCart);
  res.status(201).json({ message: 'New cart created', cart: newCart });
});

app.get('/api/carts/:cid', (req, res) => {
  const cartId = parseInt(req.params.cid);
  const carts = readFromFile(cartsPath);
  const cart = carts.find((c) => c.id === cartId);

  if (cart) {
    res.json({ cart });
  } else {
    res.status(404).json({ message: 'Cart not found' });
  }
});

app.post('/api/carts/:cid/product/:pid', (req, res) => {
  const cartId = parseInt(req.params.cid);
  const productId = parseInt(req.params.pid);
  const carts = readFromFile(cartsPath);
  let cartIndex = carts.findIndex((c) => c.id === cartId);

  if (cartIndex !== -1) {
    let cart = carts[cartIndex];

    const existingProductIndex = cart.products.findIndex((prod) => prod.id === productId);
    if (existingProductIndex !== -1) {
      cart.products[existingProductIndex].quantity++;
    } else {
      cart.products.push({ id: productId, quantity: 1 });
    }

    carts[cartIndex] = cart;
    writeToFile(cartsPath, carts);

    res.json({ message: 'Product added to cart', cart: cart });
  } else {
    res.status(404).json({ message: 'Cart not found' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});