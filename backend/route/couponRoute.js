const express = require('express');

const router = express.Router();

const adminAuth = require('../adminAuth');

const userAuth = require('../userAuth');

const {

    createCoupon,

    getAllCoupons,

    updateCoupon,

    deleteCoupon,

    validateCoupon

} = require('../controller/couponController');

/* ==========================================
        CUSTOMER - VALIDATE AT CHECKOUT
========================================== */

router.post('/validate', userAuth, validateCoupon);

/* ==========================================
                ADMIN ROUTES
========================================== */

router.get('/', adminAuth, getAllCoupons);

router.post('/', adminAuth, createCoupon);

router.put('/:id', adminAuth, updateCoupon);

router.delete('/:id', adminAuth, deleteCoupon);

module.exports = router;
