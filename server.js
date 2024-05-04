const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Product = require('./model/productModel.js')
require('dotenv').config()
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


// ConnectDB
mongoose.set("strictQuery", false)
mongoose.connect(process.env.DB)
    .then(() => {
        console.log('DB Connected')
    }).catch((err) => {
        console.log(`DB not connect Error`, err);
    })


// ----------------------------------------------
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    }
    catch (err) {
        console.log(err.message);
        res.status.json({ msg: err.message })
    }
})

app.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findById(id)
        res.status(200).json(product)
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ msg: err.message })
    }

})

app.post('/product', async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ msg: err.message })
    }
})

// findByIdAndUpdate():
app.put('/products/:id', async (req, res) => {
    try {
        const { id } = req.params
        console.log(req.body);
        const product = await Product.findByIdAndUpdate(id, req.body)
        if (!product) {
            return res.status(404).json({ msg: `can not find the product with id${id}` })
        }
        const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct)
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ msg: err.message })
    }

})

app.delete('/products/:id', async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findOneAndDelete(id)
        if (!product) {
            return res.status(404).json({ msg: `can not find the product with id${id}` })
        }
        res.status(200).json({ msg: "Product hase been Successfully deleted !" })
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ msg: err.message })
    }

})


const port = process.env.PORT
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})