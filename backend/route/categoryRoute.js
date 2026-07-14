const express = require('express')

const router = express.Router()

const adminAuth =
    require('../adminAuth')

const {

    getCategories,

    getFeaturedCategories,

    addCategory,

    deleteCategory,

    updateCategory,

    toggleFeaturedCategory

} = require('../controller/categoryController')


// =========================
// PUBLIC ROUTES
// =========================

// Get All Categories

router.get(

    '/',

    getCategories

)
// Get Featured Categories

router.get(

    '/featured',

    getFeaturedCategories

)

// =========================
// ADMIN ROUTES
// =========================

// Add Category

router.post(

    '/add',

    adminAuth,

    addCategory

)


// Delete Category

router.delete(

    '/:id',

    adminAuth,

    deleteCategory

)


// Update Category

router.put(

    '/update/:id',

    adminAuth,

    updateCategory

)

// Toggle Homepage Visibility

router.put(

    '/toggle-featured/:id',

    adminAuth,

    toggleFeaturedCategory

)

module.exports = router