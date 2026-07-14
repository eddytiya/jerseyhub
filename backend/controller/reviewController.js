const Review = require("../model/Review");

const Jersey = require("../model/jerseyModel");

const Order = require("../model/orderModel");
/* ==========================================
        UPDATE JERSEY RATING
========================================== */

const updateJerseyRating = async (jerseyId) => {

    const reviews = await Review.find({

        jersey: jerseyId,

        status: "published"

    });

    let averageRating = 0;

    if (reviews.length > 0) {

        const total = reviews.reduce(

            (sum, review) => sum + review.rating,

            0

        );

        averageRating = Number(

            (total / reviews.length).toFixed(1)

        );

    }

    await Jersey.findByIdAndUpdate(

        jerseyId,

        {

            averageRating,

            totalReviews: reviews.length

        }

    );

};

/* ==========================================
            ADD REVIEW
========================================== */

const addReview = async (req, res) => {

    try {

        const {

            jersey,

            rating,

            comment,

            images

        } = req.body;

        /* ==========================================
                REQUIRED FIELDS
        ========================================== */

        if (

            !jersey ||

            !rating ||

            !comment

        ) {

            return res.status(400).json({

                message:

                    "Please fill all required fields."

            });

        }

        /* ==========================================
                COMMENT VALIDATION
        ========================================== */

        if (

            comment.trim().length < 10

        ) {

            return res.status(400).json({

                message:

                    "Review should contain at least 10 characters."

            });

        }

        /* ==========================================
                RATING VALIDATION
        ========================================== */

        if (

            rating < 1 ||

            rating > 5

        ) {

            return res.status(400).json({

                message:

                    "Rating must be between 1 and 5."

            });

        }

        /* ==========================================
                DUPLICATE REVIEW CHECK
        ========================================== */

       /* ==========================================
        VERIFY PURCHASE
========================================== */

const purchased = await Order.findOne({

    userId: req.session.userId,

    status: "Delivered",

    "items.jerseyId": jersey

});

if (!purchased) {

    return res.status(403).json({

        message:

            "Only customers who purchased and received this jersey can write a review."

    });

}

/* ==========================================
        ONE REVIEW PER USER
========================================== */

const alreadyReviewed = await Review.findOne({

    jersey,

    user: req.session.userId

});

if (alreadyReviewed) {

    return res.status(400).json({

        message:

            "You have already reviewed this jersey."

    });

}

        /* ==========================================
                CREATE REVIEW
        ========================================== */

       const review = await Review.create({

    jersey,

    user: req.session.userId,

    rating,

    comment,

    verifiedPurchase: true,

    images: Array.isArray(images)

        ?

        images.filter(

            img => img.trim() !== ""

        )

        :

        []

});

        /* ==========================================
                UPDATE PRODUCT RATING
        ========================================== */

        await updateJerseyRating(

            jersey

        );

        const updatedJersey = await Jersey.findById(

            jersey

        );

        return res.status(201).json({

            success: true,

            message:

                "Review Added Successfully.",

            review,

            averageRating:

                updatedJersey.averageRating,

            totalReviews:

                updatedJersey.totalReviews

        });

    }

    catch (err) {

        console.log(err);

        return res.status(500).json({

            message:

                "Failed To Add Review."

        });

    }

};

/* ==========================================
        GET REVIEWS OF A JERSEY
========================================== */

const getJerseyReviews = async (req, res) => {

    try {

        const { jerseyId } = req.params;

        const reviews = await Review.find({

            jersey: jerseyId,

            status: "published"

        })

        .populate(
    "user",
    "uname picture"
)

        .sort({

            createdAt: -1

        });

        return res.status(200).json({

            success: true,

            total: reviews.length,

            reviews

        });

    }

    catch (err) {

    console.log("GET REVIEWS ERROR:");

    console.log(err);

    return res.status(500).json({

        success: false,

        error: err.message,

        stack: err.stack

    });

}

};

/* ==========================================
            UPDATE REVIEW
========================================== */

const updateReview = async (req, res) => {

    try {

        const {

            rating,

            comment,

            images

        } = req.body;

        /* ==========================================
                FIND REVIEW
        ========================================== */

        const review = await Review.findById(

            req.params.id

        );

        if (!review) {

            return res.status(404).json({

                message: "Review Not Found."

            });

        }

        /* ==========================================
                AUTHORIZATION
        ========================================== */

        if (

            review.user.toString() !== req.session.userId

        ) {

            return res.status(403).json({

                message:

                    "You are not authorized to edit this review."

            });

        }

        /* ==========================================
                RATING VALIDATION
        ========================================== */

        if (

            rating < 1 ||

            rating > 5

        ) {

            return res.status(400).json({

                message:

                    "Rating must be between 1 and 5."

            });

        }

        /* ==========================================
                COMMENT VALIDATION
        ========================================== */

        if (

            !comment ||

            comment.trim().length < 10

        ) {

            return res.status(400).json({

                message:

                    "Review should contain at least 10 characters."

            });

        }

        /* ==========================================
                UPDATE REVIEW
        ========================================== */

        review.rating = rating;

        review.comment = comment.trim();

        review.images =

            Array.isArray(images)

                ?

                images.filter(

                    img => img.trim() !== ""

                )

                :

                review.images;

        await review.save();

        /* ==========================================
                UPDATE PRODUCT RATING
        ========================================== */

        await updateJerseyRating(

            review.jersey

        );

        const updatedJersey = await Jersey.findById(

            review.jersey

        );

        return res.status(200).json({

            success: true,

            message:

                "Review Updated Successfully.",

            review,

            averageRating:

                updatedJersey.averageRating,

            totalReviews:

                updatedJersey.totalReviews

        });

    }

    catch (err) {

        console.log(err);

        return res.status(500).json({

            message:

                "Failed To Update Review."

        });

    }

};

