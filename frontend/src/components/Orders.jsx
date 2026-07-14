import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import API_URL from "../utils/api";
import "./Orders.css";
const Orders = () => {

    const [orders, setOrders] = useState([]);

    const userId = localStorage.getItem("userId");

    useEffect(() => {

        if (userId) {

            fetchOrders();

        }

    }, []);

    const fetchOrders = () => {

        axios.get(

            `${API_URL}/order/${userId}`

        )

        .then((resp) => {

            setOrders(resp.data);

        })

        .catch((err) => {

            console.log(err);

        });

    };

    const getProgressClass = (status) => {

        switch(status){

            case "Pending":

                return "pending";

            case "Processing":

                return "processing";

            case "Shipped":

                return "shipped";

            case "Delivered":

                return "delivered";

            case "Cancelled":

                return "cancelled";

            default:

                return "pending";

        }

    };

    return (

    <div className="orders-page">

        <div className="orders-header">

            <h1>

                My Orders

            </h1>

            <p>

                Track all your football jersey purchases.

            </p>

        </div>

        {

            orders.length === 0 ?

            (

                <div className="empty-orders">

                    <h2>

                        No Orders Yet

                    </h2>

                    <p>

                        Looks like you haven't placed any orders yet.

                    </p>

                    <NavLink

                        to="/jerseys"

                        className="shop-btn"

                    >

                        Start Shopping

                    </NavLink>

                </div>

            )

            :

            (

                <div className="orders-grid">

                    {

                        orders.map((order) => (

                            <div

                                className="order-card"

                                key={order._id}

                            >

                                {/* ================= TOP ================= */}

                                <div className="order-top">

                                    <div>

                                        <h3>

                                            Order #

                                            {

                                                order._id.slice(-6).toUpperCase()

                                            }

                                        </h3>

                                        <p>

                                            Ordered on

                                            {

                                                " "

                                            }

                                            {

                                                new Date(

                                                    order.orderDate

                                                ).toLocaleDateString(

                                                    "en-IN",

                                                    {

                                                        day: "numeric",

                                                        month: "long",

                                                        year: "numeric"

                                                    }

                                                )

                                            }

                                        </p>

                                    </div>

                                    <span

                                        className={`status-badge ${getProgressClass(order.status)}`}

                                    >

                                        {

                                            order.status

                                        }

                                    </span>

                                </div>

                                {/* ================= PRODUCTS ================= */}

                                {

                                    order.items.map((item) => (

                                        <div

                                            className="order-product"

                                            key={item._id}

                                        >

                                            <img

                                                src={item.imageUrl}

                                                alt={item.jerseyName}

                                            />

                                            <div>

                                                <h4>

                                                    {

                                                        item.teamName

                                                    }

                                                </h4>

                                                <p>

                                                    {

                                                        item.jerseyName

                                                    }

                                                </p>

                                                <small>

                                                    Qty :

                                                    {

                                                        item.quantity

                                                    }

                                                </small>

                                            </div>

                                            <h4>

                                                ₹

                                                {

                                                    item.subtotal

                                                }

                                            </h4>

                                        </div>

                                    ))

                                }

                                {/* ================= TIMELINE ================= */}

                                <div className="progress-wrapper">

                                    <div className="progress">

                                        <div

                                            className={`progress-fill ${getProgressClass(order.status)}`}

                                        >

                                        </div>

                                    </div>

                                    <div className="progress-labels">

                                        <span>

                                            Pending

                                        </span>

                                        <span>

                                            Processing

                                        </span>

                                        <span>

                                            Shipped

                                        </span>

                                        <span>

                                            Delivered

                                        </span>

                                    </div>

                                </div>

                                {/* ================= SHIPMENT ================= */}

                                {

                                    (

                                        order.trackingNumber ||

                                        order.estimatedDelivery ||

                                        order.deliveredAt

                                    )

                                    &&

                                    (

                                        <div className="shipment-box">

                                            {

                                                order.trackingNumber &&

                                                <div>

                                                    <strong>

                                                        Tracking Number

                                                    </strong>

                                                    <p>

                                                        {

                                                            order.trackingNumber

                                                        }

                                                    </p>

                                                </div>

                                            }

                                            {

                                                order.estimatedDelivery &&

                                                <div>

                                                    <strong>

                                                        Estimated Delivery

                                                    </strong>

                                                    <p>

                                                        {

                                                            new Date(

                                                                order.estimatedDelivery

                                                            ).toLocaleDateString(

                                                                "en-IN"

                                                            )

                                                        }

                                                    </p>

                                                </div>

                                            }

                                            {

                                                order.deliveredAt &&

                                                <div>

                                                    <strong>

                                                        Delivered On

                                                    </strong>

                                                    <p>

                                                        {

                                                            new Date(

                                                                order.deliveredAt

                                                            ).toLocaleDateString(

                                                                "en-IN"

                                                            )

                                                        }

                                                    </p>

                                                </div>

                                            }

                                        </div>

                                    )

                                }

                                {/* ================= FOOTER ================= */}

                                <div className="order-footer">

                                    <div>

                                        <small>

                                            Grand Total

                                        </small>

                                        <h3>

                                            ₹

                                            {

                                                order.totalAmount

                                            }

                                        </h3>

                                    </div>

                                    <div className="order-actions">

                                        <NavLink

                                            to={`/orders/${order._id}`}

                                            className="details-btn"

                                        >

                                            View Details

                                        </NavLink>

                                        <button

    className="invoice-btn"

    onClick={() => {

        window.open(

            `${API_URL}/order/invoice/${order._id}`,

            "_blank"

        );

    }}

>

    Download Invoice

</button>

                                    </div>

                                </div>

                            </div>

                        ))

                    }

                </div>

            )

        }

    </div>

);

}

export default Orders