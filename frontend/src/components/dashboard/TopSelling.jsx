import React, { memo } from "react";
import './TopSelling.css';

const TopSelling = ({ filteredTopSelling }) => {

    return (

        <div className="top-selling-card fade-up">

            <div className="top-selling-header">

                <h4>

                    🔥 Top Selling Jerseys

                </h4>

            </div>

            <div className="top-selling-body">

                {

                    filteredTopSelling.length === 0

                        ?

                        (

                            <div className="top-empty">

                                <h5 className="text-muted">

                                    No Matching Jerseys Found

                                </h5>

                            </div>

                        )

                        :

                        (

                            <div className="row">

                                {

                                    filteredTopSelling.map((item, index) => (

                                        <div
                                            className="col-lg-4 col-md-6 mb-4"
                                            key={index}
                                        >

                                            <div className="top-product">

                                                <div className="top-product-image">

                                                    <img

                                                        src={item.jersey?.imageUrl}

                                                        alt={item.jersey?.jerseyName}

                                                    />

                                                    <span className="top-rank">

                                                        🔥 #{index + 1}

                                                    </span>

                                                </div>

                                                <div className="top-product-content">

                                                    <h5 className="top-product-title">

                                                        {item.jersey?.teamName}

                                                    </h5>

                                                    <p className="top-product-name">

                                                        {item.jersey?.jerseyName}

                                                    </p>

                                                    <div className="top-product-footer">

                                                        <span className="top-sold">

                                                            🔥 {item.totalSold} Sold

                                                        </span>

                                                        <span className="top-label">

                                                            Bestseller

                                                        </span>

                                                    </div>

                                                    <div className="top-progress">

                                                        <div

                                                            className="top-progress-bar"

                                                            style={{

                                                                width: `${Math.min(item.totalSold * 5, 100)}%`

                                                            }}

                                                        />

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                    ))

                                }

                            </div>

                        )

                }

            </div>

        </div>

    );

};

export default memo(TopSelling);