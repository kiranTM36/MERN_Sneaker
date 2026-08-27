const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        trim : true
    },
    email : {
        type : String,
        required : true,
        unique : [true, "Email should be unique"]
    },
    password :{
        type : String,
        required : true,
    },
    role : {
        type : String,
        enum : ['customer','admin'],
        default : 'customer'
    }
}, {timestamps  : true})

userSchema.pre('save', async function (){
    if(!this.isModified('password')) return
    this.password = await bcrypt.hash(this.password,10)
})

module.exports = mongoose.model('user',userSchema)