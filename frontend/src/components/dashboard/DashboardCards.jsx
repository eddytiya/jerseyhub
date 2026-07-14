import React, { memo } from "react";

import {

    FaUsers,

    FaShoppingCart,

    FaMoneyBillWave,

    FaStar

} from "react-icons/fa";

import { MdCategory } from "react-icons/md";

import AnimatedCounter from "./AnimatedCounter";

import "./DashboardCards.css";

const DashboardCards = ({

    dashboard,

    revenueGrowth

}) => {

    const cards = [

        {

            title: "Total Customers",

            value: dashboard.totalCustomers,

            icon: <FaUsers />,

            color: "linear-gradient(135deg,#4facfe,#00c6ff)"

        },

        {

            title: "Total Orders",

            value: dashboard.totalOrders,

            icon: <FaShoppingCart />,

            color: "linear-gradient(135deg,#f7971e,#ffb347)"

        },

        {

            title: "Total Categories",

            value: dashboard.totalCategories,

            icon: <MdCategory />,

            color: "linear-gradient(135deg,#43e97b,#38f9d7)"

        },

        {

            title: "Total Reviews",

            value: dashboard.totalReviews,

            icon: <FaStar />,

            color: "linear-gradient(135deg,#FFD54F,#FF9800)"

        },

        {

            title: "Total Revenue",

            value: dashboard.totalRevenue,

            prefix: "₹",

            icon: <FaMoneyBillWave />,

            color: "linear-gradient(135deg,#667eea,#764ba2)"

        }

    ];

    return (

        <div className="row mb-5">

            {

                cards.map((card, index) => (

                    <div

                       className="col-xl col-lg-4 col-md-6 mb-4"
                        key={index}

                    >

                        <div

                            className="dashboard-card"

                            style={{

                                background: card.color

                            }}

                        >

                            <div className="shine"></div>

                            <div className="dashboard-bg-icon">

                                {card.icon}

                            </div>

                            <div className="dashboard-card-content">

                                <div className="dashboard-card-text">

                                    <div className="dashboard-card-title">

                                        {card.title}

                                    </div>

                                    <div className="dashboard-card-value">

                                        {card.prefix}

                                        <AnimatedCounter

                                            value={card.value}

                                        />

                                    </div>

                                    {

                                        card.title === "Total Revenue" && (

                                            Number(revenueGrowth.growth) >= 0

                                                ?

                                                <span className="dashboard-card-badge success">

                                                    ▲ {revenueGrowth.growth}% This Month

                                                </span>

                                                :

                                                <span className="dashboard-card-badge danger">

                                                    ▼ {Math.abs(revenueGrowth.growth)}% This Month

                                                </span>

                                        )

                                    }

                                </div>

                                <div className="dashboard-icon">

                                    {card.icon}

                                </div>

                            </div>

                        </div>

                    </div>

                ))

            }

        </div>

    );

};

export default memo(DashboardCards);