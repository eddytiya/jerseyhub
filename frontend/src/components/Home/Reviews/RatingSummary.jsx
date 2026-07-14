import React from "react";
import { motion } from "framer-motion";
import {
    FaStar,
    FaUsers,
    FaCheckCircle
} from "react-icons/fa";

import "./RatingSummary.css";

const RatingSummary = ({

    averageRating,

    totalReviews

}) => {

    return (

        <motion.div

            className="rating-summary"

            initial={{

                opacity: 0,

                y: 40

            }}

            whileInView={{

                opacity: 1,

                y: 0

            }}

            viewport={{

                once: true

            }}

            transition={{

                duration: 0.5

            }}

        >

            <div className="rating-summary-card">

                <FaStar className="rating-summary-icon" />

                <h2>

                    {averageRating}

                </h2>

                <p>

                    Average Rating

                </p>

            </div>

            <div className="rating-summary-card">

                <FaUsers className="rating-summary-icon" />

                <h2>

                    {totalReviews}

                </h2>

                <p>

                    Happy Customers

                </p>

            </div>

            <div className="rating-summary-card">

                <FaCheckCircle className="rating-summary-icon" />

                <h2>

                    100%

                </h2>

                <p>

                    Verified Purchases

                </p>

            </div>

        </motion.div>

    );

};

export default RatingSummary;