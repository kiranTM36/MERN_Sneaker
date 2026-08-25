const express = require('express')
require('./db')
const app =express()
const cors = require('cors')

//IMPORT MODEL
const userModel = require('./models/userModel')

//IMPORT ROUTES
const userRoute = require('./routes/userRoute')

app.use(cors({
    origin : "",
    credentials : true
}))

app.use(express.urlencoded({extended : true}))
app.use(express.json())



app.use('/user', userRoute)

const PORT = 7700
app.listen(PORT , (req, res)=> {
    console.log("Server Started")
})