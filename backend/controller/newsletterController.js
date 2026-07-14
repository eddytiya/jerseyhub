const Newsletter = require("../model/newsletterModel");

/* ==========================================
            SUBSCRIBE
========================================== */

const subscribeNewsletter = async (req, res) => {

    try {

        const { email } = req.body;

        /* ==========================
                VALIDATION
        ========================== */

        if (!email) {

            return res.status(400).json({

                success: false,

                message: "Email is required."

            });

        }

        /* ==========================
            CHECK EXISTING EMAIL
        ========================== */

        const existingSubscriber = await Newsletter.findOne({

            email: email.toLowerCase()

        });

        if (existingSubscriber) {

            return res.status(400).json({

                success: false,

                message: "You're already subscribed ❤️"

            });

        }

        /* ==========================
                CREATE
        ========================== */

        const subscriber = await Newsletter.create({

            email: email.toLowerCase(),

            source: "Footer"

        });

        return res.status(201).json({

            success: true,

            message: "Thanks for subscribing! ⚽",

            subscriber

        });

    }

    catch (err) {

        console.log(err);

        return res.status(500).json({

            success: false,

            message: "Something went wrong."

        });

    }

};

/* ==========================================
        GET ALL SUBSCRIBERS (ADMIN)
========================================== */

const getSubscribers = async (req, res) => {

    try {

        const subscribers = await Newsletter.find()

        .sort({

            createdAt: -1

        });

        return res.status(200).json({

            success: true,

            total: subscribers.length,

            subscribers

        });

    }

    catch (err) {

        console.log(err);

        return res.status(500).json({

            success: false,

            message: "Failed to fetch subscribers."

        });

    }

};

/* ==========================================
        DELETE SUBSCRIBER
========================================== */

const deleteSubscriber = async (req, res) => {

    try {

        await Newsletter.findByIdAndDelete(

            req.params.id

        );

        return res.status(200).json({

            success: true,

            message: "Subscriber removed."

        });

    }

    catch (err) {

        console.log(err);

        return res.status(500).json({

            success: false,

            message: "Failed to delete subscriber."

        });

    }

};

module.exports = {

    subscribeNewsletter,

    getSubscribers,

    deleteSubscriber

};