import React from "react";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import {

    FaArrowRight,

    FaFutbol

} from "react-icons/fa";

import MagneticButton from "../common/MagneticButton";
import "../common/MagneticButton.css";
import "./CTASection.css";

const CTASection = () => {

    return (

        <section className="cta-section">

            <div className="container">

                <motion.div
                    className="cta-card"
                    initial={false}
                    whileInView={{ y: [16, 0] }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                >

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

                    <MagneticButton
                        as={Link}
                        to="/shop"
                        className="cta-btn"
                        pullStrength={0.2}
                    >

                        Shop Now

                        <FaArrowRight />

                    </MagneticButton>

                </motion.div>

            </div>

        </section>

    );

};

export default CTASection;
