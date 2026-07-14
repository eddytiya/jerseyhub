const express = require('express');

const router = express.Router();

const adminAuth = require('../adminAuth');

const {

    placeOrder,

    getOrders,

    getAllOrders,

    getSingleOrder,

    updateOrderStatus,

    downloadInvoice,createRazorpayOrder

} = require("../controller/orderController");

router.post(

    "/create-order",

    createRazorpayOrder

);

/* ==========================================
            CHECKOUT
========================================== */

router.post(

    "/checkout",

    placeOrder

);

/* ==========================================
            ADMIN ROUTES
========================================== */

// Get All Orders

router.get(

    "/admin/all",

    adminAuth,

    getAllOrders

);

// Get Single Order

router.get(

    "/admin/:id",

    adminAuth,

    getSingleOrder

);

// Update Order Status

router.put(

    "/status/:id",

    adminAuth,

    updateOrderStatus

);

/* ==========================================
            CUSTOMER ROUTES
========================================== */

// Download Invoice

router.get(

    "/invoice/:id",

    downloadInvoice

);

// Get Customer Orders

router.get(

    "/:userId",

    getOrders

);

module.exports = router;