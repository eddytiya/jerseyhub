import React from "react";

import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import {

    FaFutbol,
    FaInstagram,
    FaFacebookF,
    FaTwitter,
    FaYoutube,
    FaCcVisa,
    FaCcMastercard,
    FaPaypal,
    FaArrowUp

} from "react-icons/fa";

import {

    SiGooglepay

} from "react-icons/si";

import "./Footer.css";

const Footer = () => {

    const [email,setEmail]=useState("");

const [loading,setLoading]=useState(false);

const subscribeNewsletter = async () => {

    if(!email.trim()){

        alert("Please enter your email.");

        return;

    }

    try{

        setLoading(true);

        const resp = await axios.post(

            "http://localhost:2987/newsletter/subscribe",

            {

                email

            }

        );

       toast.success(resp.data.message);

        setEmail("");

    }

    catch(err){

       toast.error(

    err.response?.data?.message ||

    "Subscription failed."

);
    }

    finally{

        setLoading(false);

    }

};

    const scrollToTop = () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    };

    return (

        <footer className="footer">

            <div className="container">

                {/* ==========================================
                            TOP GRID
                ========================================== */}

                <div className="footer-grid">

                    {/* ================= BRAND ================= */}

                    <div className="footer-column">

                        <div className="footer-logo">

                            <FaFutbol />

                            <span>

                                JerseyHub

                            </span>

                        </div>

                        <p className="footer-description">

                            Premium football jerseys for clubs,
                            countries and football lovers around
                            the world. Wear your colours with pride.

                        </p>

                        {/* Brand Stats */}

                        <div className="footer-stats">

                            <div>

                                <h3>500+</h3>

                                <span>Premium Jerseys</span>

                            </div>

                            <div>

                                <h3>50+</h3>

                                <span>Football Clubs</span>

                            </div>

                            <div>

                                <h3>30+</h3>

                                <span>National Teams</span>

                            </div>

                        </div>

                        {/* Social */}

                        <div className="footer-social">

                            <a

                                href="#"

                                target="_blank"

                                rel="noopener noreferrer"

                            >

                                <FaInstagram />

                            </a>

                            <a

                                href="#"

                                target="_blank"

                                rel="noopener noreferrer"

                            >

                                <FaFacebookF />

                            </a>

                            <a

                                href="#"

                                target="_blank"

                                rel="noopener noreferrer"

                            >

                                <FaTwitter />

                            </a>

                            <a

                                href="#"

                                target="_blank"

                                rel="noopener noreferrer"

                            >

                                <FaYoutube />

                            </a>

                        </div>

                    </div>

                    {/* ================= SHOP ================= */}

                    <div className="footer-column">

                        <h4>

                            Shop

                        </h4>

                        <Link to="/jerseys">

                            Home

                        </Link>

                        <Link to="/shop">

                            Shop

                        </Link>

                        <Link to="/categories">

                            Categories

                        </Link>

                        <Link to="/products">

                            Products

                        </Link>

                        <Link to="/wishlist">

                            Wishlist

                        </Link>

                    </div>

                    {/* ================= CUSTOMER ================= */}

                    <div className="footer-column">

                        <h4>

                            Customer

                        </h4>

                        <Link to="/orders">

                            My Orders

                        </Link>

                        <Link to="/contact">

                            Contact Us

                        </Link>

                        <Link to="/faq">

                            FAQs

                        </Link>

                        <Link to="/return-policy">

                            Return Policy

                        </Link>

                        <Link to="/shipping-policy">

                            Shipping Policy

                        </Link>

                    </div>

                    {/* ================= LEGAL ================= */}

                    <div className="footer-column">

                        <h4>

                            Legal

                        </h4>

                        <Link to="/privacy-policy">

                            Privacy Policy

                        </Link>

                        <Link to="/terms">

                            Terms & Conditions

                        </Link>

                        <Link to="/return-policy">

                            Returns

                        </Link>

                        <Link to="/shipping-policy">

                            Shipping

                        </Link>

                    </div>

                    {/* ================= NEWSLETTER ================= */}

                    <div className="footer-column">

                        <h4>

                            Newsletter

                        </h4>

                        <p>

                            Stay updated with the latest jersey drops,
                            exclusive offers and football collections.

                        </p>

                        <div className="footer-newsletter">

                            <input

                                type="email"

                                placeholder="Enter your email"

                                value={email}

                                onChange={(e)=>

                                    setEmail(

                                        e.target.value

                                    )

                                }

                            />

                            <button

                                onClick={subscribeNewsletter}

                                disabled={loading}

                            >

                                {

                                    loading

                                    ?

                                    "Subscribing..."

                                    :

                                    "Subscribe"

                                }

                            </button>

                        </div>

                    </div>

                </div>

                {/* ==========================================
                        PAYMENT METHODS
                ========================================== */}

                <div className="footer-payments">

                    <span>

                        Accepted Payments

                    </span>

                    <div>

                        <FaCcVisa />

                        <FaCcMastercard />

                        <SiGooglepay />

                        <FaPaypal />

                    </div>

                </div>

                {/* ==========================================
                            FOOTER BOTTOM
                ========================================== */}

                <div className="footer-bottom">

                    <div>

                        <p>

                            © 2026 <strong>JerseyHub</strong>. All Rights Reserved.

                        </p>

                        <small>

                            Wear Your Colours. Live The Game. ⚽

                        </small>

                        <br />

                        <small>

                            Designed & Developed by <strong>Aditya Pathak</strong> ❤️

                        </small>

                    </div>

                    <button

                        className="footer-top-btn"

                        onClick={scrollToTop}

                    >

                        <FaArrowUp />

                    </button>

                </div>

            </div>

        </footer>

    );

};

export default Footer;