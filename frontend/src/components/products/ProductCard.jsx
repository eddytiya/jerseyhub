import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { FaHeart, FaRegHeart, FaBalanceScale } from "react-icons/fa";
import "./ProductCard.css";

import useWishlist from "../../hooks/useWishlist";
import { useCompare } from "../compare/CompareContext";

const TILT_SPRING = { stiffness: 300, damping: 20, mass: 0.5 };
const EASE_OUT = [0.16, 1, 0.3, 1];

const ProductCard = ({ product, index = 0 }) => {

    // Capped so a long grid doesn't queue up a slow cascade of delays
    const entranceDelay = Math.min(index * 0.05, 0.3);

    const navigate = useNavigate();
    const cardRef = useRef(null);
    const reduceMotion = useReducedMotion();

    const rotateX = useSpring(useMotionValue(0), TILT_SPRING);
    const rotateY = useSpring(useMotionValue(0), TILT_SPRING);

    const handleMouseMove = (e) => {

        if (reduceMotion || !cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;

        rotateY.set(px * 8);
        rotateX.set(py * -8);

    };

    const handleMouseLeave = () => {

        rotateX.set(0);
        rotateY.set(0);

    };

    const {

        wishlist,

        addToWishlist,

        removeFromWishlist

    } = useWishlist();

    const { compareList, addToCompare, removeFromCompare } = useCompare();

    const isWishlisted = wishlist.some(

        (item) => item._id === product._id

    );

    const isComparing = compareList.some(

        (item) => item._id === product._id

    );

    return (

        <motion.div
            ref={cardRef}
            className="gridddddd-product-card"
            style={{ rotateX, rotateY, transformPerspective: 800 }}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, delay: entranceDelay, ease: EASE_OUT }
            }}
            viewport={{ once: true, amount: 0.25 }}
            whileHover={{
                y: -10,
                scale: 1.02,
                transition: { duration: 0.24, ease: EASE_OUT }
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >

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

            {/* Compare */}

            <button

                className={`gridddddd-compare-btn ${isComparing ? "active" : ""}`}

                title="Add To Compare"

                onClick={(e) => {

                    e.stopPropagation();

                    if (isComparing) {

                        removeFromCompare(product._id);

                    }

                    else {

                        addToCompare(product);

                    }

                }}

            >

                <FaBalanceScale />

            </button>

            {/* Image */}

            <div

                className="gridddddd-product-image"

                onClick={() => navigate(`/jersey/${product.slug || product._id}`)}

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

                    onClick={() => navigate(`/jersey/${product.slug || product._id}`)}

                >

                    View Product

                </button>

            </div>

        </motion.div>

    );

};

export default ProductCard;
