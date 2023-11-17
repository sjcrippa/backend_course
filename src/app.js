class ProductManager {
  constructor() {
    this.products = []
    this.id = 1
  }

  addProduct(title, description, price, thumbnail, stock, code) {
    const newProduct = {
      id: this.id++,
      title,
      description,
      price,
      thumbnail,
      stock,
      code
    }
    this.products.push(newProduct)
  }

  getProducts() {
    console.log(this.products);
  }

  getProcutsById() {

  }
}

const manager = new ProductManager()
manager.addProduct('Title', 'Description', 123, 'url', 1, 'code')
manager.addProduct('Title', 'Description', 123, 'url', 1, 'code')
manager.getProducts()