const express = require("express");

const {

    subscribeNewsletter,

    getSubscribers,

    deleteSubscriber

} = require("../controller/newsletterController");

const adminAuth = require("../adminAuth");

const router = express.Router();

/* ==========================================
            PUBLIC
========================================== */

router.post(

    "/subscribe",

    subscribeNewsletter

);

/* ==========================================
            ADMIN
========================================== */

router.get(

    "/all",

    adminAuth,

    getSubscribers

);

router.delete(

    "/:id",

    adminAuth,

    deleteSubscriber

);

module.exports = router;