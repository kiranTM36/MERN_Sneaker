const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const router = require('express').Router()
const bcrypt = require('bcrypt')

router.post('/signup', async (req, res) => {
    try {
        const data = req.body
        const newUser = await new userModel(data)
        const response = await newUser.save()

        res.status(200).json({
            message: "User Sign Up sucessfully",
            user: response
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "SomeThing Went Wrong",
        })
    }
})

router.post('/login', async (req, res) => {
    try {
        const data = req.body
        const user = await userModel.findOne({email  : data.email})

        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials"
            })
        }

        const isMatch = await bcrypt.compare(data.password , user.password)

        if(!isMatch){
            return res.status(404).json({
                message : "Invalid crediantials"
            })
        }

        const token = jwt.sign({id : user._id, email : user.email},'hahaha',{
            expiresIn : '30d'
        })
        console.log(token)

        res.status(200).json({
            message: "User Sign Up sucessfully",
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "SomeThing Went Wrong",
        })
    }
})

router.get('/all' , async(req, res)=> {
    try {
        const response = await userModel.find()
        if(response.length === 0){
            return res.status(404).json({
                message : "No user have Joined"
            })
        }

        res.status(200).json({
            message : "List of User ",
            user : response
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "SomeThing Went Wrong",
        })
    }
})

router.put('/edit/:id', async(req , res)=> {
    try {
        const { id } = req.params
        const data = req.body
        const user = await userModel.findByIdAndUpdate(id , data , {
            new : true , runValidators : true
        })

        res.status(200).json({
            message : "User Update data Sucessfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "SomeThing Went Wrong",
        })
    }
})

router.delete('/delete/:id' , async(req , res) => {
    try {
        const user = await userModel.findByIdAndDelete(req.params.id)

        if(!user){
            return res.status(400).json({
                message : "Cannot Delete user"
            })
        }
        res.status(200).json({
            message : "user Deleted Sucessfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "SomeThing Went Wrong",
        })
    }
})
module.exports = router