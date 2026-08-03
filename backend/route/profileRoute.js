const express = require('express')

const router = express.Router()

const {

    getProfile,
    updateProfile,
    changePassword,
    getAddresses,
    addAddress,
    deleteAddress

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

router.get(

    '/addresses',

    getAddresses

)

router.post(

    '/addresses',

    addAddress

)

router.delete(

    '/addresses/:id',

    deleteAddress

)

module.exports = router