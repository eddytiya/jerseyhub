import { useLocation, NavLink } from "react-router-dom";

import "./OrderSuccess.css";

import {

    FaCheckCircle,

    FaBoxOpen,

    FaTruck,

    FaHome

} from "../utils/navbarIcons";

const OrderSuccess = () => {

    const { state } = useLocation();

    const order = state?.order;

    if (!order) {

        return (

            <div className="order-success-page">
                <div className="success-bg">

                    <div className="football football-1">⚽</div>

                    <div className="football football-2">⚽</div>

                    <div className="football football-3">⚽</div>

                    <div className="blur-circle blur-one"></div>

                    <div className="blur-circle blur-two"></div>

                </div>

                <h2>

                    Order not found

                </h2>

            </div>

        );

    }

    return (

<div className="order-success-page">

    <div className="success-card">

        <div className="success-top">

            <div className="success-check">

    <svg

        className="success-svg"

        viewBox="0 0 100 100"

    >

        <circle

            className="success-circle"

            cx="50"

            cy="50"

            r="45"

        />

        <path

            className="success-tick"

            d="M30 52 L45 67 L72 38"

        />

    </svg>

</div>

            <h1>

                Order Confirmed

            </h1>

            <p>

                Thank you for shopping with JerseyHub.

                <br />

                Your order has been placed successfully.

            </p>

        </div>

        {/* =========================
                ORDER INFO
        ========================== */}

        <div className="success-summary">

            <div className="summary-box">

                <span>Order ID</span>

                <strong>

                    {order._id}

                </strong>

            </div>

            <div className="summary-box">

                <span>Amount Paid</span>

                <strong>

                    ₹{order.totalAmount}

                </strong>

            </div>

            <div className="summary-box">

                <span>Payment</span>

                <strong>

                    {order.paymentMethod}

                </strong>

            </div>

            <div className="summary-box">

                <span>Status</span>

                <span className={`status-badge ${order.status.toLowerCase()}`}>

                    {order.status}

                </span>

            </div>

        </div>

        {/* =========================
            DELIVERY
        ========================== */}

        <div className="delivery-card">

            <h3>

                🚚 Estimated Delivery

            </h3>

            <p>

                Your jersey will arrive within

                <strong>

                    {" "}5 Business Days

                </strong>

            </p>

        </div>

        {/* =========================
            ORDER TRACKER
        ========================== */}

       {/* =========================
        ORDER JOURNEY
========================= */}

<div className="order-journey">

    <h2>

        Order Journey

    </h2>

    <div className="journey-step completed">

    <div className="journey-line"></div>

    <div className="journey-icon">

        <FaCheckCircle />

    </div>

    <div className="journey-info">

        <h3>

            Order Placed

        </h3>

        <small>

            Just Now

        </small>

        <p>

            Your order has been received successfully.

        </p>

    </div>

</div>

    <div className="journey-arrow">

       <div className="journey-arrow">

    <span>

        ↓

    </span>

</div>

    </div>

    <div className="journey-step active">

        <div className="journey-icon">

            <FaBoxOpen />

        </div>

        <div className="journey-info">

            <h3>

                Preparing Jersey

            </h3>

            <p>

                Your jersey is currently being packed.

            </p>

        </div>

    </div>

    <div className="journey-arrow">

       <div className="journey-arrow">

    <span>

        ↓

    </span>

</div>

    </div>

    <div className="journey-step">

        <div className="journey-icon">

            🚚

        </div>

        <div className="journey-info">

            <h3>

                Shipped

            </h3>

            <p>

                Tracking number will appear here.

            </p>

        </div>

    </div>

    <div className="journey-arrow">

       <div className="journey-arrow">

    <span>

        ↓

    </span>

</div>

    </div>

    <div className="journey-step">

        <div className="journey-icon">

            🏠

        </div>

        <div className="journey-info">

            <h3>

                Delivered

            </h3>

            <p>

                Enjoy your JerseyHub order.

            </p>

        </div>

    </div>

</div>

        {/* =========================
        WHAT HAPPENS NEXT
========================= */}

<div className="next-steps">

    <h2>

        What Happens Next?

    </h2>

    <div className="next-step">

        <div className="next-icon">

            ✓

        </div>

        <div>

            <h4>

                Order Confirmed

            </h4>

            <p>

                We've received your order successfully.

            </p>

        </div>

    </div>

    <div className="next-step">

        <div className="next-icon">

           <FaBoxOpen />

        </div>

        <div>

            <h4>

                Preparing Your Jersey

            </h4>

            <p>

                Our team is carefully packing your order.

            </p>

        </div>

    </div>

    <div className="next-step">

        <div className="next-icon">

            🚚

        </div>

        <div>

            <h4>

                Shipping Soon

            </h4>

            <p>

                You'll receive tracking details once shipped.

            </p>

        </div>

    </div>

</div>

        {/* =========================
            BUTTONS
        ========================== */}

        <div className="success-buttons">

            <a

                href={`http://localhost:2987/order/invoice/${order._id}`}

                target="_blank"

                rel="noreferrer"

                className="invoice-btn"

            >

                🧾 Download Invoice

            </a>

            <NavLink

                to="/orders"

                className="orders-btn"

            >

             <FaBoxOpen />  View Orders

            </NavLink>

            <NavLink

                to="/jerseys"

                className="shop-btn"

            >

                🛍 Continue Shopping

            </NavLink>

        </div>


        <div className="trust-badges">

    <div>

        ✅ 100% Authentic Jerseys

    </div>

    <div>

        🔒 Secure Payments

    </div>

    <div>

        🚚 Fast Delivery

    </div>

    <div>

        ↩ Easy Returns

    </div>

</div>

    </div>

</div>

);

};

export default OrderSuccess;