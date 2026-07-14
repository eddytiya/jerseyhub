import React from "react";
import { NavLink } from "react-router-dom";

const Breadcrumb = ({ category, jerseyName }) => {

    return (

        <div className="product-breadcrumb">

            <NavLink to="/">

                Home

            </NavLink>

            <span>›</span>

            <NavLink to={`/category/${category}`}>

                {category}

            </NavLink>

            <span>›</span>

            <span className="active">

                {jerseyName}

            </span>

        </div>

    );

};

export default Breadcrumb;