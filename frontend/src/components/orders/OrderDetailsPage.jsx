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

import { showSuccess, showError } from "../../utils/toastUtils";

import "./OrderDetailsPage.css";

const OrderDetailsPage = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [order, setOrder] = useState(null);

    const [showReturnForm, setShowReturnForm] = useState(false);

    const [returnReason, setReturnReason] = useState("");

    const [returnLoading, setReturnLoading] = useState(false);

    const [cancelLoading, setCancelLoading] = useState(false);

    const fetchOrder = () => {

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

    };

    useEffect(() => {

        fetchOrder();

    }, [id]);

    const handleRequestReturn = () => {

        if (!returnReason.trim()) {

            showError("Please Tell Us Why You're Returning This Order.");

            return;

        }

        setReturnLoading(true);

        axios.post(

            `${API_URL}/order/${order._id}/return-request`,

            { reason: returnReason },

            { withCredentials: true }

        )

        .then(() => {

            showSuccess("Return Request Submitted");

            setShowReturnForm(false);

            fetchOrder();

        })

        .catch((err) => {

            showError(err.response?.data?.message || "Failed To Submit Return Request");

        })

        .finally(() => {

            setReturnLoading(false);

        });

    };

    const handleCancelOrder = () => {

        if (!window.confirm("Cancel This Order?")) return;

        setCancelLoading(true);

        axios.put(

            `${API_URL}/order/${order._id}/cancel`,

            {},

            { withCredentials: true }

        )

        .then(() => {

            showSuccess("Order Cancelled");

            fetchOrder();

        })

        .catch((err) => {

            showError(err.response?.data?.message || "Failed To Cancel Order");

        })

        .finally(() => {

            setCancelLoading(false);

        });

    };

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

    {
        order.status === "Delivered" && order.returnStatus === "None" && (
            <button
                className="invoice-btn"
                onClick={() => setShowReturnForm(!showReturnForm)}
            >
                <FaRedo />
                Request Return
            </button>
        )
    }

    {
        order.status === "Pending" && (
            <button
                className="cancel-order-btn"
                disabled={cancelLoading}
                onClick={handleCancelOrder}
            >
                {cancelLoading ? "Cancelling..." : "Cancel Order"}
            </button>
        )
    }

</div>

    {
        order.returnStatus !== "None" && (
            <div className="return-status-box">
                Return Status : <strong>{order.returnStatus}</strong>
                {order.returnReason && (
                    <p className="return-reason">Reason : {order.returnReason}</p>
                )}
            </div>
        )
    }

    {
        showReturnForm && (
            <div className="return-form">
                <textarea
                    placeholder="Why are you returning this order?"
                    value={returnReason}
                    onChange={(e) => setReturnReason(e.target.value)}
                />
                <button
                    className="invoice-btn"
                    disabled={returnLoading}
                    onClick={handleRequestReturn}
                >
                    {returnLoading ? "Submitting..." : "Submit Return Request"}
                </button>
            </div>
        )
    }

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

            <p>
                {
                    order.deliveredAt
                        ? new Date(order.deliveredAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })
                        : "Completed"
                }
            </p>

        </div>

    </div>

    {
        order.status === "Cancelled" && (
            <div className="cancelled-banner">
                This order has been cancelled.
            </div>
        )
    }

    {
        order.trackingNumber && (
            <p className="tracking-number">
                Tracking Number : <strong>{order.trackingNumber}</strong>
            </p>
        )
    }

    {
        order.estimatedDelivery && order.status !== "Delivered" && order.status !== "Cancelled" && (
            <p className="tracking-number">
                Estimated Delivery :{" "}
                <strong>
                    {
                        new Date(order.estimatedDelivery).toLocaleDateString("en-IN", { day: "numeric", month: "long" })
                    }
                </strong>
            </p>
        )
    }

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

            <span className={`info-value ${order.paymentStatus === "Paid" ? "paid" : "pending"}`}>

                {order.paymentStatus}

            </span>

        </div>

        <div className="info-row">

            <span className="info-label">

                Payment Method

            </span>

            <span className="info-value cod">

                {order.paymentMethod}

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

            <strong>{order.deliveryInfo?.fullName}</strong>

            <br /><br />

            {order.deliveryInfo?.address1}
            {order.deliveryInfo?.address2 ? `, ${order.deliveryInfo.address2}` : ""}
            <br />
            {order.deliveryInfo?.city}, {order.deliveryInfo?.state} - {order.deliveryInfo?.pincode}
            <br /><br />
            📞 {order.deliveryInfo?.phone}

        </div>

    </div>

</div>

</div>
        </section>

    );

};

export default OrderDetailsPage;