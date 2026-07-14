const express = require("express");

const {

    addReview,

    getJerseyReviews,

    updateReview,

    deleteReview,

    markHelpful,

    getAllReviews,
    adminDeleteReview,getFeaturedReviews

} = require("../controller/reviewController");

const userAuth = require("../userAuth");

const adminAuth = require("../adminAuth");

const router = express.Router();

/* ==========================================
            PUBLIC ROUTES
========================================== */

// Get Reviews of a Jersey

router.get(

    "/jersey/:jerseyId",

    getJerseyReviews

);

/* ==========================================
        HOMEPAGE FEATURED REVIEWS
========================================== */

router.get(

    "/featured",

    getFeaturedReviews

);

/* ==========================================
            USER ROUTES
========================================== */

// Add Review

router.post(

    "/add",

    userAuth,

    addReview

);

// Update Own Review

router.put(

    "/:id",

    userAuth,

    updateReview

);

// Delete Own Review

router.delete(

    "/:id",

    userAuth,

    deleteReview

);

// Helpful

router.put(

    "/helpful/:id",

    userAuth,

    markHelpful

);
/* ==========================================
            ADMIN ROUTES
========================================== */

// Get All Reviews

router.get(

    "/admin/all",

    adminAuth,

    getAllReviews

);
router.delete(

    "/admin/:id",

    adminAuth,

    adminDeleteReview

);
// (Future)

// router.put(
//     "/hide/:id",
//     adminAuth,
//     hideReview
// );

// router.delete(
//     "/admin/:id",
//     adminAuth,
//     deleteAnyReview
// );

module.exports = router;