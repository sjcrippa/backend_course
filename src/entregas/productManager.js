const fs = require('fs');

class productManager {
  constructor(filePath) {
    this.path = filePath;
  }

  // funcion para agregar productos
  async addProduct(product) {
    try {
      const products = await this.getProductsFromFile();
      const newProduct = {
        ...product,
        id: products.length + 1, // Autoincrement id
      };
      products.push(newProduct);
      await this.saveProductsToFile(products);
      return newProduct;
    } catch (error) {
      throw new Error('Error adding product: ' + error.message);
    }
  }

  // visualizar productos
  async getProducts() {
    try {
      const products = await this.getProductsFromFile();
      return products;
    } catch (error) {
      throw new Error('Error getting products: ' + error.message);
    }
  }

  // funcion para obtener producto por su id
  async getProductById(id) {
    try {
      const products = await this.getProductsFromFile();
      const product = products.find((p) => p.id === id);
      return product || null;
    } catch (error) {
      throw new Error('Error getting product by id: ' + error.message);
    }
  }

  // funcion para actualizar productos
  async updateProduct(id, updatedProduct) {
    try {
      const products = await this.getProductsFromFile();
      const index = products.findIndex((p) => p.id === id);
      if (index !== -1) {
        products[index] = {
          ...updatedProduct,
          id, // Ensure the id remains the same
        };
        await this.saveProductsToFile(products);
        return products[index];
      } else {
        throw new Error('Product not found');
      }
    } catch (error) {
      throw new Error('Error updating product: ' + error.message);
    }
  }

  // funcion para eliminar productos
  async deleteProduct(id) {
    try {
      const products = await this.getProductsFromFile();
      const index = products.findIndex((p) => p.id === id);
      if (index !== -1) {
        products.splice(index, 1);
        await this.saveProductsToFile(products);
        return true;
      } else {
        throw new Error('Product not found');
      }
    } catch (error) {
      throw new Error('Error deleting product: ' + error.message);
    }
  }

  // obteniendo productos desde el archivo
  async getProductsFromFile() {
    try {
      const data = await fs.promises.readFile(this.path, 'utf-8');
      if (data.trim() === '') {
        // Archivo vasio, devuelve array vacio
        return [];
      }
      return JSON.parse(data);
    } catch (error) {
      if (error.code === 'ERROR') {
        // Archivo no encontrado, devuelve array vacio
        return [];
      } else {
        throw new Error('Error reading file: ' + error.message);
      }
    }
  }

  // Almacenando productos
  async saveProductsToFile(products) {
    try {
      await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
    } catch (error) {
      throw new Error('Error writing file: ' + error.message);
    }
  }
}

module.exports = productManager;

const manager = require('./productManager');

const filePath = 'products.json';
const testing = new manager(filePath);

(async () => {
  // Agregar un producto
  const newProduct = await testing.addProduct({
    title: 'Nike SB Dunk Low Pro',
    description: 'Zapatillas de Moda para Hombre',
    price: 99.99,
    thumbnail: "https://nikearprod.vtexassets.com/arquivos/ids/532495-1200-1200?v=638161394158070000&width=1200&height=1200&aspect=true",
    code: 'PROD-001',
    stock: 10,
  });
  console.log('Producto agregado:', newProduct);

  // Obtener todos los productos
  const allProducts = await testing.getProducts();
  console.log('Todos los productos:', allProducts);

  // Obtener un producto por su id
  const productId = 1; // Cambiar por el id del producto deseado
  const productById = await testing.getProductById(productId);
  console.log('Producto por id:', productById);

  // Actualizar un producto
  const updatedProduct = await testing.updateProduct(productId, {
    title: 'Producto 1 (actualizado)',
    description: 'Descripción actualizada',
    price: 109.99,
    thumbnail: 'nueva-ruta-de-imagen',
    code: 'PROD-001',
    stock: 15,
  });
  console.log('Producto actualizado:', updatedProduct);

  // Eliminar un producto por su id
  // Comentar siguiente codigo para visualizar array con el producto en el json.
  const deleted = await testing.deleteProduct(productId);
  console.log('Producto eliminado:', deleted);

  // Obtener todos los productos después de eliminar
  const remainingProducts = await testing.getProducts();
  console.log('Productos restantes:', remainingProducts);
})();
