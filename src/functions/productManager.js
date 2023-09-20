import { writeFileSync, readFileSync } from 'fs';
const dataFilePath = 'products.json';

class ProductManager {
  constructor() {
    this.products = [];
    this.loadDataFromFile();
  }

  static nextProductId = 1;

  // Metodo para guardar los datos en el archivo:
  saveDataToFile() {
    writeFileSync(dataFilePath, JSON.stringify(this.products, null, 2), 'utf8');
  }

  // Metodo para cargar los datos en el archivo:
  loadDataFromFile() {
    try {
      const data = readFileSync(dataFilePath, 'utf8');
      this.products = JSON.parse(data);
    } catch (error) {
      console.log(error);
    } finally {
      this.saveDataToFile();
    }
  }

  addProduct(product) {
    // Validar que todos los campos sean obligatorios
    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.thumbnail ||
      !product.code ||
      !product.stock
    ) {
      console.log('Error: All fields are required');
      return
    }

    // Validar que el campo "code" no se repita
    if (this.products.some((p) => p.code === product.code)) {
      console.log('Error: Code alredy exist');
      return;
    }

    // Asignar un ID autoincrementable al producto y luego agregarlo al arreglo
    product.id = ProductManager.nextProductId++;

    // Agregar productos al arreglo
    this.products.push(product);
    
    // Guardar los datos en el archivo
    this.saveDataToFile();

    console.log('Product added!');
  }

  // Obtener los productos
  getProducts() {
    console.log(this.products);
    return this.products
  }

  // Obtener producto segun su ID
  getProductById(id) {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      console.log('Error: Producto no encontrado');
    }
    return product;
  }
  // Actualizar un producto por su ID
  updateProduct(id, updatedProduct) {
    const index = this.products.findIndex((p) => p.id === id);

    if (index === -1) {
      console.log('Error: Producto no encontrado');
      return;
    }

    // Actualizar el producto sin modificar su ID
    this.products[index] = {
      ...this.products[index],
      ...updatedProduct,
      id: this.products[index].id,
    };

    // Guardar los datos en el archivo
    this.saveDataToFile();

    console.log('Prod actualizado!');
  }

  // Eliminar un producto por su ID
  deleteProduct(id) {
    const index = this.products.findIndex((p) => p.id === id);

    if (index === -1) {
      console.log('Error: Prod no encontrado');
      return;
    }

    // Eliminar el producto del arreglo
    this.products.splice(index, 1);

    // Guardar los datos en el archivo
    this.saveDataToFile();

    console.log('Prod borrado!');
  }
}
// Prueba de uso:
const manager = new ProductManager
manager.addProduct({
  title: 'Honda',
  description: 'Civic',
  price: 1230004,
  thumbnail: 'imagen.jpg',
  code: 'AAA001',
  stock: 10
})
manager.addProduct({
  title: 'Toyota',
  description: 'Supra',
  price: 1233344,
  thumbnail: 'imagen.jpg',
  code: 'AAA002',
  stock: 10
})
manager.addProduct({
  title: 'Renault',
  description: 'Clio',
  price: 1233,
  thumbnail: 'imagen.jpg',
  code: 'AAA003',
  stock: 10
})

console.log('Productos antes de la actualizacion:');
manager.getProducts();

manager.updateProduct(2, {
  title: 'Toyota actualizado',
  price: 2000000,
  stock: 5,
});

console.log('Productos despues de la actualizacion:');
manager.getProducts();

manager.deleteProduct(1);

console.log('Productos despues de borrar:');
manager.getProducts();