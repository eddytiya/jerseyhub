const express = require('express')

const router = express.Router()

const {

    getProfile,
    updateProfile,
    changePassword

} = require('../controller/profileController')

router.get(

    '/',

    getProfile

)

router.put(

    '/',

    updateProfile

)

router.put(

    '/change-password',

    changePassword

)

module.exports = router