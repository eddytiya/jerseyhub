import React from "react";

import "./OrdersHeader.css";

const OrdersHeader = () => {

    return (

        <section className="admin-orders-header">

            <div className="admin-orders-header-content">

                <span className="admin-orders-badge">

                    ORDER MANAGEMENT

                </span>

                <h1 className="admin-orders-title">

                    Manage Orders

                </h1>

                <p className="admin-orders-subtitle">

                    Track, update and manage every customer order from one dashboard.

                </p>

            </div>

        </section>

    );

};

export default OrdersHeader;