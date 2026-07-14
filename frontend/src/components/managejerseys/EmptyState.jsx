import React from "react";
import { NavLink } from "react-router-dom";
import "./EmptyState.css";

const EmptyState = () => {

    return (

        <section className="adminjersey-empty">

            <div className="adminjersey-empty-card">

                <div className="adminjersey-empty-icon">

                    ⚽

                </div>

                <h2 className="adminjersey-empty-title">

                    No Jerseys Found

                </h2>

                <p className="adminjersey-empty-description">

                    We couldn't find any jerseys matching your current
                    search or filters.

                </p>

                <NavLink

                    to="/add-jersey"

                    className="adminjersey-empty-btn"

                >

                    ➕ Add New Jersey

                </NavLink>

            </div>

        </section>

    );

};

export default EmptyState;