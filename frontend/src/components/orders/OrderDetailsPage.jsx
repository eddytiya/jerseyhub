import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import API_URL from "../../utils/api";
import {
    FaArrowLeft,
    FaCheckCircle,
    FaTruck,
    FaBox,
    FaCreditCard,
    FaMapMarkerAlt,
    FaDownload,
    FaRedo,
    FaShoppingBag,
    FaStar
} from "react-icons/fa";

import "./OrderDetailsPage.css";

const OrderDetailsPage = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [order, setOrder] = useState(null);

    useEffect(() => {

        const userId = localStorage.getItem("userId");

       axios
    .get(`${API_URL}/order/${userId}`)
    .then((resp) => {

        const selectedOrder = resp.data.find(
            order => String(order._id) === String(id)
        );

        setOrder(selectedOrder);

    })
    .catch(console.log);

    }, [id]);

    const handleDownloadInvoice = () => {

    const link = document.createElement("a");

    link.href = `${API_URL}/order/invoice/${order._id}`;

    link.download = "";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);


};

    if (!order) {

        return (

            <div className="order-loading">

                Loading Order...

            </div>

        );

    }

    return (

        <section className="order-details-page">

 {/* ================= HERO ================= */}

<div className="order-details-hero">

    <div className="hero-circle hero-circle-one"></div>

    <div className="hero-circle hero-circle-two"></div>

    <button

        className="back-btn"

        onClick={() => navigate("/orders")}

    >

        <FaArrowLeft />

        Back To Orders

    </button>

    <div className="hero-content">

        {/* LEFT */}

        <div className="hero-left">

            <span className="hero-label">

                ORDER DETAILS

            </span>

            <h1>

                Order #

                {order._id.slice(-6)}

            </h1>

            <p>

                {order.items.length}

                {" "}

                Product

                {order.items.length > 1 ? "s" : ""}

                {" Purchased"}

            </p>

            <div className="hero-date">

                Order #

                {order._id}

            </div>

        </div>

        {/* RIGHT */}

        <div className="hero-right">

            <h2>

                ₹ {order.totalAmount}

            </h2>

            <span

                className={`status ${order.status.toLowerCase()}`}

            >

                {order.status}

            </span>

        </div>

    </div>

</div>

            {/* TOP GRID */}

           {/* ================= PURCHASED PRODUCTS ================= */}

<div className="purchased-section">

    <div className="products-column">

        <h2 className="section-title">

            Purchased Products

        </h2>

        {
    order.items.map((product) => (

        <div
            className="product-card"
            key={product._id}
        >

            {/* LEFT IMAGE */}

            <div className="product-card-image">

                <img
                    src={
                        product.imageUrl ||
                        product.jerseyId?.imageUrl
                    }
                    alt={
                        product.jerseyName ||
                        product.jerseyId?.jerseyName
                    }
                />

            </div>

            {/* CENTER DETAILS */}

            <div className="product-card-info">

                <span className="product-category">

                    {product.category ||
                        product.jerseyId?.category}

                </span>

                <h3>

                    {product.teamName ||
                        product.jerseyId?.teamName}

                </h3>

                <p>

                    {product.jerseyName ||
                        product.jerseyId?.jerseyName}

                </p>

            </div>

            {/* RIGHT SIDE */}

            <div className="product-card-price">

                <span>

                    Qty : {product.quantity}

                </span>

                <h2>

                    ₹ {
                        product.price ||
                        product.jerseyId?.price
                    }

                </h2>

            </div>

        </div>

    ))
}

    </div>

    {/* ORDER SUMMARY */}

    <div className="cart-summary">

        <small>

            ORDER SUMMARY

        </small>

        <h2>

            Purchase Details

        </h2>

        <div className="summary-divider"></div>

        <div className="summary-row">

            <span>

                Products

            </span>

            <strong>

                {order.items.length}

            </strong>

        </div>

        <div className="summary-row">

            <span>

                Shipping

            </span>

            <strong

                style={{color:"#22c55e"}}

            >

                FREE

            </strong>

        </div>

        <div className="summary-row">

            <span>

                Tax

            </span>

            <strong>

                Included

            </strong>

        </div>

        <div className="summary-row">

            <span>

                Status

            </span>

            <strong>

                {order.status}

            </strong>

        </div>

        <div className="summary-divider"></div>

        <div className="summary-total">

            <h2>

                Total

            </h2>

            <span>

                ₹ {order.totalAmount}

            </span>

        </div>

        <div className="order-actions">

    <button
        className="checkout-btn"
        onClick={() => navigate("/products")}
    >
        <FaShoppingBag />
        Buy Again
    </button>

    <button
        className="invoice-btn"
        onClick={handleDownloadInvoice}
    >
        <FaDownload />
        Download Invoice
    </button>

</div>

    </div>

</div>
            {/* TIMELINE */}

            <div className="timeline-card">

    <h2 className="timeline-title">

        <FaTruck />

        Delivery Timeline

    </h2>

    <div className="timeline">

        <div className="timeline-step active">

            <div className="timeline-icon">

                <FaCheckCircle />

            </div>

            <h4>Order Placed</h4>

            <p>Order Confirmed</p>

        </div>

        <div className="timeline-step active">

            <div className="timeline-icon">

                <FaBox />

            </div>

            <h4>Packed</h4>

            <p>Ready to Ship</p>

        </div>

        <div
            className={`timeline-step ${
                order.status === "Shipped" ||
                order.status === "Delivered"
                    ? "active"
                    : ""
            }`}
        >

            <div className="timeline-icon">

                <FaTruck />

            </div>

            <h4>Shipped</h4>

            <p>On the way</p>

        </div>

        <div
            className={`timeline-step ${
                order.status === "Delivered"
                    ? "active"
                    : ""
            }`}
        >

            <div className="timeline-icon">

                <FaCheckCircle />

            </div>

            <h4>Delivered</h4>

            <p>Completed</p>

        </div>

    </div>

</div>

            {/* BOTTOM GRID */}

           <div className="info-grid">

    <div className="details-info-grid">

    {/* PAYMENT */}

    <div className="info-card">

        <h2 className="info-title">

            <FaCreditCard />

            Payment

        </h2>

        <div className="info-row">

            <span className="info-label">

                Payment Status

            </span>

            <span className="info-value paid">

                Paid

            </span>

        </div>

        <div className="info-row">

            <span className="info-label">

                Payment Method

            </span>

            <span className="info-value cod">

                Cash On Delivery

            </span>

        </div>

    </div>

    {/* SHIPPING */}

    <div className="info-card">

        <h2 className="info-title">

            <FaMapMarkerAlt />

            Shipping

        </h2>

        <div className="address-box">

            <strong>Customer Address</strong>

            <br /><br />

            Address integration will appear here once
            the checkout address system is added.

        </div>

    </div>

</div>

</div>
        </section>

    );

};

export default OrderDetailsPage;