const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const productRoute = require('./routes/productroute.js')
const { errorMiddleware } = require('./middleware/error.Middleware.js')

require('dotenv').config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const frontend = 'https://node-api-v2-fronet-end.vercel.app'
console.log(frontend);
var corsOptions = {
    origin: frontend,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))

app.use('/api/products', productRoute)

// ConnectDB
// mongoose.set("strictQuery", false)
mongoose.connect(process.env.DB)
    .then(() => {
        console.log('DB Connected')
    }).catch((err) => {
        console.log(`DB not connect Error`, err);
    })

// app.get('/', (req, res) => {
//     throw new Error('Fake Error')
//     res.send('hello node api')
// })


app.use(errorMiddleware)

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Example app listening on port ${port}🎃`)
})