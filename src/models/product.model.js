

export default class ProductModel{
    
    constructor(_id,_name,_desc,_price,_imageUrl){
        this.id = _id;
        this.name = _name;
        this.desc = _desc;
        this.price = _price;
        this.imageUrl = _imageUrl;
    }
    
    // Static methods can we called without creating an instance of a class.
    static getProducts(){
         return products;
    }

   
    static add(productObj){
       const newProduct = new ProductModel(products.length + 1, productObj.name , productObj.desc , productObj.price , productObj.imageUrl)
       products.push(newProduct)
    }
    
    static getById(id){
      return products.find((product)=>product.id==id)
    }

    static update(productObj){
       const index = products.findIndex((p) => p.id==productObj.id)
       products[index] = productObj;
    }

    static delete(id){
      const index = products.findIndex((p) => p.id==id);
      products.splice(index,1)
    }

}

var products = [ new ProductModel(
    1,
    'Atomic Habits',
    'Description for Product 1',
    19.99,
    'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
  ),
  new ProductModel(
    2,
    'IKIGAI',
    'Description for Product 2',
    29.99,
    'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg',
  ),
  new ProductModel(
    3,
    'Deep Work',
    'Description for Product 3',
    39.99,
    'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
  )];