import React from "react";
import { motion } from "framer-motion";
import {
    FaStar,
    FaQuoteLeft,
    FaCheckCircle
} from "react-icons/fa";

import "./ReviewCard.css";

const ReviewCard = ({ review }) => {

    const {

        user,

        jersey,

        comment,

        rating,

        createdAt

    } = review;

    return (

        <motion.div

            className="review-card"

            whileHover={{

                y: -8,

                scale: 1.02

            }}

            transition={{

                duration: 0.25

            }}

        >

            <FaQuoteLeft className="review-quote" />

            {/* ==========================
                    STARS
            ========================== */}

            <div className="review-stars">

                {

                    [...Array(rating)].map((_, index) => (

                        <FaStar

                            key={index}

                            className="review-star"

                        />

                    ))

                }

            </div>

            {/* ==========================
                    REVIEW
            ========================== */}

            <p className="review-comment">

                "{comment}"

            </p>

            {/* ==========================
                    JERSEY
            ========================== */}

            <div className="review-jersey">

                <img

                    src={jersey?.imageUrl}

                    alt={jersey?.jerseyName}

                />

                <div>

                    <h5>

                        {jersey?.teamName}

                    </h5>

                    <span>

                        {jersey?.jerseyName}

                    </span>

                </div>

            </div>

            {/* ==========================
                    USER
            ========================== */}

            <div className="review-user">

                <img

                    src={

                        user?.picture ||

                        "/default-avatar.png"

                    }

                    alt={user?.uname}

                />

                <div>

                    <h6>

                        {user?.uname}

                    </h6>

                    <span>

                        <FaCheckCircle />

                        Verified Purchase

                    </span>

                </div>

            </div>

            {/* ==========================
                    DATE
            ========================== */}

            <small>

                {

                    new Date(createdAt)

                        .toLocaleDateString()

                }

            </small>

        </motion.div>

    );

};

export default ReviewCard;