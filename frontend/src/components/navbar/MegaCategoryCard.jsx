import React from "react";
import { NavLink } from "react-router-dom";

const MegaCategoryCard = ({ category }) => {

    return (

        <NavLink
            to={`/category/${category.name}`}
            className="mega-category-card"
        >

            <img
                src={category.imageUrl}
                alt={category.name}
            />

            <div className="mega-category-content">

                <h4>{category.name}</h4>

                <p>{category.description}</p>

            </div>

        </NavLink>

    );

};

export default MegaCategoryCard;