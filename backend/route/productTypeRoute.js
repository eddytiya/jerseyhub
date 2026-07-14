const express = require("express");

const router = express.Router();

const adminAuth = require("../adminAuth");

const {

    getProductTypes,

    addProductType,

    updateProductType,

    deleteProductType,

    toggleProductTypeStatus

} = require("../controller/productTypeController");

/* ==========================================
            PUBLIC ROUTES
========================================== */

// Get All Product Types
router.get(
    "/",
    getProductTypes
);

/* ==========================================
            ADMIN ROUTES
========================================== */

// Add Product Type
router.post(
    "/add",
    adminAuth,
    addProductType
);

// Update Product Type
router.put(
    "/update/:id",
    adminAuth,
    updateProductType
);

// Delete Product Type
router.delete(
    "/:id",
    adminAuth,
    deleteProductType
);

// Toggle Status
router.put(
    "/toggle-status/:id",
    adminAuth,
    toggleProductTypeStatus
);

module.exports = router;