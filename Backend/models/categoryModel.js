const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    categoryName : {
        type : String,
        required : true,
        unique : true
    },
    cDescription : {
        type : String,
    }
})

module.exports = mongoose.model('category', categorySchema)