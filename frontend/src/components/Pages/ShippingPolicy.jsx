import React from "react";

import {

    FaShippingFast,
    FaBolt,
    FaGlobeAsia,
    FaMapMarkedAlt,
    FaBoxOpen,
    FaExclamationTriangle

} from "react-icons/fa";

import "./ShippingPolicy.css";

const shippingData = [

    {

        icon:<FaShippingFast />,

        title:"Standard Delivery",

        text:"Orders are usually delivered within 2–5 business days across India."

    },

    {

        icon:<FaBolt />,

        title:"Express Shipping",

        text:"Need it quickly? Express delivery arrives within 1–2 business days where available."

    },

    {

        icon:<FaGlobeAsia />,

        title:"International Shipping",

        text:"Worldwide delivery available in approximately 7–15 business days."

    },

    {

        icon:<FaMapMarkedAlt />,

        title:"Order Tracking",

        text:"Every order includes a tracking ID so you can monitor your shipment."

    },

    {

        icon:<FaBoxOpen />,

        title:"Free Shipping",

        text:"Enjoy FREE shipping on all orders above ₹2999."

    },

    {

        icon:<FaExclamationTriangle />,

        title:"Delivery Exceptions",

        text:"Remote areas, public holidays and weather conditions may affect delivery times."

    }

];

const ShippingPolicy = () => {

    return (

        <div className="shipping-page">

            <div className="container">

                {/* ================= HERO ================= */}

                <div className="shipping-hero">

                    <span>

                        SHIPPING INFORMATION

                    </span>

                    <h1>

                        Shipping Policy

                    </h1>

                    <p>

                        We partner with trusted courier services to ensure
                        every jersey reaches you safely, quickly and securely.

                    </p>

                </div>

                {/* ================= GRID ================= */}

                <div className="shipping-grid">

                    {

                        shippingData.map(

                            (item,index)=>(

                                <div

                                    className="shipping-card"

                                    key={index}

                                >

                                    <div className="shipping-icon">

                                        {item.icon}

                                    </div>

                                    <h3>

                                        {item.title}

                                    </h3>

                                    <p>

                                        {item.text}

                                    </p>

                                </div>

                            )

                        )

                    }

                </div>

                {/* ================= IMPORTANT ================= */}

                <div className="shipping-note">

                    <h2>

                        Important Shipping Information

                    </h2>

                    <ul>

                        <li>

                            Orders are dispatched within 24–48 hours after successful payment.

                        </li>

                        <li>

                            Tracking details are sent via Email after dispatch.

                        </li>

                        <li>

                            Delivery timelines may increase during festivals or major sales.

                        </li>

                        <li>

                            Please ensure your shipping address is correct before placing your order.

                        </li>

                        <li>

                            If a delivery attempt fails, our courier partner will re-attempt delivery.

                        </li>

                    </ul>

                </div>

            </div>

        </div>

    );

};

export default ShippingPolicy;