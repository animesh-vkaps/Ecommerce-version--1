const express = require('express');
const router = express.Router();
const { createCategory, getAllCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');

//Getting categories
router.get("/category",getAllCategory);

//Posting categories

router.post("/category/addcategory",createCategory);

//Updating category
router.put("/category/:id",updateCategory).delete(deleteCategory);
module.exports = router;