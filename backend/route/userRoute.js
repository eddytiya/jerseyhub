const express = require('express');
const {

    register,

    login,

    googleLogin,

    dashboard,

    logout,

    getCurrentUser

} = require("../controller/userController");

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
module.exports = router;