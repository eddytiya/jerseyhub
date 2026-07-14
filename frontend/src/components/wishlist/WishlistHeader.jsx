import React from "react";
import { motion } from "framer-motion";

import "./WishlistHeader.css";

const WishlistHeader = ({ totalItems }) => {

    return (

        <motion.section

            className="wishlist-header"

            initial={{

                opacity:0,

                y:30

            }}

            animate={{

                opacity:1,

                y:0

            }}

            transition={{

                duration:.45

            }}

        >

            <div className="wishlist-header-glow"></div>

            <div className="wishlist-header-content">

                <div>

                    <h1>

                        ❤️ My Wishlist

                    </h1>

                    <p>

                        Save your favourite jerseys and never lose track of them.

                    </p>

                </div>

                <div className="wishlist-count-card">

                    <span>

                        Saved Jerseys

                    </span>

                    <h2>

                        {totalItems}

                    </h2>

                </div>

            </div>

        </motion.section>

    );

};

export default WishlistHeader;