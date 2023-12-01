import fs, { readFile } from 'node:fs'

class ProductManager {
  constructor(path) {
    this.products = []
    this.id = 1
    this.path = path
  }

  async saveToFile() {
    try {
      await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2))
      console.log('Data has been saved successfully.');
    }
    catch (error) {
      console.log('Error writing file: ', error.message);
    }
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    // validacion para que todos los productos sean obligatorios:
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      return console.log('All fields are required');
    }

    // validacion para que no se repita el code:
    const productExist = this.products.find(prod => prod.code === code)
    if (productExist) return console.error(`WARNING! Product with the code ${code} already exist`);

    const newProduct = {
      id: this.id++,
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    }
    this.products.push(newProduct)
  }

  async getProducts() {
    try {
      const products = await fs.promises.readFile('./products.json', 'utf-8')
      return products;
    }
    catch (error) {
      console.log('Error reading file: ', error.message);
    }
  }

  async getProductsById(idProduct) {
    try {
      const data = JSON.parse(await fs.promises.readFile(`${this.path}`, 'utf-8'));
      const prodById = data.find(prod => prod.id === idProduct);

      if (prodById) {
        console.log(prodById);
      } else {
        console.log('Error getting id: Product not found.');
      }
    } catch (error) {
      console.log('Error reading file in getProductsById: ', error.message);
    }
  }

  async updateProduct(id, updatedFields) {
    const prodToUpdate = this.products.find(prod => prod.id === id)

    if (prodToUpdate) {
      Object.assign(prodToUpdate, updatedFields)
      await this.updateProduct()
      console.log('Product updated successfully.');

      try {
        await fs.promises.writeFile(`${this.path}`, JSON.stringify(this.products, null, 2))
      } catch (error) {
        console.log('Error updating product:', error.message);
      }
      await this.saveToFile()

    } else {
      console.log('Error with update: Product not found');
    }
  }

  async deleteProduct(id) {
    const prodToDelete = this.products.findIndex(prod => prod.id === id)

    if (prodToDelete !== -1) {
      this.products.splice(prodToDelete, 1)
      await this.saveToFile()
      console.log('Product deleted');

    } else {
      console.log('Error deleting: Product not found');
    }
  }

  async readFile() {
    let resultado = await fs.promises.readFile(this.path, 'utf-8')
    console.log('Test de lectura: ', resultado);
  }
}

const path = 'products.json'
const manager = new ProductManager(path)

manager.addProduct('T-shirt', 'Blue', 250, 'url/of/product', 'AAA001', 1)
manager.addProduct('Snickers', 'Red', 170, 'url/of/product', 'AAA002', 1)
manager.getProducts()

manager.addProduct('Pants', 'Yellow', 320, 'url/of/product', 'AAA002', 1) // Repitiendo codigo para que no lo agregue
manager.addProduct('Pants', 'Yellow', 320, 'url/of/product', 'AAA003', 1)
manager.addProduct('Hoodie', 'Green', 740, 'url/of/product', 'AAA004', 1)
manager.getProducts()

manager.getProductsById(3) // Obteniendo productos mediante ID

manager.updateProduct(1, { title: 'New title', price: 500 }) // actualizando productos

manager.deleteProduct(2) // Eliminando productos segun id
manager.getProducts()

