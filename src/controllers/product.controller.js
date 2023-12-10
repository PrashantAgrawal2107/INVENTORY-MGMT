import path from 'path'
import ProductModel from '../models/product.model.js'

                                                     

export default class ProductController{

    getProducts(req,res){
        // console.log(path.resolve())
        // console.log(path.join(path.resolve(),"src","views","products.html"))
        let products = ProductModel.getProducts();
        // console.log(products);
        res.render("products" , {products:products});
        // return res.sendFile(path.join(path.resolve(),"src","views","products.html"))
    }

    getAddProductView(req,res){
       return res.render("new-product",{errorMessage:null});
    }

    addNewProduct(req,res){
        //Acces the form data and add to data model

        // console.log(req.body)
        ProductModel.add(req.body)
        let products = ProductModel.getProducts();
        res.render("products" , {products:products});
    }

    getUpdateProductView(req,res){
        // 1. If product exists-->>
        const id = req.params.id
        const productFound = ProductModel.getById(id);
         if(productFound){
            // let products = ProductModel.getProducts();
            res.render('update-product',{product:productFound , errorMessage: null});
         }
        //2. Product not exists-->>
        else{
            res.status(401).send('Product not found');
        }
    }

    postUpdateProduct(req,res){
        ProductModel.update(req.body)
        let products = ProductModel.getProducts();
        // console.log(products);
        res.render("products" , {products}); 

    } 

    deleteProduct(req,res){

        const id = req.params.id
        const productFound = ProductModel.getById(id);
        if(!productFound){
            return  res.status(401).send('Product not found');
        }
        ProductModel.delete(id);
        let products = ProductModel.getProducts();
        res.render("products" , {products});      
   
    }

}