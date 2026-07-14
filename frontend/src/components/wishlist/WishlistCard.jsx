import React from "react";
import { motion } from "framer-motion";

import {
    FaHeart,
    FaShoppingCart,
    FaTag
} from "react-icons/fa";

import "./WishlistCard.css";

const WishlistCard = ({

    item,

    removeFromWishlist,

    moveToCart

}) => {

    return (

        <motion.article

            className="wishlist-card"

            variants={{

                hidden:{

                    opacity:0,

                    y:30

                },

                visible:{

                    opacity:1,

                    y:0

                }

            }}

            whileHover={{

                y:-8

            }}

        >

            <div className="wishlist-image-wrapper">

                <img

                    src={item.imageUrl}

                    alt={item.jerseyName}

                    className="wishlist-image"

                />

                <button

                    className="wishlist-remove-btn"

                    onClick={()=>

                        removeFromWishlist(

                            item._id

                        )

                    }

                >

                    <FaHeart />

                </button>

            </div>

            <div className="wishlist-content">

                <span className="wishlist-category">

                    <FaTag />

                    {item.category}

                </span>

                <h3>

                    {item.jerseyName}

                </h3>

                <p>

                    {item.teamName}

                </p>

                <h2>

                    ₹ {Number(item.price).toLocaleString()}

                </h2>

                <div className="wishlist-buttons">

                    <button

                        className="wishlist-cart-btn"

                        onClick={()=>

                            moveToCart(item)

                        }

                    >

                        <FaShoppingCart />

                        Move To Cart

                    </button>

                    <button

                        className="wishlist-delete-btn"

                        onClick={()=>

                            removeFromWishlist(

                                item._id

                            )

                        }

                    >

                        Remove

                    </button>

                </div>

            </div>

        </motion.article>

    );

};

export default WishlistCard;