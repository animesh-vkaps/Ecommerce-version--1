const express = require('express');
const { getAllProducts, 
    createProduct, 
    updateProduct, 
    deleteProduct, 
    getProductDetails, 
    categoryAndProduct, 
    newProduct } = require('../controllers/productController');

    const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
const Product = require("../models/productModel");
const category = require('../models/categoryModel');
const router = express.Router();

  

const fs=require("fs")
const sharp=require("sharp")  
const path = require('path');
const multer =require('multer');




const storage = multer.memoryStorage();

const uploads = multer({
  storage,
});


// router.get("/users", (req, res) => {
//   res.send("Hello from the user side");
// });

// router.post('/productdata', async (req, res) => {
//     try {
//         const pro = new product(req.body);
//         const Addproduct = await pro.save()
//         res.status(201).send(Addproduct);
//     } catch (e) { 
//         res.status(400).send(e)
//     }

// }) 

//router.route("/products").get(getAllProducts);

router.get("/products", async (req, res) => {
  try {
    let searchQuery = '' 

    if (req.query.keyword) {
      searchQuery = String(req.query.keyword)
    }

    // for category filter
    if (req.query.category) {
      let categoryQuery = req.query.category
      const findQuery = {
        $and: [
          { category: categoryQuery },
          {
            $or: [
              { name: { $regex: searchQuery, $options: 'i' } },
              { description: { $regex: searchQuery, $options: 'i' } },
            ],
          },
        ],
      }
      const results = await Product.find(findQuery)

      const products = await Product.find(findQuery)
        .sort('-createdAt')
        // .populate('category', 'title')
        .limit(parseInt(req.query.limit))
        .skip(parseInt(req.query.skip))

      return res.json({ success: true, totalResults: results.length, products })
    }

    const findQuery = {
      $or: [
        { name: { $regex: searchQuery, $options: 'i' } },
        { description: { $regex: searchQuery, $options: 'i' } },
      ],
    }

    const results = await Product.find(findQuery)

    const products = await Product.find(findQuery)
      .sort('-createdAt')
      // .populate('category', 'title')
      .limit(parseInt(req.query.limit))
      .skip(parseInt(req.query.skip))

    return res.json({ success: true, totalResults: results.length, products })
  }  catch (e) {
    console.log(e)
    res.status(400).json({ success: false, error: e.message })
  }
});



router.route("/categoryproduct").get(categoryAndProduct)

// router.get("/products",async(req,res,next)=>{
//     if(req.query.category){
//        const product = await Product.find({category : req.query.category});
//        res.status(200).json({
//            success : true,
//            products
//        })
//     }
//     else{
//         const product = await Product.find();
//         res.status(200).json({
//             success : true,
//             products
//         }) 
//     }
// })


//Route for getting detail of single product-
router.get("/product/:id",getProductDetails);

router.route("/product/new").post( 
   uploads.single("productImage"), 
    async function (req, res) {
      // const {name,sku,price,category,description} = req.body;
      console.log("req.file", req.file);
      console.log("req.body", req.body);
  
      fs.access("images", (data) => {
        if (data) {   
          fs.mkdirSync("images");
        }
        else{
          console.log("object")
        }
      });
      const date = new Date();
      await sharp(req.file.buffer)
        .resize({
          width: 400,
          height: 400, 
        })
        .toFile(`images/${date.getTime()}${req.file.originalname}`);
  
      const newProduct = await Product.create({
        ...req.body,
        productImage: `/images/${date.getTime()}${req.file.originalname}`,
      });
      console.log("body", req.body);
  
      await category.updateMany(
        { _id: newProduct.category },
        { $push: { products: newProduct._id } }
      );
  
      return res.send(newProduct);
    })
    //isAuthenticatedUser,authorizeRoles("admin")
  
  
//Commented API old
//router.post("/product/new",newProduct)


// router.route("/product/:id").put(isAuthenticatedUser, authorizeRoles("admin"),updateProduct)
// .delete(deleteProduct)
// .get( isAuthenticatedUser,getProductDetails);

router.delete("/product/:id",deleteProduct);

//router.get("/productcate",categoryAndProduct);

router.patch("/product/:id", async (req, res) => {
  try{
    const _id = req.params.id;
    const updateProduct = await Product.findByIdAndUpdate(_id,req.body);
    res.send(updateProduct);
    

  }
  catch(err){
    res.send(err);
  }
});


module.exports = router;