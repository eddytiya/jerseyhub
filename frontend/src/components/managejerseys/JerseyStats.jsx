import React from "react";
import "./JerseyStats.css";

const stats = [

    {
        title: "Total Jerseys",
        valueKey: "total",
        icon: "👕",
        className: "adminjersey-stat-blue",
        trend: "+12%"
    },

    {
        title: "Featured Jerseys",
        valueKey: "featured",
        icon: "⭐",
        className: "adminjersey-stat-gold",
        trend: "+5%"
    },

    {
        title: "Low Stock",
        valueKey: "lowStock",
        icon: "📦",
        className: "adminjersey-stat-orange",
        trend: "Alert"
    },

    {
        title: "Out Of Stock",
        valueKey: "outOfStock",
        icon: "❌",
        className: "adminjersey-stat-red",
        trend: "Check"
    }

];

const JerseyStats = ({

    totalJerseys = 0,

    featuredCount = 0,

    lowStockCount = 0,

    outOfStockCount = 0,

}) => {

    const values = {

        total: totalJerseys,

        featured: featuredCount,

        lowStock: lowStockCount,

        outOfStock: outOfStockCount,

    };

    return (

        <section className="adminjersey-stats">

            <div className="row g-4">

                {

                    stats.map((item) => (

                        <div

                            key={item.title}

                            className="col-lg-3 col-md-6"

                        >

                            <div

                                className={`adminjersey-stat-card ${item.className}`}

                            >

                                <div className="adminjersey-stat-header">

                                    <div>

                                        <span className="adminjersey-stat-label">

                                            {item.title}

                                        </span>

                                        <h2 className="adminjersey-stat-number">

                                            {values[item.valueKey]}

                                        </h2>

                                    </div>

                                    <div className="adminjersey-stat-icon">

                                        {item.icon}

                                    </div>

                                </div>

                                <div className="adminjersey-stat-footer">

                                    <span className="adminjersey-stat-trend">

                                        {item.trend}

                                    </span>

                                    <small>

                                        Updated Live

                                    </small>

                                </div>

                            </div>

                        </div>

                    ))

                }

            </div>

        </section>

    );

};

export default JerseyStats;