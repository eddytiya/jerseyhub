import React, { useEffect, useState } from 'react';
import './AnimatedCounter.css';

const AnimatedCounter = ({

    value,

    duration = 1500,

    prefix = "",

    suffix = ""

}) => {

    const [count, setCount] = useState(0);

    useEffect(() => {

        let start = 0;

        const end = Number(value);

        if (isNaN(end)) return;

        const increment = end / (duration / 16);

        const timer = setInterval(() => {

            start += increment;

            if (start >= end) {

                start = end;

                clearInterval(timer);

            }

            setCount(Math.floor(start));

        }, 16);

        return () => clearInterval(timer);

    }, [value, duration]);

    return (

        <span className="animated-counter">

            {prefix}

            {count}

            {suffix}

        </span>

    );

};

export default AnimatedCounter;