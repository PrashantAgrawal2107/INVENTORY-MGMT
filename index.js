import express from 'express'
import ProductController from './src/controllers/product.controller.js'
import path from 'path'
import ejsLayouts from 'express-ejs-layouts'
import validationMiddleware from'./src/middlewares/validation.middleware.js'

const server = express()

// Setup view engine settings-->>
server.set("view engine" , "ejs")
server.set("views" , path.join(path.resolve(),"src","views"))


server.use(ejsLayouts)
// Parsing Form Data Recieved from Browser
server.use(express.urlencoded({extended:true}))

// Instance of class imported from product.controller
const productController = new ProductController();


// Folders containing Files that need to be served statically -->>
server.use(express.static('src/views'))
server.use(express.static('public'))


// Handling all the HTTP Requests -->>
server.get('/new', productController.getAddProductView)
server.get('/', productController.getProducts)
server.get('/update-product/:id' , productController.getUpdateProductView)
server.post('/delete-product/:id' , productController.deleteProduct)
server.post('/',validationMiddleware, productController.addNewProduct)
server.post('/update-product',productController.postUpdateProduct)

server.listen(3400,()=>{
    console.log("Server is listening on PORT 3400");
});