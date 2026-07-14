const express = require('express')

const router = express.Router()

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

    getNotifications

)

/* ==========================================
   GET UNREAD COUNT
========================================== */

router.get(

    '/count',

    getUnreadCount

)

/* ==========================================
   CREATE NOTIFICATION
========================================== */

router.post(

    '/',

    createNotification

)

/* ==========================================
   MARK SINGLE NOTIFICATION AS READ
========================================== */

router.put(

    '/read/:id',

    markAsRead

)

/* ==========================================
   MARK ALL NOTIFICATIONS AS READ
========================================== */

router.put(

    '/read-all',

    markAllRead

)

/* ==========================================
   DELETE NOTIFICATION
========================================== */

router.delete(

    '/:id',

    deleteNotification

)

module.exports = router