import React from "react";
import { NavLink } from "react-router-dom";

import "./MegaMenu.css";
import MegaCategoryCard from "./MegaCategoryCard";

const MegaMenu = ({ categories, jerseys }) => {

    const totalCategories = categories.length;

    const rows = Math.ceil(totalCategories / 4);

    const menuClass =

        rows >= 5

            ?

            "mega-menu scroll-menu"

            :

            "mega-menu";

    return (

        <div className={menuClass}>

            <div className="mega-grid">

                {

                    categories.map((category) => {

                        const productCount = jerseys.filter(

                            (product) =>

                                product.category === category.name

                        ).length;

                        return (

                            <MegaCategoryCard

                                key={category._id}

                                category={category}

                                productCount={productCount}

                            />

                        );

                    })

                }

            </div>

            <div className="mega-footer">

                <NavLink

                    to="/categories"

                    className="shop-all-btn"

                >

                    Browse All Categories →

                </NavLink>

            </div>

        </div>

    );

};

export default MegaMenu;