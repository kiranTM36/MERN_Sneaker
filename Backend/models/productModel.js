const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    productName : {
        type : String,
        match : [/^[a-zA-Z]+$/,'product can only contains letters'],
        required : true,
        trim : true,
        unique : [true , "Product should be Unique to each Other"]
    },

    categoryId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'category',
        required : [true, "Category of Product should be Defined"]
    },

    price : {
        type : Number,
        required : true,
        default : 0
    },

    image : {
        type : String,
        trim : true,
        default : ""
    },

    description : {
        type : String,
        trim : true,
        maxLength : [1000, "Length Of Description cannot be More than Thousand"]
    },

    quantity : {
        type : Number,
        required : true,
        default : [0, "Quantity of Product cannot Negative"]
    }
})

module.exports = mongoose.model('products', productSchema)