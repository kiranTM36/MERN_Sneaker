const mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/sneaker")

const db = mongoose.connection

db.on('connected', ()=> {
    console.log("MongoDB connected")
})

db.on('error', (error)=> {
    console.log("MongoDB connetion Error : " + error)
})

db.on('disconnected', ()=> {
    console.log("MongoDB Disconnected")
})

module.exports = db