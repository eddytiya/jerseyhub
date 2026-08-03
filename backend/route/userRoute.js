const express = require('express');
const {

    register,

    login,

    googleLogin,

    dashboard,

    logout,

    getCurrentUser,

    exportCustomersCSV

} = require("../controller/userController");

const adminAuth = require('../adminAuth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.post("/google-login",googleLogin);

router.get('/dashboard', dashboard);
router.get('/logout', logout);
router.get(

    "/me",

    getCurrentUser

);

router.get(

    "/export-customers",

    adminAuth,

    exportCustomersCSV

);
module.exports = router;