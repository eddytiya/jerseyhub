import React from "react";
import { motion } from "framer-motion";

import "./WishlistGrid.css";

import WishlistCard from "./WishlistCard";

const WishlistGrid = ({

    wishlist,

    removeFromWishlist,

    moveToCart

}) => {

    return (

        <motion.section

            className="wishlist-grid"

            initial="hidden"

            animate="visible"

            variants={{

                hidden:{},

                visible:{

                    transition:{

                        staggerChildren:.08

                    }

                }

            }}

        >

            {

                wishlist.map((item)=>(

                    <WishlistCard

                        key={item._id}

                        item={item}

                        removeFromWishlist={

                            removeFromWishlist

                        }

                        moveToCart={

                            moveToCart

                        }

                    />

                ))

            }

        </motion.section>

    );

};

export default WishlistGrid;