const express = require('express');

const { getAllProducts, getSingleProduct, createProduct, editProduct, deleteProduct } = require('../controller/productContoller.js');

const router = express.Router();
// ----------------------------------------------
router.get('/', getAllProducts)

router.get('/:id', getSingleProduct)

router.post('/', createProduct)

// findByIdAndUpdate():
router.put('/:id', editProduct)

router.delete('/:id', deleteProduct)

module.exports = router;
