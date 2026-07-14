import React, { memo } from "react";
import './PriceAnalytics.css';

const PriceAnalytics = ({ mostExpensive, cheapest }) => {

    const cards = [

        {

            title: "💎 Most Expensive Jersey",

            data: mostExpensive,

            gradient: "linear-gradient(135deg,#ef4444,#dc2626)",

            priceColor: "#dc2626",

            badge: "Premium"

        },

        {

            title: "💰 Cheapest Jersey",

            data: cheapest,

            gradient: "linear-gradient(135deg,#2563eb,#1d4ed8)",

            priceColor: "#2563eb",

            badge: "Best Value"

        }

    ];

    return (

        <div className="row mb-5">

            {

                cards.map((card, index) => (

                    <div
                        className="col-lg-6 mb-4"
                        key={index}
                    >

                        <div className="price-card">

                            <div
                                className="price-header"
                                style={{
                                    background: card.gradient
                                }}
                            >

                                <h4>

                                    {card.title}

                                </h4>

                            </div>

                            <div className="price-body">

                                <img

                                    src={card.data?.imageUrl}

                                    alt={card.data?.jerseyName}

                                    className="price-image"

                                />

                                <span className="price-badge">

                                    {card.badge}

                                </span>

                                <h3 className="price-team">

                                    {card.data?.teamName}

                                </h3>

                                <p className="price-name">

                                    {card.data?.jerseyName}

                                </p>

                                <h1
                                    className="price-value"
                                    style={{
                                        color: card.priceColor
                                    }}
                                >

                                    ₹ {card.data?.price}

                                </h1>

                                <hr className="price-divider" />

                                <div className="row text-center">

                                    <div className="col-6">

                                        <div className="price-info-title">

                                            Category

                                        </div>

                                        <div className="price-info-value">

                                            {card.data?.category}

                                        </div>

                                    </div>

                                    <div className="col-6">

                                        <div className="price-info-title">

                                            Stock

                                        </div>

                                        <div className="price-info-value">

                                            {card.data?.stock}

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                ))

            }

        </div>

    );

};

export default memo(PriceAnalytics);