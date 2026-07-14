import React from "react";

import {

    FaUndoAlt,
    FaBoxOpen,
    FaTimesCircle,
    FaMoneyCheckAlt,
    FaHeadset,
    FaCheckCircle

} from "react-icons/fa";

import "./ReturnPolicy.css";

const policies = [

    {

        icon:<FaUndoAlt />,

        title:"7 Day Easy Returns",

        description:
        "Return eligible products within 7 days of delivery for a hassle-free shopping experience."

    },

    {

        icon:<FaBoxOpen />,

        title:"Original Condition",

        description:
        "Items must be unused, unwashed and returned with original tags and packaging."

    },

    {

        icon:<FaTimesCircle />,

        title:"Non Returnable",

        description:
        "Customized jerseys, mystery boxes and clearance sale products cannot be returned."

    },

    {

        icon:<FaMoneyCheckAlt />,

        title:"Fast Refunds",

        description:
        "Approved refunds are processed within 5–7 business days to your original payment method."

    },

    {

        icon:<FaCheckCircle />,

        title:"Wrong Size?",

        description:
        "Need a different size? We offer quick exchanges based on stock availability."

    },

    {

        icon:<FaHeadset />,

        title:"Need Help?",

        description:
        "Our support team is available to help you with returns, exchanges and refund queries."

    }

];

const ReturnPolicy = () => {

    return (

        <div className="return-page">

            <div className="container">

                {/* ================= HERO ================= */}

                <div className="return-hero">

                    <span>

                        CUSTOMER SUPPORT

                    </span>

                    <h1>

                        Return & Refund Policy

                    </h1>

                    <p>

                        We want every football fan to shop with confidence.
                        If something isn't right with your order, we're here
                        to make it right.

                    </p>

                </div>

                {/* ================= CARDS ================= */}

                <div className="return-grid">

                    {

                        policies.map((item,index)=>(

                            <div

                                className="return-card"

                                key={index}

                            >

                                <div className="return-icon">

                                    {item.icon}

                                </div>

                                <h3>

                                    {item.title}

                                </h3>

                                <p>

                                    {item.description}

                                </p>

                            </div>

                        ))

                    }

                </div>

                {/* ================= IMPORTANT ================= */}

                <div className="return-note">

                    <h2>

                        Important Information

                    </h2>

                    <ul>

                        <li>

                            Products must be returned in original condition.

                        </li>

                        <li>

                            Damaged products should be reported within 48 hours of delivery.

                        </li>

                        <li>

                            Refunds are issued only after quality inspection.

                        </li>

                        <li>

                            Shipping charges are non-refundable unless the error is from JerseyHub.

                        </li>

                        <li>

                            For assistance contact us at <strong>support@jerseyhub.com</strong>

                        </li>

                    </ul>

                </div>

            </div>

        </div>

    );

};

export default ReturnPolicy;