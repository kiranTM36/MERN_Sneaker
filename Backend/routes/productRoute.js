const router = require('express').Router()
const productModel = require('../models/productModel')
const multer = require('../middleware/multer')

router.post('/new/add', multer.single('image'), async (req, res) => {
    try {
        const { productName, categoryId, price, description, quantity } = req.body

        const newProduct = new productModel({
            productName,
            categoryId,
            price,
            image: req.file ? req.file.filename : "",
            description,
            quantity
        })

        const response = await newProduct.save()

        res.status(201).json({
            message: "New product added successfully",
            product: response
        })

    } catch (error) {
        console.error(error)

        if (error.name === 'ValidationError') {
            return res.status(400).json({
                message: "Validation Error",
                details: error.message
            })
        }

        if (error.code === 11000) {
            return res.status(400).json({
                message: "Product name must be unique"
            })
        }

        res.status(500).json({
            message: "Internal Server Error"
        })
    }
})

router.get('/all/product', async(req , res)=> {
    try {
        const response = await productModel.find().populate('categoryId')
        if(response.length === 0){
            return res.status(404).json({
                message : "No Product Found"
            })
        }

        res.status(200).json({
            message : "List of All Product",
            products : response
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
})

router.delete('delete/:id' , async(req , res)=> {
    try {
        const response = await productModel.findByIdAndDelete(req.params.id)

        if(!response){
            return res.status(404).json({
                message : "Product Not Found"
            })
        }
        
        res.status(200).json({
            message : "Product Deleted",
            deletedProduct : response
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
})

router.put('/update/:id', async (req, res) => {
    try {
        const updateData = { ...req.body };
        if (req.file) {
            updateData.image = req.file.filename;
        }

        const updatedItem = await productModel.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }

        return res.status(200).json({
            message: 'Updated successfully',
            data: updatedItem
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async(req, res)=> {
    try {
        const response = await productModel.findById(req.params.id)

        if(!response){
            return res.status(404).json({
                message : "404 Product Not Found",
            })
        }

        res.status(200).json({
            message : "Product Found",
            product : response
        })
    } catch (error) {
        
    }
})

module.exports = router