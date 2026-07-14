import React from "react";

import {

    FaClipboardCheck,
    FaShoppingCart,
    FaMoneyBillWave,
    FaUndoAlt,
    FaUserLock,
    FaGavel

} from "react-icons/fa";

import "./TermsConditions.css";

const terms = [

    {

        icon:<FaShoppingCart />,

        title:"Orders",

        description:
        "All orders are subject to product availability. JerseyHub reserves the right to cancel or refuse any order in exceptional circumstances."

    },

    {

        icon:<FaMoneyBillWave />,

        title:"Payments",

        description:
        "Payments are processed securely through trusted payment gateways. Orders are confirmed only after successful payment."

    },

    {

        icon:<FaUndoAlt />,

        title:"Returns & Refunds",

        description:
        "Returns and refunds are governed by our Return Policy. Products must satisfy all eligibility requirements."

    },

    {

        icon:<FaUserLock />,

        title:"Customer Accounts",

        description:
        "Customers are responsible for maintaining the confidentiality of their account credentials and activities."

    },

    {

        icon:<FaClipboardCheck />,

        title:"Product Information",

        description:
        "We strive to keep product descriptions, pricing and availability accurate. Minor differences may occasionally occur."

    },

    {

        icon:<FaGavel />,

        title:"Legal Responsibility",

        description:
        "By using JerseyHub, you agree to comply with all applicable laws and these Terms & Conditions."

    }

];

const TermsConditions = () => {

    return (

        <div className="terms-page">

            <div className="container">

                <div className="terms-hero">

                    <span>

                        TERMS & CONDITIONS

                    </span>

                    <h1>

                        Terms of Service

                    </h1>

                    <p>

                        Please read these Terms & Conditions carefully before
                        using JerseyHub. By accessing or purchasing from our
                        website, you agree to the following terms.

                    </p>

                </div>

                <div className="terms-grid">

                    {

                        terms.map(

                            (item,index)=>(

                                <div

                                    className="terms-card"

                                    key={index}

                                >

                                    <div className="terms-icon">

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

                <div className="terms-note">

                    <h2>

                        General Conditions

                    </h2>

                    <ul>

                        <li>

                            Prices are subject to change without prior notice.

                        </li>

                        <li>

                            Misuse of the website may result in account suspension.

                        </li>

                        <li>

                            JerseyHub reserves the right to modify policies whenever required.

                        </li>

                        <li>

                            Continued use of the website indicates acceptance of updated terms.

                        </li>

                        <li>

                            For any legal queries, contact support@jerseyhub.com

                        </li>

                    </ul>

                </div>

            </div>

        </div>

    );

};

export default TermsConditions;