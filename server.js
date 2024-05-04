const express = require('express')
const app = express()
require('dotenv').config()

// middleWare
app.use(express.json())

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})