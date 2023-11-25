const fs = require('fs')

class ProductManager {
  constructor(path) {
    this.products = []
    this.id = 1
    this.path = path
    this.loadFromFile()
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

  async loadFromFile() {
    try {
      const data = await fs.promises.readFile(this.path, 'utf-8')
      this.products = JSON.parse(data)
    }
    catch (error) {
      console.log('Error reading file: ', error.message);
    }
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    // validacion para que todos los productos sean obligatorios:
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      return console.log('All fields are required');
    }

    // validacion para que no se repita el code:
    const productExist = this.products.find(prod => prod.code === code)
    if (productExist) return console.log(`Product with the code ${code} already exist`);

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
    this.saveToFile()
  }

  getProducts() {
    return this.products
  }

  getProductsById(idProduct) {
    const productById = this.products.find(prod => prod.id === idProduct)
    if (productById) return console.log(productById);
    if (!productById) return console.log('Product not found');
  }

  async updateProduct(id, updatedFields) {
    const prodToUpdate = this.products.find(prod => prod.id === id)

    if (prodToUpdate) {
      Object.assign(prodToUpdate, updatedFields)

      try {
        await fs.promises.writeFile('./products.json', JSON.stringify(this.products, null, 2))
        console.log('Product updated successfully.');
      } catch (error) {
        console.log('Error updating product:', error.message);
      }
    } else {
      console.log('Product not found');
    }
    this.saveToFile()
  }

  async deleteProduct(id) {
    const prodToDelete = this.products.findIndex(prod => prod.id === id)

    if (prodToDelete !== -1) {
      this.products.splice(prodToDelete, 1)
      console.log('Product deleted');
      
    } else {
      console.log('Product not found');
    }
  }

}

const path = 'products.json'
const manager = new ProductManager(path)

manager.addProduct('T-shirt', 'Blue', 250, 'url/of/product', 'AAA001', 1)
manager.addProduct('Hoodie', 'Red', 170, 'url/of/product', 'AAA002', 1)
manager.getProducts()

manager.addProduct('Pants', 'Yellow', 320, 'url/of/product', 'AAA002', 1) // Repitiendo codigo para que no lo agregue
manager.addProduct('Boxes', 'Yellow', 320, 'url/of/product', 'AAA003', 1)
manager.getProducts()

manager.getProductsById(2) // Obteniendo productos mediante ID

manager.updateProduct(1, { title: 'New title', price: 500 }) // actualizando productos

manager.deleteProduct(2) // Eliminando productos segun id