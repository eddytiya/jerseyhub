const express = require("express");

const router = express.Router();

const adminAuth = require("../adminAuth");

const {

    getProducts,

    getProduct,

    addProduct,

    updateProduct,

    deleteProduct

} = require("../controller/ProductController");

/* ==========================================
            GET ALL PRODUCTS
========================================== */

router.get(

    "/",

    getProducts

);

/* ==========================================
            GET SINGLE PRODUCT
========================================== */

router.get(

    "/:id",

    getProduct

);

/* ==========================================
            ADD PRODUCT
========================================== */

router.post(

    "/",

    adminAuth,

    addProduct

);

/* ==========================================
            UPDATE PRODUCT
========================================== */

router.put(

    "/:id",

    adminAuth,

    updateProduct

);

/* ==========================================
            DELETE PRODUCT
========================================== */

router.delete(

    "/:id",

    adminAuth,

    deleteProduct

);

module.exports = router;