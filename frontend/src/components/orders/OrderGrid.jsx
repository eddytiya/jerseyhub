import React from "react";

import OrderCard from "./OrderCard";

import "./OrderGrid.css";

const OrderGrid = ({

    orders,

    onViewDetails

}) => {

    if (orders.length === 0) {

        return (

            <div className="orders-empty">

                <h2>

                    No Orders Found 📦

                </h2>

                <p>

                    You haven't placed any orders yet.

                </p>

            </div>

        );

    }

    return (

        <section className="orders-grid">

            {

                orders.map((order) => (

                    <OrderCard

                        key={order._id}

                        order={order}

                        onViewDetails={onViewDetails}

                    />

                ))

            }

        </section>

    );

};

export default OrderGrid;