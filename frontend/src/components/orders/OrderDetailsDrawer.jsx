import React from "react";

import {
    FaTimes,
    FaCheckCircle,
    FaTruck,
    FaCreditCard,
    FaMapMarkerAlt,
    FaShoppingBag,
    FaRedoAlt,
    FaDownload
} from "react-icons/fa";

import "./OrderDetailsDrawer.css";

const OrderDetailsDrawer = ({ order, onClose }) => {

    if (!order) return null;

    const item = order.items?.[0];

    return (

        <>

            <div

                className="drawer-backdrop"

                onClick={onClose}

            />

            <aside className="order-drawer">

                {/* HEADER */}

                <div className="drawer-header">

                    <div>

                        <h2>

                            Order Details

                        </h2>

                        <small>

                            Order #

                            {order._id.slice(-8)}

                        </small>

                    </div>

                    <button

                        onClick={onClose}

                    >

                        <FaTimes />

                    </button>

                </div>

                {/* PRODUCT */}

                <div className="drawer-product">

                    <img

                        src={item?.jerseyId?.imageUrl}

                        alt={item?.jerseyId?.jerseyName}

                    />

                    <div>

                        <h3>

                            {item?.jerseyId?.teamName}

                        </h3>

                        <p>

                            {item?.jerseyId?.jerseyName}

                        </p>

                        <span>

                            Qty :

                            {item?.quantity}

                        </span>

                    </div>

                </div>

                {/* STATUS */}

                <div className="drawer-section">

                    <h4>

                        <FaTruck />

                        Delivery Status

                    </h4>

                    <div className="drawer-status">

                        <span

                            className={`status ${order.status.toLowerCase()}`}

                        >

                            {order.status}

                        </span>

                    </div>

                </div>

                {/* TIMELINE */}

                <div className="drawer-section">

                    <h4>

                        <FaCheckCircle />

                        Order Timeline

                    </h4>

                    <ul className="timeline">

                        <li className="active">

                            Ordered

                        </li>

                        <li className="active">

                            Processing

                        </li>

                        <li

                            className={

                                order.status === "Shipped" ||

                                order.status === "Delivered"

                                    ? "active"

                                    : ""

                            }

                        >

                            Shipped

                        </li>

                        <li

                            className={

                                order.status === "Delivered"

                                    ? "active"

                                    : ""

                            }

                        >

                            Delivered

                        </li>

                    </ul>

                </div>

                {/* PAYMENT */}

                <div className="drawer-section">

                    <h4>

                        <FaCreditCard />

                        Payment

                    </h4>

                    <p>

                        Total Amount

                    </p>

                    <h2>

                        ₹ {order.totalAmount}

                    </h2>

                </div>

                {/* ADDRESS */}

                <div className="drawer-section">

                    <h4>

                        <FaMapMarkerAlt />

                        Shipping

                    </h4>

                    <p>

                        Shipping information will appear here.

                    </p>

                </div>

                {/* ACTIONS */}

                <div className="drawer-actions">

                    <button>

                        <FaShoppingBag />

                        View Product

                    </button>

                    <button>

                        <FaRedoAlt />

                        Buy Again

                    </button>

                    <button>

                        <FaDownload />

                        Invoice

                    </button>

                </div>

            </aside>

        </>

    );

};

export default OrderDetailsDrawer;