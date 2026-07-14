import React from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

import { FaHeartBroken } from "react-icons/fa";

import "./EmptyWishlist.css";

const EmptyWishlist = () => {

    return (

        <motion.section

            className="wishlist-empty"

            initial={{

                opacity:0,

                y:40

            }}

            animate={{

                opacity:1,

                y:0

            }}

            transition={{

                duration:.5

            }}

        >

            <div className="wishlist-empty-circle"></div>

            <div className="wishlist-empty-circle two"></div>

            <div className="wishlist-empty-icon">

                <FaHeartBroken />

            </div>

            <h2>

                Your Wishlist is Empty

            </h2>

            <p>

                Looks like you haven't added any favourite jerseys yet.

                Start exploring and save the ones you love.

            </p>

            <NavLink

                to="/jerseys"

                className="wishlist-shop-btn"

            >

                Continue Shopping

            </NavLink>

        </motion.section>

    );

};

export default EmptyWishlist;