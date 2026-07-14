import React, { useState } from "react";

import ReviewSection from "../reviews/ReviewSection";

const ProductTabs = ({ jersey }) => {

    const [activeTab, setActiveTab] = useState("description");

    return (

        <section className="product-tabs">

            <div className="tabs-header">

                <button

                    className={

                        activeTab === "description"

                            ? "tab-btn active"

                            : "tab-btn"

                    }

                    onClick={() =>

                        setActiveTab("description")

                    }

                >

                    Description

                </button>

                <button

                    className={

                        activeTab === "details"

                            ? "tab-btn active"

                            : "tab-btn"

                    }

                    onClick={() =>

                        setActiveTab("details")

                    }

                >

                    Specifications

                </button>

                <button

                    className={

                        activeTab === "shipping"

                            ? "tab-btn active"

                            : "tab-btn"

                    }

                    onClick={() =>

                        setActiveTab("shipping")

                    }

                >

                    Shipping

                </button>
                <button

    className={

        activeTab === "reviews"

            ?

            "tab-btn active"

            :

            "tab-btn"

    }

    onClick={() =>

        setActiveTab("reviews")

    }

>

    Reviews

    {

        jersey.totalReviews > 0 &&

        <span className="review-count">

            ({jersey.totalReviews})

        </span>

    }

</button>

            </div>

            <div className="tab-content">

                {

                    activeTab === "description" &&

                    <div>

                        <h3>

                            Product Description

                        </h3>

                        <p>

                            {jersey.description}

                        </p>

                    </div>

                }

                {

                    activeTab === "details" &&

                    <div>

                        <h3>

                            Product Specifications

                        </h3>

                        <ul>

                            <li>

                                <strong>Team :</strong> {jersey.teamName}

                            </li>

                            <li>

                                <strong>Category :</strong> {jersey.category}

                            </li>

                            <li>

                                <strong>Season :</strong> {jersey.season}

                            </li>

                            <li>

                                <strong>Type :</strong> {jersey.jerseyType}

                            </li>

                            <li>

                                <strong>Available Sizes :</strong>{" "}

                                {jersey.sizes?.join(", ")}

                            </li>

                        </ul>

                    </div>

                }

                {

                    activeTab === "shipping" &&

                    <div>

                        <h3>

                            Shipping & Returns

                        </h3>

                        <p>

                            🚚 Free shipping on eligible orders.

                        </p>

                        <p>

                            🔄 Easy 7-day return policy.

                        </p>

                        <p>

                            🔒 Secure packaging for every order.

                        </p>

                    </div>

                }

                {

                    activeTab === "reviews" &&

                    (

                        <div>

                            <ReviewSection

                                jerseyId={jersey._id}

                            />

                        </div>

                    )

                }

            </div>

        </section>

    );

};

export default ProductTabs;