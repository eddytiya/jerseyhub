import React from "react";
import { motion } from "framer-motion";

import "./Wishlist.css";

import WishlistHeader from "./wishlist/WishlistHeader";
import WishlistGrid from "./wishlist/WishlistGrid";
import EmptyWishlist from "./wishlist/EmptyWishlist";

import useWishlist from "../hooks/useWishlist";

/* ==========================================
            ANIMATIONS
========================================== */

const containerVariants = {

    hidden: {},

    visible: {

        transition: {

            staggerChildren: 0.12

        }

    }

};

const Wishlist = () => {

    const {

        wishlist,

        removeFromWishlist,

        moveToCart

    } = useWishlist();

    return (

        <motion.div

            className="wishlist-page container"

            variants={containerVariants}

            initial="hidden"

            animate="visible"

        >

            <WishlistHeader

                totalItems={

                    wishlist.length

                }

            />

            {

                wishlist.length === 0

                ?

                (

                    <EmptyWishlist />

                )

                :

                (

                    <WishlistGrid

                        wishlist={wishlist}

                        removeFromWishlist={

                            removeFromWishlist

                        }

                        moveToCart={

                            moveToCart

                        }

                    />

                )

            }

        </motion.div>

    );

};

export default Wishlist;