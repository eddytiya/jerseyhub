const StockAlert = require('../model/StockAlert');
const Jersey = require('../model/jerseyModel');

/* ==========================================
        REQUEST BACK-IN-STOCK ALERT
========================================== */

const createStockAlert = async (req, res) => {

    try {

        const { jerseyId, email } = req.body;

        if (!jerseyId || !email) {

            return res.status(400).json({

                message: "Jersey And Email Are Required"

            });

        }

        const jersey = await Jersey.findById(jerseyId);

        if (!jersey) {

            return res.status(404).json({

                message: "Jersey Not Found"

            });

        }

        if (jersey.stock > 0) {

            return res.status(400).json({

                message: "This Jersey Is Already In Stock"

            });

        }

        const existing = await StockAlert.findOne({

            jerseyId,

            email: email.toLowerCase().trim()

        });

        if (existing) {

            return res.status(200).json({

                message: "You're Already On The Notify List For This Jersey"

            });

        }

        await StockAlert.create({

            jerseyId,

            email,

            userId: req.session?.userId || ""

        });

        res.status(201).json({

            message: "We'll Email You The Moment It's Back In Stock"

        });

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};

module.exports = {

    createStockAlert

};
