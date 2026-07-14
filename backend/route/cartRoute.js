const express = require('express')

const router = express.Router()

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
    addToCart
)
/* ==========================================
                BUY NOW
========================================== */

router.post(

    '/buy-now',

    buyNow

);
// Get user cart
router.get(
    '/:userId',
    getCart
)

/* ==========================================
            GET BUY NOW CART
========================================== */

router.get(

    '/buy-now/:userId',

    getBuyNowCart

);

// Update quantity
router.put(
    '/update/:id',
    updateQuantity
)

// Remove item
router.delete(
    '/remove/:id',
    removeFromCart
)

module.exports = router