class ProductManager {
  constructor() {
    this.products = [];
    this.nextProductId = 1
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
    product.id = this.nextProductId++;

    // Agregar productos al arreglo
    this.products.push(product);
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
      console.log('Error: Product not found');
    }
    return product;
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
manager.getProducts()
