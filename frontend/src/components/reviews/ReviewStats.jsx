import React from "react";

import {

    FaStar,

    FaCheckCircle,

    FaThumbsUp,

    FaChartLine

} from "react-icons/fa";

import "./ReviewStats.css";

const ReviewStats = ({ reviews }) => {

    const totalReviews = reviews.length;

    const averageRating = totalReviews

        ?

        (

            reviews.reduce(

                (sum, review) =>

                    sum + review.rating,

                0

            ) / totalReviews

        ).toFixed(1)

        :

        "0.0";

    const verifiedReviews = reviews.filter(

        review =>

            review.verifiedPurchase

    ).length;

    const helpfulVotes = reviews.reduce(

        (sum, review) =>

            sum + review.helpful,

        0

    );

    const cards = [

        {

            title: "Total Reviews",

            value: totalReviews,

            icon: <FaStar />,

            color: "#f59e0b"

        },

        {

            title: "Average Rating",

            value: averageRating,

            suffix: " ⭐",

            icon: <FaChartLine />,

            color: "#3b82f6"

        },

        {

            title: "Verified Reviews",

            value: verifiedReviews,

            icon: <FaCheckCircle />,

            color: "#22c55e"

        },

        {

            title: "Helpful Votes",

            value: helpfulVotes,

            icon: <FaThumbsUp />,

            color: "#8b5cf6"

        }

    ];

    return (

        <div className="review-stats-grid">

            {

                cards.map(

                    (

                        card,

                        index

                    ) => (

                        <div

                            key={index}

                            className="review-stat-card"

                        >

                            <div

                                className="review-stat-icon"

                                style={{

                                    background: card.color

                                }}

                            >

                                {card.icon}

                            </div>

                            <div>

                                <h3>

                                    {card.value}

                                    {card.suffix}

                                </h3>

                                <p>

                                    {card.title}

                                </p>

                            </div>

                        </div>

                    )

                )

            }

        </div>

    );

};

export default ReviewStats;