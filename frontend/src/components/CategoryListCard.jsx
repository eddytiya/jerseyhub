import React from "react";
import { NavLink } from "react-router-dom";
import { FaArrowRight } from "../utils/navbarIcons";

import "./CategoryListCard.css";

const CategoryListCard = ({ category, productCount }) => {

    return (

        <NavLink
            to={`/category/${category.name}`}
            className="category-list-card"
        >

            <div className="category-list-image">

                <img
                    src={category.imageUrl}
                    alt={category.name}
                />

            </div>

            <div className="category-list-content">

                <h2>{category.name}</h2>

                <p>{category.description}</p>

            </div>

            <div className="category-list-right">

                <div className="product-pill">

                    {productCount} {productCount === 1 ? "Product" : "Products"}

                </div>

                <div className="explore-btn">

                    Explore

                    <FaArrowRight />

                </div>

            </div>

        </NavLink>

    );

};

export default CategoryListCard;