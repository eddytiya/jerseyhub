import React, { useEffect, useState, useRef, useId } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import API_URL from "../../utils/api";
import {
    FaHome,
    FaChevronDown,
    FaBoxOpen
} from "../../utils/navbarIcons";

import MegaMenu from "./MegaMenu";

const CustomerNavbar = () => {

    const [categories, setCategories] = useState([]);
    const [jerseys, setJerseys] = useState([]);
    const [showMenu, setShowMenu] = useState(false);

    const timeoutRef = useRef(null);

    // Unique per navbar instance (desktop + mobile duplicates render
    // simultaneously) so the sliding pill's layoutId never collides.
    const pillId = `nav-pill-${useId()}`;

    useEffect(() => {

        axios
            .get(`${API_URL}/category`)
            .then((resp) => setCategories(resp.data))
            .catch((err) => console.log(err));

        axios
            .get(`${API_URL}/jersey`)
            .then((resp) => setJerseys(resp.data))
            .catch((err) => console.log(err));

    }, []);

    const openMenu = () => {

        clearTimeout(timeoutRef.current);

        setShowMenu(true);

    };

    const closeMenu = () => {

        timeoutRef.current = setTimeout(() => {

            setShowMenu(false);

        }, 200);

    };

    return (

        <div className="nav-links">

            <NavLink
                className="nav-item-custom"
                to="/jerseys"
            >

                {({ isActive }) => (
                    <>
                        {isActive && (
                            <motion.span
                                layoutId={pillId}
                                className="nav-active-pill"
                                transition={{ type: "spring", stiffness: 380, damping: 32 }}
                            />
                        )}
                        <FaHome />
                        Home
                    </>
                )}

            </NavLink>

            <div
                className="category-menu-wrapper"
                onMouseEnter={openMenu}
                onMouseLeave={closeMenu}
            >

                <div className="nav-item-custom category-trigger">

                    Categories

                    <FaChevronDown />

                </div>

                {

                    showMenu && (

                        <MegaMenu

                            categories={categories}

                            jerseys={jerseys}

                        />

                    )

                }

            </div>

            <NavLink
                className="nav-item-custom"
                to="/products"
            >

                {({ isActive }) => (
                    <>
                        {isActive && (
                            <motion.span
                                layoutId={pillId}
                                className="nav-active-pill"
                                transition={{ type: "spring", stiffness: 380, damping: 32 }}
                            />
                        )}
                        <FaBoxOpen />
                        Products
                    </>
                )}

            </NavLink>

        </div>

    );

};

export default CustomerNavbar;