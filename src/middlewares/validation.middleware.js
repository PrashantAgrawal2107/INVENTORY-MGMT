// Validating the data recieved from the user.

import {body, validationResult} from 'express-validator'

export default async function validateRequest(req,res,next){
    // const {name , price , imageUrl} = req.body
    // let errors=[];
    // if(!name || name.trim()==''){
    //     errors.push('Name is required')
    // }

    // if(!price || parseFloat(price)<1){
    //     errors.push('Price must be a positive value')
    // }

    // try{
    //     const isValid = new URL(imageUrl) 
    // } catch(err){
    //     errors.push('URL is not Valid')
    // }

    // if(errors.length>0){
    //     return res.render('new-product' , {errorMessage:errors[0]})
    // }


    // -- Express Validator Code --
    
    // 1. Setup rules for Validation.
        
        const rules = [
            body('name').notEmpty().withMessage("Name is required"),
            body('price').isFloat({gt:0}).withMessage("Price should be a positive value"),
            body('imageUrl').isURL().withMessage("URL is invalid")
        ];

    // 2. Run those rules.

       await Promise.all(
        rules.map(rule => rule.run(req))
        );


    // 3. Check if there are any errors after running the rules.
       
        var validationErrors = validationResult(req)

    // 4. IF errors, return the error message   

        if(!validationErrors.isEmpty()) {
            return res.render('new-product' , { errorMessage : validationErrors.array()[0].msg });
        }
   
        

    next();
}