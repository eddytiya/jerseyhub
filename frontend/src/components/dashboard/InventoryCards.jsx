import React, { memo } from 'react'
import './InventoryCards.css';

import {
    FaTshirt,
    FaBoxes,
    FaStar,
    FaGlobeEurope
} from 'react-icons/fa';

import AnimatedCounter from './AnimatedCounter';

const InventoryCards = ({

    totalJerseys,

    featuredJerseys,

    categoryStats,

    totalStock,

    inventoryValue

}) => {

    const gradients = [

        "linear-gradient(135deg,#36d1dc,#5b86e5)",

        "linear-gradient(135deg,#f7971e,#ffd200)",

        "linear-gradient(135deg,#11998e,#38ef7d)",

        "linear-gradient(135deg,#fc466b,#3f5efb)",

        "linear-gradient(135deg,#654ea3,#eaafc8)",

        "linear-gradient(135deg,#ff512f,#dd2476)",

        "linear-gradient(135deg,#0ea5e9,#2563eb)",

        "linear-gradient(135deg,#14b8a6,#0f766e)"

    ];

    const inventoryCards = [

        {

            title: "Total Jerseys",

            value: totalJerseys,

            icon: <FaTshirt />,

            color: gradients[0]

        },

        {

            title: "Featured Jerseys",

            value: featuredJerseys,

            icon: <FaStar />,

            color: gradients[1]

        },

        ...Object.entries(categoryStats).map(

            ([category, total], index) => ({

                title: category,

                value: total,

                icon:

                    category.toLowerCase().includes("international")

                        ?

                        <FaGlobeEurope />

                        :

                        category.toLowerCase().includes("retro")

                            ?

                            <FaBoxes />

                            :

                            <FaTshirt />,

                color: gradients[(index + 2) % gradients.length]

            })

        )

    ];

    return (

        <>

            {/* Inventory Cards */}

            <div className="row mb-4">

                {

                    inventoryCards.map((card, index) => (

                        <div

                            className="col-lg-4 col-md-6 mb-4"

                            key={index}

                        >

                            <div

                                className="inventory-card"

                                style={{

                                    background: card.color

                                }}

                            >

                                <div className="inventory-shine"></div>

                                <div className="inventory-bg-icon">

                                    {card.icon}

                                </div>

                                <div className="inventory-card-content">

                                    <div className="inventory-text">

                                        <h5 className="inventory-title">

                                            {card.title}

                                        </h5>

                                        <h2 className="inventory-value">

                                            <AnimatedCounter

                                                value={card.value}

                                            />

                                        </h2>

                                    </div>

                                    <div className="inventory-icon">

                                        {card.icon}

                                    </div>

                                </div>

                            </div>

                        </div>

                    ))

                }

            </div>

            {/* Stock & Inventory Value */}

            <div className="row">

                <div className="col-lg-6 mb-4">

                    <div

                        className="inventory-card"

                        style={{

                            background:

                                "linear-gradient(135deg,#06b6d4,#2563eb)"

                        }}

                    >

                        <div className="inventory-shine"></div>

                        <div className="inventory-bg-icon">

                            <FaBoxes />

                        </div>

                        <div className="inventory-icon mb-4">

                            <FaBoxes />

                        </div>

                        <h5 className="inventory-title">

                            Total Stock

                        </h5>

                        <h2 className="inventory-value">

                            <AnimatedCounter

                                value={totalStock}

                            />

                        </h2>

                        <p className="inventory-subtitle">

                            Units Available

                        </p>

                    </div>

                </div>

                <div className="col-lg-6 mb-4">

                    <div

                        className="inventory-card"

                        style={{

                            background:

                                "linear-gradient(135deg,#0f766e,#14b8a6)"

                        }}

                    >

                        <div className="inventory-shine"></div>

                        <div className="inventory-bg-icon">

                            ₹

                        </div>

                        <div className="inventory-icon mb-4">

                            ₹

                        </div>

                        <h5 className="inventory-title">

                            Inventory Value

                        </h5>

                        <h2 className="inventory-value">

                            ₹

                            <AnimatedCounter

                                value={inventoryValue}

                            />

                        </h2>

                        <p className="inventory-subtitle">

                            Current Store Value

                        </p>

                    </div>

                </div>

            </div>

        </>

    );

};

export default memo(InventoryCards)