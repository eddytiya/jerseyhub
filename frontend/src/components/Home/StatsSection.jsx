import React from "react";
import "./StatsSection.css";
import { useEffect, useState } from "react";
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
const AnimatedNumber = ({ value, suffix = "" }) => {

    const [count, setCount] = useState(0);

    useEffect(() => {

        let startTime;

        const duration = 1800;

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

        requestAnimationFrame(animate);

    }, [value]);

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

    return (

        <section className="stats-section">

            <div className="stats-container">

                {

                    stats.map((item, index) => (

                        <div

                            className={`stat-card stat-card-${index}`}

                            key={index}

                        >

                            <div className="stat-badge">

                               

                            </div>

                            <div className="stat-icon">

                                {item.icon}

                            </div>

                            <h2 className="stat-number">

                                <AnimatedNumber

                                    value={item.value}

                                    suffix={item.suffix}

                                />

                            </h2>

                            <p className="stat-title">

                                {item.title}

                            </p>

                            <span className="stat-desc">

                                {item.desc}

                            </span>

                            <div className="stat-arrow">

                               

                            </div>

                        </div>

                    ))

                }

            </div>

        </section>

    );

};

export default StatsSection;