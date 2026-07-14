import React from "react";
import { NavLink } from "react-router-dom";
import "./ManageHeader.css";

const ManageHeader = () => {

    const today = new Date().toLocaleDateString("en-IN", {

        weekday: "long",

        day: "numeric",

        month: "long",

        year: "numeric"

    });

    return (

        <section className="adminjersey-header">

            <div className="adminjersey-header-card">

                {/* ===========================
                        LEFT
                ============================ */}

                <div className="adminjersey-header-left">

                    <span className="adminjersey-badge">

                        ⚽ Football Inventory Dashboard

                    </span>

                    <h1 className="adminjersey-title">

                        Manage Jerseys

                    </h1>

                    <p className="adminjersey-description">

                        Organize your football jersey collection, manage inventory,
                        update featured products and monitor stock levels from one place.

                    </p>

                    <div className="adminjersey-header-info">

                        <div className="adminjersey-info-chip">

                            📅

                            <span>

                                {today}

                            </span>

                        </div>

                        <div className="adminjersey-info-chip">

                            🚀

                            <span>

                                Admin Dashboard

                            </span>

                        </div>

                    </div>

                </div>

                {/* ===========================
                        RIGHT
                ============================ */}

                <div className="adminjersey-header-right">

                    <NavLink

                        to="/add-jersey"

                        className="adminjersey-add-btn"

                    >

                        ➕ Add New Jersey

                    </NavLink>

                </div>

            </div>

        </section>

    );

};

export default ManageHeader;