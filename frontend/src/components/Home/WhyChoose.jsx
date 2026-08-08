import React, { useEffect, useRef } from "react";
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

    const gridRef = useRef(null);

    useEffect(() => {

        const grid = gridRef.current;

        if (!grid) return undefined;

        if (!("IntersectionObserver" in window)) {

            grid.classList.add("no-js");

            return undefined;

        }

        const cards = grid.querySelectorAll(".why-card");

        const observer = new IntersectionObserver((entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) return;

                cards.forEach((card, i) => {
                    setTimeout(() => card.classList.add("in-view"), i * 90);
                });

                observer.disconnect();

            });

        }, { threshold: 0.25 });

        observer.observe(grid);

        return () => observer.disconnect();

    }, []);

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

            <div className="why-grid" ref={gridRef}>

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