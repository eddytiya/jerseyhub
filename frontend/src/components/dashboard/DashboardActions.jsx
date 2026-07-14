import React, { memo } from "react";
import { NavLink } from "react-router-dom";

import {
    FaPlus,
    FaTshirt,
    FaTags,
    FaClipboardList
} from "react-icons/fa";

import "./DashboardActions.css";

const DashboardActions = () => {

    const actions = [

        {
            title: "Add Jersey",
            subtitle: "Create new products",
            icon: <FaPlus />,
            color: "linear-gradient(135deg,#22c55e,#16a34a)",
            link: "/add-jersey"
        },

        {
            title: "Manage Jerseys",
            subtitle: "Edit inventory",
            icon: <FaTshirt />,
            color: "linear-gradient(135deg,#2563eb,#1d4ed8)",
            link: "/manage-jerseys"
        },

        {
            title: "Categories",
            subtitle: "Organize products",
            icon: <FaTags />,
            color: "linear-gradient(135deg,#f59e0b,#ea580c)",
            link: "/manage-categories"
        },

        {
            title: "Orders",
            subtitle: "Track purchases",
            icon: <FaClipboardList />,
            color: "linear-gradient(135deg,#ef4444,#dc2626)",
            link: "/manage-orders"
        }

    ];

    return (

        <section className="adminpage-actions">

            <div className="adminpage-actions-card">

                <div className="adminpage-actions-header">

                    <div>

                        <h3 className="adminpage-actions-title">

                            ⚡ Quick Actions

                        </h3>

                        <p className="adminpage-actions-subtitle">

                            Frequently used admin shortcuts

                        </p>

                    </div>

                </div>

                <div className="adminpage-actions-body">

                    <div className="row g-4">

                        {

                            actions.map((action,index)=>(

                                <div
                                    className="col-lg-3 col-md-6"
                                    key={index}
                                >

                                    <NavLink

                                        to={action.link}

                                        className="adminpage-action-card"

                                        style={{
                                            background:action.color
                                        }}

                                    >

                                        <div className="adminpage-action-icon">

                                            {action.icon}

                                        </div>

                                        <h5 className="adminpage-action-title">

                                            {action.title}

                                        </h5>

                                        <span className="adminpage-action-subtitle">

                                            {action.subtitle}

                                        </span>

                                        <div className="adminpage-action-arrow">

                                            →

                                        </div>

                                    </NavLink>

                                </div>

                            ))

                        }

                    </div>

                </div>

            </div>

        </section>

    );

};

export default memo(DashboardActions);