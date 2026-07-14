const Notification = require('../model/Notification')

/* ==========================================
   GET ALL NOTIFICATIONS
========================================== */

exports.getNotifications = async (req, res) => {

    try{

        const notifications = await Notification.find()

        .sort({

            createdAt:-1

        })

        res.json(

            notifications

        )

    }

    catch(err){

        res.status(500).json({

            message:'Failed To Fetch Notifications'

        })

    }

}

/* ==========================================
   GET UNREAD COUNT
========================================== */

exports.getUnreadCount = async (req, res) => {

    try {

        const count = await Notification.countDocuments({

            isRead: false

        })

        res.json({

            count

        })

    }

    catch (err) {

        res.status(500).json({

            message: 'Failed To Get Count'

        })

    }

}

/* ==========================================
   CREATE NOTIFICATION
========================================== */

exports.createNotification = async (req, res) => {

    try{

        const notification = await Notification.create(

            req.body

        )

        res.status(201).json(

            notification

        )

    }

    catch(err){

        res.status(500).json({

            message:'Failed To Create Notification'

        })

    }

}
exports.markAsRead = async (req, res) => {

    try {

        console.log("Notification ID:", req.params.id)

        const notification = await Notification.findByIdAndUpdate(

            req.params.id,

            {

                $set: {

                    isRead: true

                }

            },

            {

                new: true

            }

        )

        console.log(notification)

        res.status(200).json(notification)

    }

    catch(err){

        console.log(err)

        res.status(500).json({

            message:'Failed To Update Notification'

        })

    }

}
/* ==========================================
   MARK ALL READ
========================================== */

exports.markAllRead = async (req, res) => {

    try{

        await Notification.updateMany(

            {},

            {

                isRead:true

            }

        )

        res.json({

            message:'All Notifications Read'

        })

    }

    catch(err){

        res.status(500).json({

            message:'Failed'

        })

    }

}

/* ==========================================
   DELETE NOTIFICATION
========================================== */

exports.deleteNotification = async (req, res) => {

    try{

        await Notification.findByIdAndDelete(

            req.params.id

        )

        res.json({

            message:'Notification Deleted'

        })

    }

    catch(err){

        res.status(500).json({

            message:'Delete Failed'

        })

    }

}