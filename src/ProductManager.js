import { promises as fs } from 'fs'

export class ProductManager {
    constructor() {
        this.product = []
        this.path = './info.txt'
    }
    static incrementID() {
        if (this.idIncrement) {
            this.idIncrement++
        } else {
            this.idIncrement = 1
        }
        return this.idIncrement
    }

    async addProduct(producto) {
        const prodJSON = await fs.readFile(this.path, 'utf-8')
        const prods = JSON.parse(prodJSON)
        producto.id = ProductManager.incrementID()
        prods.push(producto)
        await fs.writeFile(this.path, JSON.stringify(prods))
        return "Producto creado"
    }

    async getProducts() {
        const prods = await fs.readFile(this.path, 'utf-8')
        console.log(prods)
    }

    async getProductsById(id) {
       const prodsJSON = await fs.readFile(this.path, 'utf-8')
       const prods = JSON.parse(prodsJSON)
       if (prods.some(prod => prod.id === parseInt(id))) {
        return prods.find(prod => prod.id === parseInt(id))
       } else {
            return "Producto no entontrado"
       }
    }

    async updateProduct (id, {title, description, price, thumbnail, code, stock}) {
        const prodJSON = await fs.readFile(this.path, 'utf-8')
        const prods = JSON.parse(prodsJSON)
        if (prods.some(prod => prod.id === parseInt(id))){
            let index = prods.findIndex(prod => prod.id === parseInt(id))
            prods[index].title = title
            prods[index].description = description
            prods[index].price = price
            prods[index].thumbnail = thumbnail
            prods[index].code = code
            prods[index].stock = stock
            await fs.writeFile(this.path, JSON.stringify(prods))
            return "Producto actualizado"
        } else {
            return "Producto no encontrado"
        }
    }

    async deleteProduct (id) {
        const prodJSON = await fs.readFile(this.path, 'utf-8')
        const prods = JSON.parse(prodJSON)
        if (prods.some(prod => prod.id === parseInt(id))) {
            const prodsFiltrados = prods.filter(prod => prod.id !== parseInt(id))
            await fs.writeFile(this.path, JSON.stringify(prodsFiltrados))
            return "Producto eliminado"
        } else {
            return "Producto no encontrado"
        }
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
    }

    
}

const product1 = new Product ("Fernet Branca", "Aperitivo", "2030", "", "F1", "20")
const product2 = new Product ("Gancia Americano", "Aperitivo", "843", "", "G1", "25")
const product3 = new Product ("Cynar", "Aperitivo", "1160", "", "C2", "30")
const product4 = new Product ("Aperol", "Aperitivo", "1270", "", "A1", "35")
const product5 = new Product ("Campari Bitter", "Aperitivo", "1510", "", "C1", "40")


const productManager = new ProductManager('./info.txt')
await productManager.addProduct(product1)
await productManager.getProducts()