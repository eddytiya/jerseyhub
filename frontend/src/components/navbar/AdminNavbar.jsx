import React from "react";

import { NavLink } from "react-router-dom";

import {

    FaTachometerAlt,

    FaTshirt,

    FaTags,

    FaClipboardList,

    FaStar,

    FaLayerGroup

} from "../../utils/navbarIcons";

const AdminNavbar = () => {

    return (

        <nav className="admin-navbar">

            <NavLink
                to="/"
                end
                className={({ isActive }) =>
                    isActive
                        ? "admin-nav-link active"
                        : "admin-nav-link"
                }
            >
                <FaTachometerAlt />

                <span>

                    Dashboard

                </span>

            </NavLink>

            <NavLink
                to="/manage-jerseys"
                className={({ isActive }) =>
                    isActive
                        ? "admin-nav-link active"
                        : "admin-nav-link"
                }
            >
                <FaTshirt />

                <span>

                    Jerseys

                </span>

            </NavLink>

            <NavLink
                to="/manage-categories"
                className={({ isActive }) =>
                    isActive
                        ? "admin-nav-link active"
                        : "admin-nav-link"
                }
            >
                <FaTags />

                <span>

                    Categories

                </span>

            </NavLink>

            {/* NEW PRODUCT TYPES */}

            <NavLink
                to="/product-types"
                className={({ isActive }) =>
                    isActive
                        ? "admin-nav-link active"
                        : "admin-nav-link"
                }
            >
                <FaLayerGroup />

                <span>

                    Product Types

                </span>

            </NavLink>

            <NavLink
                to="/manage-orders"
                className={({ isActive }) =>
                    isActive
                        ? "admin-nav-link active"
                        : "admin-nav-link"
                }
            >
                <FaClipboardList />

                <span>

                    Orders

                </span>

            </NavLink>

            <NavLink
                to="/manage-reviews"
                className={({ isActive }) =>
                    isActive
                        ? "admin-nav-link active"
                        : "admin-nav-link"
                }
            >
                <FaStar />

                <span>

                    Reviews

                </span>

            </NavLink>

        </nav>

    );

};

export default AdminNavbar;