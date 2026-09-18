const express = require('express');

const {

    getAllJerseys,
    getJerseysByIds,
    addJersey,
    updateJersey,
    deleteJersey,
    getJerseyById,
    searchJersey,
    getByCategory,
    getFeaturedJerseys,aiSearch,
    toggleFeatured,getAIMetadata,getAdminJerseys,getAdminJerseyById

} = require('../controller/jerseyController');

const adminAuth =
    require('../adminAuth');

const router = express.Router();
const { adjustInventory, getInventoryLedger } = require("../controller/inventoryController");


// =========================
// PUBLIC ROUTES
// =========================

// Home
router.get(
    '/',
    getAllJerseys
);

// Search
router.get(
    '/search',
    searchJersey
);

// Batch Fetch By IDs
router.get(
    '/batch',
    getJerseysByIds
);

// Category Filter
router.get(
    '/category/:category',
    getByCategory
);

// Featured Jerseys
router.get(
    '/featured',
    getFeaturedJerseys
);

// AI Metadata

router.get(

    "/ai/metadata",

    getAIMetadata

);

router.post(

    "/ai/search",

    aiSearch

);

// Single Jersey
router.get(
    '/show/:identifier',
    getJerseyById
);


// =========================
// ADMIN ROUTES
// =========================

router.get('/admin/all', adminAuth, getAdminJerseys);
router.get('/admin/:id', adminAuth, getAdminJerseyById);

// Add Jersey
router.post(
    '/add',
    adminAuth,
    addJersey
);

// Toggle Featured
router.put(
    '/featured/:id',
    adminAuth,
    toggleFeatured
);

// Update Jersey
router.put(
    '/:id',
    adminAuth,
    updateJersey
);

// Delete Jersey
router.delete(
    '/:id',
    adminAuth,
    deleteJersey
);

router.post("/:id/inventory-adjustment", adminAuth, adjustInventory);
router.get("/:id/inventory-ledger", adminAuth, getInventoryLedger);

module.exports = router;
