import React, { useState } from "react";

import {

    FaSearch,
    FaPlus,
    FaMinus,
    FaQuestionCircle

} from "react-icons/fa";

import "./FAQ.css";

const faqData = [

    {

        question:"How long does shipping take?",

        answer:"Standard shipping across India usually takes 2–5 business days. International deliveries generally take 7–15 business days."

    },

    {

        question:"Can I exchange my jersey if the size doesn't fit?",

        answer:"Yes. Eligible products can be exchanged within 7 days of delivery provided they are unused and returned with original packaging."

    },

    {

        question:"Are your jerseys authentic?",

        answer:"Yes. JerseyHub only offers premium quality football jerseys carefully sourced for football fans."

    },

    {

        question:"How can I track my order?",

        answer:"Once your order is shipped, you'll receive a tracking number through email that allows you to monitor your shipment."

    },

    {

        question:"Can I cancel my order?",

        answer:"Orders can be cancelled before they are shipped. Once dispatched, our Return Policy will apply."

    },

    {

        question:"Which payment methods are accepted?",

        answer:"We accept UPI, Credit Cards, Debit Cards, Net Banking and Razorpay supported payment methods."

    },

    {

        question:"Do you offer Cash on Delivery?",

        answer:"Currently JerseyHub supports secure online payments only."

    },

    {

        question:"How do I contact customer support?",

        answer:"You can reach us anytime through our Contact Us page or by emailing support@jerseyhub.com."

    }

];

const FAQ = () => {

    const [open,setOpen]=useState(null);

    const [search,setSearch]=useState("");

    const filtered = faqData.filter(

        item=>

            item.question

            .toLowerCase()

            .includes(

                search.toLowerCase()

            )

    );

    return(

        <div className="faq-page">

            <div className="container">

                {/* HERO */}

                <div className="faq-hero">

                    <FaQuestionCircle className="faq-hero-icon"/>

                    <span>

                        SUPPORT CENTER

                    </span>

                    <h1>

                        Frequently Asked Questions

                    </h1>

                    <p>

                        Find quick answers to the most common questions about shopping at JerseyHub.

                    </p>

                </div>

                {/* SEARCH */}

                <div className="faq-search">

                    <FaSearch/>

                    <input

                        type="text"

                        placeholder="Search your question..."

                        value={search}

                        onChange={(e)=>

                            setSearch(

                                e.target.value

                            )

                        }

                    />

                </div>

                {/* FAQ */}

                <div className="faq-list">

                    {

                        filtered.map(

                            (item,index)=>(

                                <div

                                    key={index}

                                    className={`faq-card ${open===index?"active":""}`}

                                >

                                    <button

                                        className="faq-question"

                                        onClick={()=>

                                            setOpen(

                                                open===index

                                                ?

                                                null

                                                :

                                                index

                                            )

                                        }

                                    >

                                        <span>

                                            {item.question}

                                        </span>

                                        {

                                            open===index

                                            ?

                                            <FaMinus/>

                                            :

                                            <FaPlus/>

                                        }

                                    </button>

                                    {

                                        open===index &&

                                        <div className="faq-answer">

                                            <p>

                                                {item.answer}

                                            </p>

                                        </div>

                                    }

                                </div>

                            )

                        )

                    }

                </div>

            </div>

        </div>

    );

};

export default FAQ;