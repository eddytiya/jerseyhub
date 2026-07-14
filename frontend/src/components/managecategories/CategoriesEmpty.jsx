import React from "react";
import { NavLink } from "react-router-dom";
import "./CategoriesEmpty.css";

const CategoriesEmpty = () => {

    return (

        <section className="categories-admin-empty">

            <div className="categories-admin-empty-icon">

                📂

            </div>

            <h2>

                No Categories Found

            </h2>

            <p>

                You haven't created any categories yet.
                Start by adding your first football collection.

            </p>

            <NavLink

                to="/add-category"

                className="categories-admin-empty-btn"

            >

                + Add First Category

            </NavLink>

        </section>

    );

};

export default CategoriesEmpty;