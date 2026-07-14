import React from "react";

import {

    FaThumbsUp,

    FaCheckCircle

} from "react-icons/fa";

import StarRating from "./StarRating";

import "./ReviewCard.css";

const ReviewCard = ({

    review,

    currentUser,

    onHelpful,

    onDelete,

    onEdit

}) => {

    return (

        <div className="review-card">

            {/* ======================================
                    HEADER
            ====================================== */}

            <div className="review-header">

                <div className="review-user">

                    <div className="review-avatar">

                        {

                          review.user?.picture

                            ?

                            <img

                               src={review.user.picture}

                                alt=""

                            />

                            :

                            <span>

                                {

                                    review.user?.uname
    ?.charAt(0)
                                    ?.toUpperCase()

                                    ||

                                    "U"

                                }

                            </span>

                        }

                    </div>

                    <div className="review-user-info">

    <div className="review-name-row">

        <h5>

            {

                review.user?.uname ||
"User"

            }

        </h5>

        {

            review.verifiedPurchase &&

            <span className="verified-badge">

                <FaCheckCircle />

                Verified Purchase

            </span>

        }

    </div>

    <small className="review-subtitle">

    Verified Football Fan ⚽

</small>

</div>

                </div>

                <div className="review-date">

                    {

                        new Date(

                            review.createdAt

                        ).toLocaleDateString(

                            "en-IN",

                            {

                                day:"numeric",

                                month:"short",

                                year:"numeric"

                            }

                        )

                    }

                </div>

            </div>

            {/* ======================================
                    STARS
            ====================================== */}

            <div className="review-stars">

                <StarRating

                    value={review.rating}

                    readOnly

                    size={20}

                />

            </div>

            {/* ======================================
                    COMMENT
            ====================================== */}

            <p className="review-comment">

                {

                    review.comment

                }

            </p>

            {/* ======================================
                    IMAGES
            ====================================== */}

            {

                review.images?.length>0 &&

                <div className="review-images">

                    {

                        review.images.map(

                            (

                                image,

                                index

                            )=>(

                                <img

    key={index}

    src={image}

    alt={`Review ${index + 1}`}

    loading="lazy"

    onClick={() =>

        window.open(

            image,

            "_blank"

        )

    }

/>

                            )

                        )

                    }

                </div>

            }

            {/* ======================================
                    FOOTER
            ====================================== */}

            <div className="review-footer">

    <button

        className="helpful-btn"

        onClick={()=>

            onHelpful(review._id)

        }

    >

        <FaThumbsUp />

        Helpful

        <span>

            {review.helpful}

        </span>

    </button>

    {

        currentUser &&

        review.user &&

        currentUser._id === review.user._id &&

        <div className="review-owner-actions">

            <button

                className="edit-review-btn"

                onClick={()=>

                    onEdit(review)

                }

            >

                ✏ Edit

            </button>

            <button

                className="delete-review-btn"

                onClick={()=>

                    onDelete(review._id)

                }

            >

                🗑 Delete

            </button>

        </div>

    }

</div>

        </div>

    );

};

export default ReviewCard;