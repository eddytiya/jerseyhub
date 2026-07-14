import React from "react";

import {

    FaUserShield,
    FaLock,
    FaCookieBite,
    FaCreditCard,
    FaEnvelope,
    FaDatabase

} from "react-icons/fa";

import "./PrivacyPolicy.css";

const privacyItems = [

    {

        icon:<FaUserShield />,

        title:"Your Privacy Matters",

        description:
        "Your personal information is collected only to process orders, improve your shopping experience and provide customer support."

    },

    {

        icon:<FaLock />,

        title:"Secure Information",

        description:
        "All sensitive information is protected using secure encryption and industry-standard security practices."

    },

    {

        icon:<FaCookieBite />,

        title:"Cookies",

        description:
        "We use cookies to remember your preferences, improve website performance and personalize your shopping experience."

    },

    {

        icon:<FaCreditCard />,

        title:"Secure Payments",

        description:
        "Payment information is processed securely through trusted payment gateways. JerseyHub never stores your card details."

    },

    {

        icon:<FaEnvelope />,

        title:"Marketing Emails",

        description:
        "You may receive promotional emails and new jersey launch notifications. You can unsubscribe anytime."

    },

    {

        icon:<FaDatabase />,

        title:"Data Storage",

        description:
        "Your account details and order history are securely stored and are never sold to third-party companies."

    }

];

const PrivacyPolicy = () => {

    return (

        <div className="privacy-page">

            <div className="container">

                {/* HERO */}

                <div className="privacy-hero">

                    <span>

                        PRIVACY POLICY

                    </span>

                    <h1>

                        Your Privacy Is Our Priority

                    </h1>

                    <p>

                        JerseyHub values your trust. We are committed to protecting
                        your personal information and ensuring complete transparency
                        in how your data is collected and used.

                    </p>

                </div>

                {/* GRID */}

                <div className="privacy-grid">

                    {

                        privacyItems.map(

                            (item,index)=>(

                                <div

                                    className="privacy-card"

                                    key={index}

                                >

                                    <div className="privacy-icon">

                                        {item.icon}

                                    </div>

                                    <h3>

                                        {item.title}

                                    </h3>

                                    <p>

                                        {item.description}

                                    </p>

                                </div>

                            )

                        )

                    }

                </div>

                {/* NOTE */}

                <div className="privacy-note">

                    <h2>

                        Privacy Commitment

                    </h2>

                    <ul>

                        <li>

                            We never sell your personal information.

                        </li>

                        <li>

                            Your passwords are securely encrypted.

                        </li>

                        <li>

                            Payment information is never stored on our servers.

                        </li>

                        <li>

                            You can request account deletion anytime.

                        </li>

                        <li>

                            Your information is used only to improve your shopping experience.

                        </li>

                    </ul>

                </div>

            </div>

        </div>

    );

};

export default PrivacyPolicy;