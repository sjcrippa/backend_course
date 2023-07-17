class ProductManager {
  constructor() {
    this.products = [];
    this.nextProductId = 1;
  }

  addProduct(product) {
    // VALIDACION CAMPOS OBLIGATORIOS:
    if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
      console.log("Error: Todos los campos son obligatorios.");
      return;
    }

    // VALIDACION PARA QUE NO SE REPITA EL CODIGO
    const existingProduct = this.products.find(p => p.code === product.code);
    if (existingProduct) {
      console.log("Error: El código del producto ya existe.");
      return;
    }

    // ID AUTOINCREMENTABLE Y AGREGAR PRODUCTOS AL ARRAY:
    product.id = this.nextProductId++;
    this.products.push(product);
    console.log("Producto agregado:", product);
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find(p => p.id === id);
    if (product) {
      return product;
    } else {
      console.log("Error: Producto no encontrado.");
    }
  }
}

// EJEMPLO

const manager = new ProductManager();

manager.addProduct({
  title: "Nike SB Dunk Low Pro",
  description: "Zapatillas de Moda para Hombre",
  price: 65.999,
  thumbnail: "https://nikearprod.vtexassets.com/arquivos/ids/532495-1200-1200?v=638161394158070000&width=1200&height=1200&aspect=true",
  code: "AAA001", 
  stock: 10
});

manager.addProduct({
  title: "Nike Air Max Exceen",
  description: "Zapatillas de Moda para Hombre",
  price: 57.499,
  thumbnail: "https://nikearprod.vtexassets.com/arquivos/ids/701104-1200-1200?v=638233823018430000&width=1200&height=1200&aspect=true",
  code: "AAA002",
  stock: 10
});

console.log(manager.getProducts());

console.log(manager.getProductById(2));
console.log(manager.getProductById(3));