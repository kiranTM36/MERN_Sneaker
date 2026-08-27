const router = require('express').Router()

const categoryModel = require('../models/categoryModel')

router.post('/new/add', async (req, res) => {
    try {
        const data = req.body
        const newCategory = new categoryModel(data)
        const response = await newCategory.save()

        res.status(200).json({
            message: "new Category Added",
            response
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
})

router.get('/all', async (req, res) => {
    try {
        const response = await categoryModel.find()
        if (response.length === 0) {
            return res.status(404).json({
                message: "No Product Category Found"
            })
        }

        res.status(200).json({
            message: "All Product Category",
            response
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const reponse = await categoryModel.findByIdAndDelete(req.params.id)
        if (!response) {
            return res.status(404).json({
                message: "Can Find Product",
            })
        }

        res.status(200).json({
            message: "Product Deleted",
            deletedCategory: response
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
})

module.exports = router