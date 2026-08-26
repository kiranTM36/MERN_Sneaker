const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const router = require('express').Router()
const bcrypt = require('bcrypt')
const { authenticateUser, authorizeRoles } = require('../middleware/authenticate')

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

router.put('/edit/:id', authenticateUser, async (req, res) => {
    try {
        const { id } = req.params;

        if (req.user._id.toString() !== id && req.user.role !== 'admin') {
            return res.status(403).json({
                message: "Forbidden: You can only edit your own account."
            });
        }

        const { password, role, ...updateData } = req.body;

        const updatedUser = await userModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found."
            });
        }

        return res.status(200).json({
            message: "User updated successfully",
            user: updatedUser
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
});
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

router.get('/profile', authenticateUser, authorizeRoles('admin', 'customer'), async (req, res) => {
    try {
        if (!req.user) {
            return res.status(404).json({ message: 'User profile not found.' });
        }

        return res.status(200).json({
            success: true,
            user: req.user
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error fetching profile',
            error: error.message
        });
    }
});
module.exports = router