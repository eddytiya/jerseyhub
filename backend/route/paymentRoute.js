const express=require("express");

const router=express.Router();
const identifyUser = require("../identifyUser");
const adminAuth = require("../adminAuth");
const { reconcilePayment, refundOrder } = require("../controller/paymentRecoveryController");

const {

    createRazorpayOrder

}=require("../controller/paymentController");

router.post(

    "/create-order",
    identifyUser,
    createRazorpayOrder

);

router.post("/reconcile/:razorpayOrderId", adminAuth, reconcilePayment);
router.post("/refund/:orderId", adminAuth, refundOrder);

module.exports=router;
