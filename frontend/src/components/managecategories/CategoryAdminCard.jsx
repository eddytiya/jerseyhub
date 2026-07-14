import React from "react";
import { NavLink } from "react-router-dom";
import {
    FaEdit,
    FaTrashAlt
} from "../../utils/navbarIcons";

import "./CategoryAdminCard.css";

const CategoryAdminCard = ({
    category,
    jerseyCount,
    onDelete,
    onToggleFeatured
}) => {

    return (

        <div className="categories-admin-card">

            {/* Image */}

            <div className="categories-admin-card-image">

                <img

                    src={category.imageUrl}

                    alt={category.name}

                />

            </div>

            {/* Content */}

            <div className="categories-admin-card-content">

                <div className="categories-admin-card-top">

                    <h3>

                        {category.name}

                    </h3>

                    <span

                        className={`categories-admin-status ${
                            category.featured
                                ? "featured"
                                : "hidden"
                        }`}

                    >

                        {

                            category.featured

                                ? "👁 Visible"

                                : "🙈 Hidden"

                        }

                    </span>

                </div>

                <p>

                    {category.description}

                </p>

                <div className="categories-admin-card-footer">

                    <span className="categories-admin-count">

                        👕 {jerseyCount} Jerseys

                    </span>

                </div>

            </div>

            {/* Actions */}

            <div className="categories-admin-actions">

                <button

                    className={`categories-admin-toggle-btn ${
                        category.featured
                            ? "hide-btn"
                            : "show-btn"
                    }`}

                    onClick={()=>

                        onToggleFeatured(category._id)

                    }

                >

                    {

                        category.featured

                            ? "Hide"

                            : "Show"

                    }

                </button>

                <NavLink

                    to={`/edit-category/${category._id}`}

                    className="categories-admin-icon edit"

                >

                    <FaEdit/>

                </NavLink>

                <button

                    className="categories-admin-icon delete"

                    onClick={()=>

                        onDelete(category._id)

                    }

                >

                    <FaTrashAlt/>

                </button>

            </div>

        </div>

    );

};

export default CategoryAdminCard;