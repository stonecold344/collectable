const Category = require('../models/Category')
exports.create = async (req, res) => {
    const { category } = req.body
    const capsCategory = category.charAt().toUpperCase() + category.slice(1)
    const exists = await Category.findOne({category: capsCategory})
    if(exists){
        res.status(400).json({
            errorMessage: `${capsCategory} already exists!`
        })
    }
    else{
        try {
            let newCategory = new Category()
            newCategory.category = capsCategory
            newCategory = await newCategory.save()
            res.status(200).json({
                successMessage: `${newCategory.category} was created!`
            })
        }
        catch (err){
            console.log("Create category error:", err)
            res.status(500).json({
                errorMessage:"Please try again later!"
            })
        }
    }
}
exports.findAll = async(req, res) => {
    await Category.find({})
    .then(category => {
        res.json(category)
    })
    .catch(err =>{
        console.log("Get categories error:", err)
        res.status(500).json({
            errorMessage:"Something went wrong!"
        })
    })
}
exports.delete = async (req, res) => {
    const { category } = req.body
    const capsCategory = category.charAt().toUpperCase() + category.slice(1)
    const exists = await Category.findOne({category: capsCategory})
    if(!exists){
        res.status(400).json({
            errorMessage: `${capsCategory} doesn't exists!`
        })
    }
    else{
        try {
            await Category.deleteOne({_id: exists._id})
            res.status(200).json({
                successMessage: `${capsCategory} was removed!`
            })
        }
        catch (err){
            console.log("Delete category error:", err)
            res.status(500).json({
                errorMessage:"Please try again later!"
            })
        }
    }
}


