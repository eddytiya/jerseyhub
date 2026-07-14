import React from "react";
import "./DashboardHeader.css";

const DashboardHeader = () => {

    const hour = new Date().getHours();

    let greeting = "Good Evening 🌙";

    if (hour < 12) {
        greeting = "Good Morning ☀";
    } else if (hour < 18) {
        greeting = "Good Afternoon 🌤";
    }

    const today = new Date().toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (

        <div className="dashboard-header">

            <div>

                <span className="dashboard-greeting">

                    {greeting}

                </span>

                <h1 className="dashboard-heading">

                    Admin Dashboard

                </h1>

                <p className="dashboard-subtitle">

                    Manage jerseys, inventory, customers and analytics from one place.

                </p>

            </div>

            <div className="dashboard-date-card">

                <small>Today</small>

                <h5>{today}</h5>

            </div>

        </div>

    );

};

export default DashboardHeader;