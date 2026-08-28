const express = require('express')
require('./db')
const app =express()
const cors = require('cors')


//IMPORT MODEL
const userModel = require('./models/userModel')
const productModel = require('./models/productModel')
const categoryModel = require('./models/categoryModel')

//IMPORT ROUTES
const userRoute = require('./routes/userRoute')
const productRoute = require('./routes/productRoute')
const categoryRoute = require('./routes/categoryRoute')

app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}))

app.use('/uploads', express.static('uploads'))

app.use(express.urlencoded({extended : true}))
app.use(express.json())

app.use('/user', userRoute )
app.use('/product' ,productRoute )
app.use('/category', categoryRoute)

const PORT = 7700
app.listen(PORT , (req, res)=> {
    console.log("Server Started")
})