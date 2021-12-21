const mongoose = require('mongoose');

//Schema for product
const productSchema = mongoose.Schema({
    name : {
        type : String,
        // required : [true,"Please provide a name for the product."],
        // trim :true
    },
    description : {
        type : String,
        // required : [true,"Please provide a description for the product."]
    },
    sku : {
        type : String,
        // required : [true,"Please provide a description for the product."]
    },
    price:{
        type : Number,
        // required : [true,"Please provide a price for the product."],
        // maxLength : [8,"Price cannot be extended more than eight characters."]

    },
    
    category:{
        type: mongoose.Schema.Types.ObjectId,
         ref: 'Category',
         required: true
   },
    
    productImage : {
        type : String
    }
})
module.exports = mongoose.model("Product",productSchema);