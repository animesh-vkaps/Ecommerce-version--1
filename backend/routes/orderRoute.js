const express = require('express');
const Order = require('../models/orderModel');
const router = express.Router();
const stripe = require('stripe')("sk_test_51K69poSBL2rd8nNGTtSBIMM6qVTCATqoKfx9e2v9Z8P3UiuAuHuyFIrfUBAnl3ymBPT3zDj1MPk3ueIh3PeVIYMm007kyc00b2")
const { uuid } = require('uuid');
const authenticate = require('../middleware/auth');
const Razorpay = require('razorpay');
const shortId = require('shortid');
const Insta = require('instamojo-nodejs');

//Create an order 
router.post("/order",async(req,res,next)=>{
    try{
       const order = await Order.create(req.body);
    
    res.status(200).json({
        success : true,
        order
    })
    }
    catch(err){
        console.log(err);
    }
});
//Getting all orders on frontend
router.get("/getorders",async(req,res,next)=>{
    try{
        const orders = await Order.find();
    res.status(201).json({
        success : true,
        orders
    })
    }
    catch(error){
        console.log(error);
    }
})
//Getting user's orders according to the user
router.get("/getmyorders", authenticate, async (req, res) => {
    try {
      const orderdata = await Order.find({ user: req.user._id });
      res.status(201).send(orderdata);
    } catch (e) {
      res.status(400).send(e);
      console.log(e);
    }
  });
  router.get("/getoneorder/:id", async (req, res) => {
    try {
      const _id = req.params.id;
      const oneorder = await Order.findById({ _id: _id });
      res.send(oneorder);
    } catch (e) {
      res.send(e);
    }
  });
// router.post("/makepayment" , async(req,res)=>{
//     const { totalPrice , token} = req.body;
// 	console.log("Total Price and token",totalPrice,token);
//     const idempotencyKey = uuid();
//     return stripe.customers.create({
//         email : token.email, 
//         source : token.id
//     }).then(customer =>{
//         stripe.charges.create({
//             amount : totalPrice,
//             currency : "usd",
//             customer : customer.id,
//             receipt_email : token.email
//         },{ idempotencyKey })
//     })
//     .then(result => res.status(200).json(result))
//     .catch(error => console.log(error));
    // try{
    //     const payment = await stripe.paymentIntents.create({
    //         totalPrice,
    //         currency : "usd",
    //         payment_method : token.id,
    //         confirm : true
    //     })
    //     console.log("Payment : ",payment);
    //     res.json({
    //         message : "Payment Successful.",
    //         success : true
    //     })
    // }
    // catch(err){
    //     console.log(err);
    //     res.json({
    //         message : "Payment Failed.",
    //         success : false
    //     })
    // }
//})
//RazorPay Payment Method
var razorpay = new Razorpay({
    key_id: "rzp_test_bTqFRAbhbpekgn",
    key_secret: "yWKhXCr0ncBQCLjY5mxEWGE8",
  });
  
  router.post("/razorpay", async (req, res) => {
    // const order = await Order.create(req.body.productOnline);
    //console.log("0",order);
    const payment_capture = 1;
    console.log("eq.body", req.body);
  
    try {
      const response = await razorpay.orders.create({
        amount: req.body.productOnline.totalPrice*100,
        currency: "INR",
        receipt: shortId.generate(),
        payment_capture,
      });
      //console.log("response", response);
      res.json({
        id: response.id,
        currency: response.currency,
        amount: response.amount,
      });
    } catch (error) {
      console.log(error);
    }
  });

  //Stripe Payment Gateway
  router.post("/makepayment", (req, res) => {
	const { cartTotal, token } = req.body;
	// console.log("PRODUCT ", product);
	// console.log("PRICE ", product.price);
	//const idempontencyKey = uuid();
	// console.log("cart total",req.body.cartTotal);
	// console.log("token email",token.email);
	return stripe.customers
	  .create({
		email: token.email,
		source: token.id
	  })
	  .then(customer => {
		stripe.charges.create(
		  {
			amount:cartTotal,
			currency: "INR",
			customer: customer.id,
			receipt_email: token.email,
			shipping: {
        name: token.card.name,
        address: {
          country: token.card.address_country
        }
      }
			
		  }
		  //{ idempontencyKey }
		);
	  })
	  .then(result => res.status(200).json(result))
	  .catch(err => console.log(err));
  });
  
module.exports = router;