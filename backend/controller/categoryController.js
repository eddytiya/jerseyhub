const Category = require('../model/categoryModel')
const Notification = require('../model/Notification')


// Get All Categories
const getCategories = async(req,res)=>{

    try{

        const categories = await Category.find()

        res.json(categories)

    }
    catch(err){

        res.status(500).json(err)

    }

}


// Add Category
const addCategory = async (req, res) => {

    try {

        const category = await Category.create(req.body)

        // Create Notification
        await Notification.create({

            title: "Category Added",

            message: `${category.name} category has been added.`,

            type: "category"

        })

        res.json(category)

    }

    catch (err) {

        res.status(500).json(err)

    }

}

// Delete Category
const deleteCategory = async (req, res) => {

    try {

        const category = await Category.findByIdAndDelete(

            req.params.id

        )

        if (category) {

            // Create Notification
            await Notification.create({

                title: "Category Deleted",

                message: `${category.name} category has been deleted.`,

                type: "category"

            })

            res.json({

                message: "Category Deleted"

            })

        }

        else {

            res.status(404).json({

                message: "Category Not Found"

            })

        }

    }

    catch (err) {

        res.status(500).json(err)

    }

}

const updateCategory = async (req, res) => {

    try {

        const category = await Category.findByIdAndUpdate(

            req.params.id,

            req.body,

            {

                new: true

            }

        )

        if (category) {

            // Create Notification
            await Notification.create({

                title: "Category Updated",

                message: `${category.name} category has been updated.`,

                type: "category"

            })

            res.status(200).json(category)

        }

        else {

            res.status(404).json({

                message: "Category Not Found"

            })

        }

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        })

    }

}
// =====================================
// Get Featured Categories
// =====================================

const getFeaturedCategories = async (req, res) => {

    try {

        const categories = await Category.find({

            featured: true

        })

        res.status(200).json(categories)

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        })

    }

}


// =====================================
// Toggle Featured Category
// =====================================

const toggleFeaturedCategory = async (req, res) => {

    try {

        const category = await Category.findById(req.params.id)

        if (!category) {

            return res.status(404).json({

                message: "Category Not Found"

            })

        }

        category.featured = !category.featured

        await category.save()

        await Notification.create({

            title: "Category Visibility Changed",

            message: `${category.name} is now ${category.featured ? "Visible" : "Hidden"} on homepage.`,

            type: "category"

        })

        res.status(200).json(category)

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        })

    }

}
module.exports = {

    getCategories,

    getFeaturedCategories,

    addCategory,

    deleteCategory,

    updateCategory,

    toggleFeaturedCategory

}