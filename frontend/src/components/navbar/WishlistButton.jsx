import React from "react";
import { NavLink } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

import useWishlist from "../../hooks/useWishlist";

const WishlistButton = () => {

    const {

        wishlist

    } = useWishlist();

    return (

        <NavLink

            to="/wishlist"

            className="navbar-icon-btn"

        >

            <FaHeart />

            {

                wishlist.length > 0 &&

                <span className="navbar-badge">

                    {wishlist.length}

                </span>

            }

        </NavLink>

    );

};

export default WishlistButton;