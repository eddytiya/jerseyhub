import React from "react";
import { NavLink } from "react-router-dom";
import "./CategoriesHeader.css";

const CategoriesHeader = () => {
    return (
        <div className="categories-admin-header">

            <div className="categories-admin-header-left">

                <span className="categories-admin-badge">
                    ADMIN PANEL
                </span>

                <h1>
                    Manage Categories
                </h1>

                <p>
                    Organize your football collections, manage category visibility,
                    and keep your store structured.
                </p>

            </div>

            <div className="categories-admin-header-right">

                <NavLink
                    to="/add-category"
                    className="categories-admin-add-btn"
                >
                    + Add Category
                </NavLink>

            </div>

        </div>
    );
};

export default CategoriesHeader;