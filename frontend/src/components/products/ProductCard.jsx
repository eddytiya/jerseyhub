import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "./ProductCard.css";

import useWishlist from "../../hooks/useWishlist";

const ProductCard = ({ product }) => {

    const navigate = useNavigate();

    const {

        wishlist,

        addToWishlist,

        removeFromWishlist

    } = useWishlist();

    const isWishlisted = wishlist.some(

        (item) => item._id === product._id

    );

    return (

        <div className="gridddddd-product-card">

            {/* Featured */}

            {

                product.featured &&

                <div className="gridddddd-featured-badge">

                    ⭐ Featured

                </div>

            }

            {/* Category */}

            <div className="gridddddd-category-pill">

                {product.category}

            </div>

            {/* Wishlist */}

            <button

                className={`gridddddd-wishlist-btn ${

                    isWishlisted

                        ?

                        "active"

                        :

                        ""

                }`}

                onClick={(e) => {

                    e.stopPropagation();

                    if (isWishlisted) {

                        removeFromWishlist(

                            product._id

                        );

                    }

                    else {

                        addToWishlist(

                            product

                        );

                    }

                }}

            >

                {

                    isWishlisted

                        ?

                        <FaHeart />

                        :

                        <FaRegHeart />

                }

            </button>

            {/* Image */}

            <div

                className="gridddddd-product-image"

                onClick={() => navigate(`/jersey/${product._id}`)}

            >

                <img

                    src={product.imageUrl}

                    alt={product.jerseyName}

                />

            </div>

            {/* Body */}

            <div className="gridddddd-product-body">

                <h3>

                    {product.jerseyName}

                </h3>

                <p className="gridddddd-team-name">

                    {product.teamName}

                </p>

                {

                    product.stock > 5

                        ?

                        (

                            <span className="gridddddd-stock gridddddd-available">

                                ✓ In Stock

                            </span>

                        )

                        : product.stock > 0

                            ?

                            (

                                <span className="gridddddd-stock gridddddd-low-stock">

                                    Only {product.stock} Left

                                </span>

                            )

                            :

                            (

                                <span className="gridddddd-stock gridddddd-unavailable">

                                    ✕ Out Of Stock

                                </span>

                            )

                }

                <div className="gridddddd-price">

                    ₹ {product.price}

                </div>

                <button

                    className="gridddddd-view-btn"

                    onClick={() => navigate(`/jersey/${product._id}`)}

                >

                    View Product

                </button>

            </div>

        </div>

    );

};

export default ProductCard;