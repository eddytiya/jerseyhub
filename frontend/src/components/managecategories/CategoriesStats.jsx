import React from "react";
import AnimatedCounter from "../dashboard/AnimatedCounter";
import "./CategoriesStats.css";

const CategoriesStats = ({
    totalCategories,
    totalJerseys,
    featuredJerseys,
    lowStock
}) => {

    const stats = [
        {
            title: "Total Categories",
            value: totalCategories,
            icon: "📁",
            className: "categories-admin-stat-blue"
        },
        {
            title: "Total Jerseys",
            value: totalJerseys,
            icon: "👕",
            className: "categories-admin-stat-purple"
        },
        {
            title: "Featured Jerseys",
            value: featuredJerseys,
            icon: "⭐",
            className: "categories-admin-stat-green"
        },
        {
            title: "Low Stock",
            value: lowStock,
            icon: "⚠️",
            className: "categories-admin-stat-orange"
        }
    ];

    return (

        <section className="categories-admin-stats">

            {

                stats.map((item, index) => (

                    <div
                        key={index}
                        className={`categories-admin-stat-card ${item.className}`}
                    >

                        <div className="categories-admin-stat-top">

                            <div className="categories-admin-stat-icon">

                                {item.icon}

                            </div>

                        </div>

                        <h4>

                            {item.title}

                        </h4>

                        <h2>

                            <AnimatedCounter value={item.value} />

                        </h2>

                    </div>

                ))

            }

        </section>

    );

};

export default CategoriesStats;