/* ==========================================
            DELETE REVIEW
========================================== */

const deleteReview = async (req, res) => {

    try {

        const review = await Review.findById(

            req.params.id

        );

        if (!review) {

            return res.status(404).json({

                message: "Review Not Found."

            });

        }

        if (

            review.user.toString() !==req.session.userId

        ) {

            return res.status(403).json({

                message:

                    "You are not authorized to delete this review."

            });

        }

        const jerseyId = review.jersey;

        await Review.findByIdAndDelete(

            req.params.id

        );

        await updateJerseyRating(

            jerseyId

        );

        return res.status(200).json({

            success: true,

            message: "Review Deleted Successfully."

        });

    }

    catch (err) {

        console.log(err);

        return res.status(500).json({

            message: "Failed To Delete Review."

        });

    }

};

/* ==========================================
            MARK REVIEW HELPFUL
========================================== */

const markHelpful = async (req, res) => {

    try {

        const review = await Review.findById(

            req.params.id

        );

        if (!review) {

            return res.status(404).json({

                message: "Review Not Found."

            });

        }

       review.helpful += 1;

await review.save();

return res.status(200).json({

    success: true,

    message:

        "Marked Helpful.",

    helpful:

        review.helpful

});

    }

    catch (err) {

        console.log(err);

        return res.status(500).json({

            message: "Failed To Update Helpful Count."

        });

    }

};


/* ==========================================
        ADMIN GET ALL REVIEWS
========================================== */

const getAllReviews = async (req, res) => {

    try {

        const reviews = await Review.find()

            .populate(

                "user",

                "uname picture"

            )

            .populate(

                "jersey",

                "name club"

            )

            .sort({

                createdAt: -1

            });

        return res.status(200).json(

            reviews

        );

    }

    catch (err) {

        console.log(err);

        return res.status(500).json({

            message: "Failed to fetch reviews."

        });

    }

};


const adminDeleteReview = async (req, res) => {

    try {

        const review = await Review.findById(req.params.id);

        if (!review) {

            return res.status(404).json({

                message: "Review not found."

            });

        }

        const jerseyId = review.jersey;

        await Review.findByIdAndDelete(req.params.id);

        await updateJerseyRating(jerseyId);

        return res.status(200).json({

            success: true,

            message: "Review deleted successfully."

        });

    }

    catch (err) {

        console.log(err);

        return res.status(500).json({

            message: "Failed to delete review."

        });

    }

};

/* ==========================================
        FEATURED REVIEWS (HOMEPAGE)
========================================== */
const getFeaturedReviews = async (req, res) => {

    try {

        /* ==========================================
                FEATURED REVIEWS
        ========================================== */

        const reviews = await Review.find({

            status: "published",

            rating: 5

        })

            .populate(

                "user",

                "uname picture"

            )

            .populate(

                "jersey",

                "teamName jerseyName imageUrl"

            )

            .sort({

                createdAt: 1

            })

            .limit(8);

        /* ==========================================
                TOTAL REVIEWS
        ========================================== */

        const totalReviews = await Review.countDocuments({

            status: "published"

        });

        /* ==========================================
                AVERAGE RATING
        ========================================== */

        const ratingData = await Review.aggregate([

            {

                $match: {

                    status: "published"

                }

            },

            {

                $group: {

                    _id: null,

                    averageRating: {

                        $avg: "$rating"

                    }

                }

            }

        ]);

        const averageRating =

            ratingData.length > 0

                ?

                Number(

                    ratingData[0].averageRating.toFixed(1)

                )

                :

                0;

        /* ==========================================
                    RESPONSE
        ========================================== */

        return res.status(200).json({

            success: true,

            averageRating,

            totalReviews,

            reviews

        });

    }

    catch (err) {

        console.log(err);

        return res.status(500).json({

            success: false,

            message: "Failed to fetch featured reviews."

        });

    }

};
/* ==========================================
            MODULE EXPORTS
========================================== */

module.exports = {

    addReview,

    getJerseyReviews,

    updateReview,

    deleteReview,

    markHelpful,
    getAllReviews,
    adminDeleteReview,getFeaturedReviews

};