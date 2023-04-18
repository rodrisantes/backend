import express from 'express'
import { ProductManager } from './ProductManager.js'

const app = express()
const PORT = 4000

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const productManager = new ProductManager("./info.txt")

app.get("/product", async (req, res) => {
    let { limit } = req.query
    const products = await productManager.getProducts()
    res.send(products)
})

app.get("/product/id:", async (req, res) => {
    const product = await productManager.getProductsById(req.params.id)
    res.send(product)
    if (product) {
        res.send(`El producto con el id ${req.params.id} es ${product}`)
    } else {
        res.send(`El producto con el id ${req.params.id} no se encuentra`)
    }
})

app.post("/product", async (req, res) => {
    const {title, description, price, thumbnail, code, stock} = req.body
    await productManager.addProduct({title, description, price, thumbnail, code, stock})
    res.send(product)
})