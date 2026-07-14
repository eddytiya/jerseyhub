import React from "react";

import {

    FaStar,

    FaArrowTrendUp

} from "react-icons/fa6";

import "./ReviewStatsCard.css";

const ReviewStatsCard = ({

    totalReviews = 0

}) => {

    return (

        <div className="review-stats-card">

            <div className="review-card-content">

                <div>

                    <span className="review-card-title">

                        Total Reviews

                    </span>

                    <h2 className="review-card-value">

                        {totalReviews}

                    </h2>

                    <p className="review-card-subtitle">

                        Customer Feedback

                    </p>

                </div>

                <div className="review-card-icon">

                    <FaStar />

                </div>

            </div>

            <div className="review-card-footer">

                <FaArrowTrendUp />

                <span>

                    Reviews are growing

                </span>

            </div>

        </div>

    );

};

export default ReviewStatsCard;