import React from "react";

import {

    FaShoppingCart,

    FaMapMarkerAlt,

    FaCreditCard,

    FaCheckCircle

} from "react-icons/fa";

import "./CheckoutSteps.css";

const CheckoutSteps = () => {

    return (

        <div className="checkout-steps">

            <div className="step completed">

                <div className="step-icon">

                    <FaShoppingCart />

                </div>

                <span>

                    Cart

                </span>

            </div>

            <div className="step-line active"></div>

            <div className="step active">

                <div className="step-icon">

                    <FaMapMarkerAlt />

                </div>

                <span>

                    Delivery

                </span>

            </div>

            <div className="step-line"></div>

            <div className="step">

                <div className="step-icon">

                    <FaCreditCard />

                </div>

                <span>

                    Payment

                </span>

            </div>

            <div className="step-line"></div>

            <div className="step">

                <div className="step-icon">

                    <FaCheckCircle />

                </div>

                <span>

                    Complete

                </span>

            </div>

        </div>

    );

};

export default CheckoutSteps;