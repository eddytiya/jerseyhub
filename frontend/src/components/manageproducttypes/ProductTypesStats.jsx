import React from "react";

import {

    FaLayerGroup,

    FaCheckCircle,

    FaEyeSlash,

    FaBoxes

} from "react-icons/fa";

import "./ProductTypesStats.css";

const ProductTypesStats = ({

    totalTypes,

    activeTypes,

    inactiveTypes,

    totalProducts

}) => {

    const stats = [

        {

            title: "Total Types",

            value: totalTypes,

            icon: <FaLayerGroup />,

            className: "types-total"

        },

        {

            title: "Active Types",

            value: activeTypes,

            icon: <FaCheckCircle />,

            className: "types-active"

        },

        {

            title: "Inactive Types",

            value: inactiveTypes,

            icon: <FaEyeSlash />,

            className: "types-inactive"

        },

        {

            title: "Products Using Types",

            value: totalProducts,

            icon: <FaBoxes />,

            className: "types-products"

        }

    ];

    return (

        <div className="product-types-stats">

            {

                stats.map((stat,index)=>(

                    <div

                        key={index}

                        className={`product-type-stat-card ${stat.className}`}

                    >

                        <div className="stat-icon">

                            {stat.icon}

                        </div>

                        <div>

                            <span>

                                {stat.title}

                            </span>

                            <h2>

                                {stat.value}

                            </h2>

                        </div>

                    </div>

                ))

            }

        </div>

    );

};

export default ProductTypesStats;