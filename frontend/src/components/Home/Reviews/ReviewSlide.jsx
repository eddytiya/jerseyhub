import React from "react";

import {

    FaStar,

    FaQuoteLeft,

    FaCheckCircle

} from "react-icons/fa";

import "./ReviewSlide.css";

const ReviewSlide = ({ review }) => {

    return (

        <div className="review-slide">

            <FaQuoteLeft className="review-slide-quote" />

            {/* ==========================
                    STARS
            ========================== */}

            <div className="review-slide-stars">

                {

                    [...Array(review.rating)].map((_, index) => (

                        <FaStar

                            key={index}

                            className="review-slide-star"

                        />

                    ))

                }

            </div>

            {/* ==========================
                    COMMENT
            ========================== */}

            <h3 className="review-slide-comment">

                "{review.comment}"

            </h3>

            {/* ==========================
                    JERSEY
            ========================== */}

            <div className="review-slide-jersey">

                <img

                    src={review.jersey?.imageUrl}

                    alt={review.jersey?.jerseyName}

                />

                <div>

                    <h4>

                        {review.jersey?.teamName}

                    </h4>

                    <p>

                        {review.jersey?.jerseyName}

                    </p>

                </div>

            </div>

            {/* ==========================
                    USER
            ========================== */}

            <div className="review-slide-user">

                {

                    review.user?.picture

                    ?

                    <img

                        src={review.user.picture}

                        alt=""

                    />

                    :

                    <div className="review-slide-avatar">

                        {

                            review.user?.uname

                            ?.charAt(0)

                            ?.toUpperCase()

                        }

                    </div>

                }

                <div>

                    <h5>

                        {review.user?.uname}

                    </h5>

                    <span>

                        <FaCheckCircle />

                        Verified Purchase

                    </span>

                </div>

            </div>

        </div>

    );

};

export default ReviewSlide;