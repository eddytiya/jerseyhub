import React from "react";
import "./StatsSection.css";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
    FaTshirt,
    FaFutbol,
    FaGlobe,
    FaStar
} from "../../utils/navbarIcons";

import { useNavigate } from "react-router-dom";

const stats = [

    {

        icon:<FaTshirt />,

        value:500,

        suffix:"+",

        title:"Premium Jerseys",

        desc:"Official club & national kits"

    },

    {

        icon:<FaFutbol />,

        value:120,

        suffix:"+",

        title:"Football Clubs",

        desc:"Top clubs from around the world"

    },

    {

        icon:<FaGlobe />,

        value:50,

        suffix:"+",

        title:"National Teams",

        desc:"International football collections"

    },

    {

        icon:<FaStar />,

        value:4.9,

        suffix:"",

        title:"Customer Rating",

        desc:"Based on customer reviews"

    }

];

const easeOut = [0.16, 1, 0.3, 1];

const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } }
};

const cardVariants = {
    hidden: { opacity: 0, y: 36, scale: 0.94 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: easeOut } }
};

/* ==========================================
        COUNT-UP — only starts once the
        card actually scrolls into view,
        instead of racing the hero on mount
========================================== */

const AnimatedNumber = ({ value, suffix = "", start }) => {

    const [count, setCount] = useState(0);

    const reduceMotion = useReducedMotion();

    useEffect(() => {

        if (!start) return;

        if (reduceMotion) {

            setCount(value);

            return;

        }

        let startTime;

        const duration = 1400;

        const animate = (timestamp) => {

            if (!startTime)

                startTime = timestamp;

            const progress = Math.min(

                (timestamp - startTime) / duration,

                1

            );

            const current = value * progress;

            setCount(current);

            if (progress < 1)

                requestAnimationFrame(animate);

        };

        const frame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(frame);

    }, [start, value, reduceMotion]);

    return (

        <>

            {

                Number.isInteger(value)

                    ?

                    Math.floor(count)

                    :

                    count.toFixed(1)

            }

            {suffix}

        </>

    );

};

const StatsSection = () => {
    const navigate = useNavigate();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.35 });

    return (

        <section className="stats-section">

            <motion.div
                ref={ref}
                className="stats-container"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "show" : "hidden"}
            >

                {

                    stats.map((item, index) => (

                        <motion.div

                            className={`stat-card stat-card-${index}`}

                            key={index}

                            variants={cardVariants}

                            whileHover={{ y: -8 }}

                            transition={{ y: { duration: 0.24, ease: easeOut } }}

                        >

                            <div className="stat-icon">

                                {item.icon}

                            </div>

                            <h2 className="stat-number">

                                <AnimatedNumber

                                    value={item.value}

                                    suffix={item.suffix}

                                    start={isInView}

                                />

                            </h2>

                            <p className="stat-title">

                                {item.title}

                            </p>

                            <span className="stat-desc">

                                {item.desc}

                            </span>

                        </motion.div>

                    ))

                }

            </motion.div>

        </section>

    );

};

export default StatsSection;
