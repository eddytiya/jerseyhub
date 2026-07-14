const express = require('express');

const {

    getAllJerseys,
    addJersey,
    updateJersey,
    deleteJersey,
    getJerseyById,
    searchJersey,
    getByCategory,
    getFeaturedJerseys,aiSearch,
    toggleFeatured,getAIMetadata

} = require('../controller/jerseyController');

const adminAuth =
    require('../adminAuth');

const router = express.Router();


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
    '/show/:id',
    getJerseyById
);


// =========================
// ADMIN ROUTES
// =========================

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

module.exports = router;