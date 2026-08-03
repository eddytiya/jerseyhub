const express = require('express')

const router = express.Router()

const adminAuth = require('../adminAuth')

const {

    getNotifications,

    getUnreadCount,

    createNotification,

    markAsRead,

    markAllRead,

    deleteNotification

} = require('../controller/notificationController')

/* ==========================================
   GET ALL NOTIFICATIONS
========================================== */

router.get(

    '/',

    adminAuth,

    getNotifications

)

/* ==========================================
   GET UNREAD COUNT
========================================== */

router.get(

    '/count',

    adminAuth,

    getUnreadCount

)

/* ==========================================
   CREATE NOTIFICATION
========================================== */

router.post(

    '/',

    adminAuth,

    createNotification

)

/* ==========================================
   MARK SINGLE NOTIFICATION AS READ
========================================== */

router.put(

    '/read/:id',

    adminAuth,

    markAsRead

)

/* ==========================================
   MARK ALL NOTIFICATIONS AS READ
========================================== */

router.put(

    '/read-all',

    adminAuth,

    markAllRead

)

/* ==========================================
   DELETE NOTIFICATION
========================================== */

router.delete(

    '/:id',

    adminAuth,

    deleteNotification

)

module.exports = router