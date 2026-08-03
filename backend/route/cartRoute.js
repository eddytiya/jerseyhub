const express = require('express')

const router = express.Router()

const identifyUser = require('../identifyUser')

const {

    addToCart,

    getCart,

    updateQuantity,

    removeFromCart,

    buyNow,

    getBuyNowCart

} = require('../controller/cartController')
// Add item to cart
router.post(
    '/add',
    identifyUser,
    addToCart
)
/* ==========================================
                BUY NOW
========================================== */

router.post(

    '/buy-now',

    identifyUser,

    buyNow

);
// Get user cart
router.get(
    '/:userId',
    identifyUser,
    getCart
)

/* ==========================================
            GET BUY NOW CART
========================================== */

router.get(

    '/buy-now/:userId',

    identifyUser,

    getBuyNowCart

);

// Update quantity
router.put(
    '/update/:id',
    identifyUser,
    updateQuantity
)

// Remove item
router.delete(
    '/remove/:id',
    identifyUser,
    removeFromCart
)

module.exports = router