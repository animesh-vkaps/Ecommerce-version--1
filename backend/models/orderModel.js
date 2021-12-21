const mongoose = require('mongoose');
const orderSchema = mongoose.Schema(
    {
        user: {  
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'User',
        },
        orderItems: [
          {
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
            description:{type: String, required: true},
            itemTotal:{type: Number, required: true},
            productImage : {type : String}
            // product: {
            //   type: mongoose.Schema.Types.ObjectId,
            //   required: true,
            //   ref: 'Product',
            // },
          },
        ],
        shippingAddress: {
          name: { type: String, required: true },
          phone: { type: Number, required: true },
          address: { type: String, required: true },
          city: { type: String, required: true },
          postalCode: { type: String, required: true },
          country: { type: String, required: true },
        },
        paymentMethod: {
          type: String, 
          required: true,
        }, 
        paymentResult: {
          paymentStatus : {type : String, default :"pending"},
          paymentID: { type: String },
          orderID: { type: String },
          sign: { type: String },
          // email_address: { type: String },
        },
        totalPrice: {
          type: Number,
          required: true,
          default: 0.0,
        },
        
},{timestamps:true})

module.exports = mongoose.model("Orders",orderSchema);