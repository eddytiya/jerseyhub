import React, { useState } from "react";

import {

    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt,
    FaClock,
    FaWhatsapp,
    FaPaperPlane

} from "react-icons/fa";

import "./ContactUs.css";

const ContactUs = () => {

    const [form,setForm]=useState({

        name:"",
        email:"",
        subject:"",
        message:""

    });

    const handleChange=(e)=>{

        setForm({

            ...form,

            [e.target.name]:e.target.value

        });

    };

    const handleSubmit=(e)=>{

        e.preventDefault();

        alert("Message Sent Successfully!");

        setForm({

            name:"",
            email:"",
            subject:"",
            message:""

        });

    };

    return(

        <div className="contact-page">

            <div className="container">

                {/* HERO */}

                <div className="contact-hero">

                    <span>

                        CONTACT JERSEYHUB

                    </span>

                    <h1>

                        We'd Love To Hear From You

                    </h1>

                    <p>

                        Need help with an order, returns or sizing?
                        Our support team is always ready to help.

                    </p>

                </div>

                {/* CONTACT CARDS */}

                <div className="contact-grid">

                    <div className="contact-card">

                        <FaPhoneAlt/>

                        <h3>

                            Phone

                        </h3>

                        <p>

                            +91 98765 43210

                        </p>

                    </div>

                    <div className="contact-card">

                        <FaEnvelope/>

                        <h3>

                            Email

                        </h3>

                        <p>

                            support@jerseyhub.com

                        </p>

                    </div>

                    <div className="contact-card">

                        <FaClock/>

                        <h3>

                            Working Hours

                        </h3>

                        <p>

                            Mon - Sat

                            <br/>

                            10 AM - 7 PM

                        </p>

                    </div>

                    <div className="contact-card">

                        <FaMapMarkerAlt/>

                        <h3>

                            Address

                        </h3>

                        <p>

                            Mumbai,
                            Maharashtra,
                            India

                        </p>

                    </div>

                </div>

                {/* FORM */}

                <div className="contact-wrapper">

                    <div className="contact-form">

                        <h2>

                            Send us a Message

                        </h2>

                        <form onSubmit={handleSubmit}>

                            <input

                                type="text"

                                name="name"

                                placeholder="Your Name"

                                value={form.name}

                                onChange={handleChange}

                                required

                            />

                            <input

                                type="email"

                                name="email"

                                placeholder="Email Address"

                                value={form.email}

                                onChange={handleChange}

                                required

                            />

                            <input

                                type="text"

                                name="subject"

                                placeholder="Subject"

                                value={form.subject}

                                onChange={handleChange}

                                required

                            />

                            <textarea

                                rows="6"

                                name="message"

                                placeholder="Your Message"

                                value={form.message}

                                onChange={handleChange}

                                required

                            />

                            <button>

                                <FaPaperPlane/>

                                Send Message

                            </button>

                        </form>

                    </div>

                    {/* SUPPORT */}

                    <div className="contact-side">

                        <div className="whatsapp-card">

                            <FaWhatsapp/>

                            <h3>

                                WhatsApp Support

                            </h3>

                            <p>

                                Get instant help from our customer support team.

                            </p>

                            <a

                                href="https://wa.me/919876543210"

                                target="_blank"

                                rel="noopener noreferrer"

                            >

                                Chat Now

                            </a>

                        </div>

                        <div className="map-card">

                            <h3>

                                Our Location

                            </h3>

                            <p>

                                Mumbai, Maharashtra

                            </p>

                            <div className="map-placeholder">

                                📍 Google Maps

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default ContactUs;