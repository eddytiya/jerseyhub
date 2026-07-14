import React from "react";

import StarRating from "./StarRating";

import "./RatingBreakdown.css";

const RatingBreakdown = ({

    averageRating = 0,

    totalReviews = 0,

    reviews = []

}) => {

    const counts = {

        5:0,

        4:0,

        3:0,

        2:0,

        1:0

    };

    reviews.forEach(review=>{

        counts[review.rating]++;

    });

    return(

        <div className="rating-breakdown">

            {/* ======================================
                    OVERALL
            ====================================== */}

            <div className="rating-summary">

                <h2>

                    {

                        averageRating.toFixed(1)

                    }

                </h2>

                <StarRating

                    value={averageRating}

                    readOnly

                    size={24}

                />

                <p>

                    Based on

                    <strong>

                        {" "}

                        {totalReviews}

                        {" "}

                    </strong>

                    Reviews

                </p>

            </div>

            {/* ======================================
                    BARS
            ====================================== */}

            <div className="rating-bars">

                {

                    [5,4,3,2,1].map(star=>{

                        const count=counts[star];

                        const percentage=

                            totalReviews===0

                            ?

                            0

                            :

                            (count/totalReviews)*100;

                        return(

                            <div

                                className="rating-row"

                                key={star}

                            >

                                <span>

                                    {star} ★

                                </span>

                                <div className="rating-progress">

                                    <div

                                        className="rating-fill"

                                        style={{

                                            width:`${percentage}%`

                                        }}

                                    ></div>

                                </div>

                                <span>

                                    {count}

                                </span>

                            </div>

                        );

                    })

                }

            </div>

        </div>

    );

};

export default RatingBreakdown;