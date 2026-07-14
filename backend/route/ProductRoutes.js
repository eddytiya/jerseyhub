const express = require("express");

const router = express.Router();

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

    addProduct

);

/* ==========================================
            UPDATE PRODUCT
========================================== */

router.put(

    "/:id",

    updateProduct

);

/* ==========================================
            DELETE PRODUCT
========================================== */

router.delete(

    "/:id",

    deleteProduct

);

module.exports = router;