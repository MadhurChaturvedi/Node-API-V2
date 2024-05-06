const Product = require('../model/productModel.js')
const asyncHandler = require('express-async-handlr')

// get All Product
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json(products)
    }
    catch (err) {
        res.status(500).json({ msg: "Failed" })
    }
}

// get single Product by ID
const getSingleProduct = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findById(id)
        res.status(200).json(product)
    }
    catch (err) {
        // res.status(500)
        // throw new Error(err.message)
        // console.log(err.message);
        res.status(500).json({ msg: err.message })
    }

})

// create Product

const createProduct = asyncHandler(async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
    }
    catch (err) {
        res.status(500)
        // throw new Error(err.message)
        res.status(500).json({ msg: err.message })

    }
})

// get edit Product by ID
const editProduct = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params
        console.log(req.body);
        const product = await Product.findByIdAndUpdate(id, req.body)
        if (!product) {
            res.status(404)
            throw new Error(`can not find the product with id${id}`)
        }
        const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct)
    }
    catch (err) {
        res.status(500)
        // throw new Error(err.message)
        res.status(500).json({ msg: err.message })

    }

})

// get delete Product by ID

const deleteProduct = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findOneAndDelete(id)
        if (!product) {
            res.status(404)
            throw new Error(`can not find the product with id${id}`)

        }
        res.status(200).json({ msg: "Product hase been Successfully deleted !" })
    }
    catch (err) {
        res.status(500)
        // throw new Error(err.message)
        res.status(500).json({ msg: err.message })

    }

})



module.exports = { getAllProducts, getSingleProduct, createProduct, editProduct, deleteProduct }