import express from 'express'
import ProductController from './src/controllers/product.controller.js'
import path from 'path'
import ejsLayouts from 'express-ejs-layouts'
import validationMiddleware from'./src/middlewares/validation.middleware.js'
import { uploadFile } from './src/middlewares/file-upload.middleware.js'
import UserController from './src/controllers/user.controller.js';
import session from 'express-session'
import { auth } from './src/middlewares/auth.middleware.js'
import cookieParser from 'cookie-parser'
import { setLastVisit } from './src/middlewares/lastVisit.middleware.js'

const server = express()

// Setup view engine settings-->>
server.set("view engine" , "ejs")
server.set("views" , path.join(path.resolve(),"src","views"))


server.use(ejsLayouts)
server.use(session({
    secret:'SecretKey',
    resave:false,
    saveUninitialized:true,
    cookie:{secure : false},
}));
server.use(cookieParser());
// server.use(setLastVisit); // Setting cookie for every request
// Parsing Form Data Recieved from Browser
server.use(express.urlencoded({extended:true}))

// Instance of class imported 
const productController = new ProductController();
const usersController = new UserController();


// Folders containing Files that need to be served statically -->>
server.use(express.static('src/views'))
server.use(express.static('public'))


// Handling all the HTTP Requests -->>
server.get('/new', auth,productController.getAddProductView)
server.get('/',auth,setLastVisit, productController.getProducts)
server.get('/update-product/:id' ,auth, productController.getUpdateProductView)
server.get('/register',usersController.getRegister)
server.get('/login',usersController.getLogin)
server.get('/logout',usersController.logout)

server.post('/delete-product/:id' ,auth, productController.deleteProduct)
// server.post('/',validationMiddleware,uploadFile.single('imageUrl') ,productController.addNewProduct)
server.post('/',uploadFile.single('imageUrl'),auth,validationMiddleware ,productController.addNewProduct)
server.post('/update-product',auth,productController.postUpdateProduct)
server.post('/register', usersController.postRegister)
server.post('/login', usersController.postLogin)


server.listen(3400,()=>{
    console.log("Server is listening on PORT 3400");
});