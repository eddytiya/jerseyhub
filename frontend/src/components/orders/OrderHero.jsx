import React from "react";
import "./OrderHero.css";

const OrderHero = ({ total }) => {

    return (

        <section className="orders-hero">

            <div className="orders-hero-content">

                <span className="orders-badge">

                    JERSEYHUB ORDERS

                </span>

                <h1>

                    My Orders

                </h1>

                <p>

                    Track your purchases, delivery progress and view complete order history.

                </p>

                <div className="orders-stats">

                    <div className="stat-card">

                        <h2>{total}</h2>

                        <span>Total Orders</span>

                    </div>

                    <div className="stat-card">

                        <h2>24/7</h2>

                        <span>Tracking</span>

                    </div>

                    <div className="stat-card">

                        <h2>100%</h2>

                        <span>Secure</span>

                    </div>

                </div>

            </div>

        </section>

    );

};

export default OrderHero;