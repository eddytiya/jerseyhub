import React from "react";
import "./WhyChoose.css";
import WhyCard from "./WhyCard";

import {
    FaShippingFast,
    FaShieldAlt,
    FaCreditCard,
    FaGift
} from "../../utils/navbarIcons";

const features = [

    {

        icon:<FaShippingFast />,

        title:"Fast Shipping",

        text:"Quick and reliable delivery with secure packaging across India."

    },

    {

        icon:<FaShieldAlt />,

        title:"Premium Quality",

        text:"Carefully crafted jerseys with premium fabric and long-lasting prints."

    },

    {

        icon:<FaCreditCard />,

        title:"Secure Payments",

        text:"Shop confidently with safe and encrypted payment methods."

    },

    {

        icon:<FaGift />,

        title:"Exclusive Collections",

        text:"Discover limited edition football jerseys and fan-favourite collections."

    }

];

const WhyChoose = () => {

    return (

        <section className="why-section">

            <div className="why-header">

                <span>

                    WHY CHOOSE US

                </span>

                <h2>

                    Why Football Fans Choose JerseyHub

                </h2>

                <p>

                    From premium quality jerseys to fast delivery and secure shopping,
                    JerseyHub is built for football supporters who want the best.

                </p>

            </div>

            <div className="why-grid">

                {

                    features.map((item,index)=>(

                        <WhyCard

                            key={index}

                            icon={item.icon}

                            title={item.title}

                            text={item.text}

                        />

                    ))

                }

            </div>

        </section>

    );

};

export default WhyChoose;