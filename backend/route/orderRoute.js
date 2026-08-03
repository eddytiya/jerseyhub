const express = require('express');

const router = express.Router();

const adminAuth = require('../adminAuth');

const userAuth = require('../userAuth');

const identifyUser = require('../identifyUser');

const {

    placeOrder,

    verifyPayment,

    getOrders,

    getAllOrders,

    exportOrdersCSV,

    getSingleOrder,

    updateOrderStatus,

    downloadInvoice,

    requestReturn,

    updateReturnStatus,

    cancelOrder

} = require("../controller/orderController");

const { createRazorpayOrder } = require("../controller/paymentController");

router.post(

    "/create-order",

    identifyUser,

    createRazorpayOrder

);

/* ==========================================
            CHECKOUT (LOGGED-IN OR GUEST)
========================================== */

router.post(

    "/checkout",

    identifyUser,

    placeOrder

);

/* ==========================================
            VERIFY RAZORPAY PAYMENT
========================================== */

router.post(

    "/verify-payment",

    identifyUser,

    verifyPayment

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

// Export Orders To CSV

router.get(

    "/admin/export",

    adminAuth,

    exportOrdersCSV

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

// Update Return Status

router.put(

    "/:id/return-status",

    adminAuth,

    updateReturnStatus

);

/* ==========================================
            CUSTOMER ROUTES
========================================== */

// Download Invoice

router.get(

    "/invoice/:id",

    identifyUser,

    downloadInvoice

);

// Request Return / Refund

router.post(

    "/:id/return-request",

    identifyUser,

    requestReturn

);

// Cancel Order

router.put(

    "/:id/cancel",

    identifyUser,

    cancelOrder

);

// Get Customer Orders

router.get(

    "/:userId",

    userAuth,

    getOrders

);

module.exports = router;