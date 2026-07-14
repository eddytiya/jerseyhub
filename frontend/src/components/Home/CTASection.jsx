import React from "react";

import { Link } from "react-router-dom";

import {

    FaArrowRight,

    FaFutbol

} from "react-icons/fa";

import "./CTASection.css";

const CTASection = () => {

    return (

        <section className="cta-section">

            <div className="container">

                <div className="cta-card">

                    <div className="cta-icon">

                        <FaFutbol />

                    </div>

                    <h2>

                        Ready to Wear Your Colors?

                    </h2>

                    <p>

                        Join thousands of football fans who trust JerseyHub
                        for authentic football jerseys, premium quality and
                        unbeatable passion for the beautiful game.

                    </p>

                    <Link

                        to="/shop"

                        className="cta-btn"

                    >

                        Shop Now

                        <FaArrowRight />

                    </Link>

                </div>

            </div>

        </section>

    );

};

export default CTASection;