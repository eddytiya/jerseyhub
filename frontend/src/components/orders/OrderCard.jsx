import React from "react";
import {
    FaChevronRight,
    FaBoxOpen,
    FaCalendarAlt,
    FaReceipt
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import "./OrderCard.css";

const OrderCard = ({ order }) => {

    const navigate = useNavigate();

    if (!order?.items?.length) return null;

    const firstItem = order.items[0];

    const image =
        firstItem.imageUrl ||
        firstItem.jerseyId?.imageUrl;

    const remainingItems =
        order.items.length - 1;

    const totalQty = order.items.reduce(

        (sum, item) =>

            sum + item.quantity,

        0

    );

    return (

        <div className="order-row">

            {/* IMAGE */}

            <div className="order-row-image-stack">

                <div className="order-row-image">

                    <img

                        src={image}

                        alt={
                            firstItem.jerseyName ||
                            firstItem.jerseyId?.jerseyName
                        }

                    />

                </div>

                {

                    remainingItems > 0 && (

                        <div className="more-products">

                            +{remainingItems}

                        </div>

                    )

                }

            </div>

            {/* INFO */}

            <div className="order-row-info">

                <div className="order-top">

                    <h2>

                        Order #

                        {order._id.slice(-6)}

                    </h2>

                    <span className="league-badge">

                        {order.items.length}

                        {" "}

                        Item

                        {order.items.length > 1 ? "s" : ""}

                    </span>

                </div>

                <div className="order-products">

                    {

                        order.items.slice(0, 2).map(

                            (item, index) => (

                                <p

                                    key={index}

                                    className="ordered-product"

                                >

                                    •

                                    {" "}

                                    {

                                        item.teamName ||

                                        item.jerseyId?.teamName

                                    }

                                    {" - "}

                                    {

                                        item.jerseyName ||

                                        item.jerseyId?.jerseyName

                                    }

                                </p>

                            )

                        )

                    }

                    {

                        order.items.length > 2 && (

                            <p className="more-items">

                                +

                                {order.items.length - 2}

                                {" "}

                                more product

                                {

                                    order.items.length - 2 > 1

                                    && "s"

                                }

                            </p>

                        )

                    }

                </div>

                <div className="order-meta">

                    <span>

                        <FaReceipt />

                        ₹ {order.totalAmount}

                    </span>

                    <span>

                        <FaCalendarAlt />

                        {

                            new Date(

                                order.orderDate

                            ).toLocaleDateString()

                        }

                    </span>

                    <span>

                        <FaBoxOpen />

                        {" "}

                        {totalQty}

                        {" Qty"}

                    </span>

                </div>

            </div>

            {/* STATUS */}

            <div className="status-column">

                <span

                    className={`status ${order.status.toLowerCase()}`}

                >

                    {order.status}

                </span>

                <div className="mini-progress">

                    <span className="active"></span>

                    <span

                        className={

                            order.status !== "Pending"

                                ? "active"

                                : ""

                        }

                    ></span>

                    <span

                        className={

                            order.status === "Shipped" ||

                            order.status === "Delivered"

                                ? "active"

                                : ""

                        }

                    ></span>

                    <span

                        className={

                            order.status === "Delivered"

                                ? "active"

                                : ""

                        }

                    ></span>

                </div>

            </div>

            {/* PRICE */}

            <div className="order-price-box">

                <small>

                    Total Amount

                </small>

                <h2>

                    ₹ {order.totalAmount}

                </h2>

            </div>

            {/* BUTTON */}

            <button

                className="details-btn"

                onClick={() =>

                    navigate(

                        `/orders/${order._id}`

                    )

                }

            >

                View Details

                <FaChevronRight />

            </button>

        </div>

    );

};

export default OrderCard;