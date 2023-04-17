import { promises as fs} from 'fs'

class ProductManager {
    constructor(path) {
        this.path = path
        this.products = []
    }

    async addProduct(product) {
        if(this.products.find(producto => producto.code == product.code)) {
            return "El prodcuto existe"
        }else {
            this.products.push(product)
        }
    }

    async getProducts() {
        const products = await fs.readFile(this.path, 'utf-8')
        const prods = JSON.parse(products)
        consoloe.log(prods)
    }

    async getProductsById(id) {
        const product = this.products.find(producto => producto.id == id)
        if(product) {
            return product
        }
        return "Not Found"
    }

    async updateProduct() {

    }

    async deleteProduct() {

    }
}

class Product {
    constructor(title, description, price, thumbnail, code, stock){
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
        this.id = Product.incrementID()
    }

    static incrementID() {
        if (this.idIncrement) {
            this.idIncrement++
        } else {
            this.idIncrement = 1
        }
        return this.idIncrement
    }
}

const product1 = new Product ("Fernet Branca", "Aperitivo", "2030", "", "F1", "20")
const product2 = new Product ("Gancia Americano", "Aperitivo", "843", "", "G1", "25")
const product3 = new Product ("Cynar", "Aperitivo", "1160", "", "C2", "30")
const product4 = new Product ("Aperol", "Aperitivo", "1270", "", "A1", "35")
const product5 = new Product ("Campari Bitter", "Aperitivo", "1510", "", "C1", "40")


const productManager = new ProductManager('./info.txt')

/*productManager.addProduct(product1)
productManager.addProduct(product2)
console.log(productManager.addProduct(product1))
console.log(productManager.getProductsById(2))
console.log(productManager.getProductsById(6))
console.log(productManager.getProducts())*/

await productManager.getProducts()