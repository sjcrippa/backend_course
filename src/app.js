class ProductManager {
  constructor() {
    this.products = []
    this.id = 1
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    //validacion para que todos los productos sean obligatorios:
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
  }

  getProducts() {
    return this.products
  }

  getProductsById(idProduct) {
    const productById = this.products.find(prod => prod.id === idProduct)
    if (productById) return console.log(productById);
    if (!productById) return console.log('Product not found');
  }

  updateProduct() {

  }

  deleteProduct() {

  }
}

const manager = new ProductManager()
manager.addProduct('T-shirt', 'Blue', 250, 'url/of/product', 'AAA001', 1)
manager.addProduct('Hoodie', 'Red', 170, 'url/of/product', 'AAA002', 1)
manager.getProducts()

manager.addProduct('Pants', 'Yellow', 320, 'url/of/product', 'AAA002', 1)
manager.addProduct('Boxes', 'Yellow', 320, 'url/of/product', 'AAA003', 1)
manager.getProducts()

manager.getProductsById(2)
