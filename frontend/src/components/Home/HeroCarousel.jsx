import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import "./HeroCarousel.css";

const slides = [

    {
        image:
            "https://media.gettyimages.com/id/182790712/photo/soccer-jerseys.jpg?s=612x612&w=0&k=20&c=rQVy-ENttTIJhzPeRA4Oq0Ds9tkmOen9q_YIsNlSXdE=",

        tag: "New Drop",
        title: "Premium Football Jerseys",
        subtitle: "Authentic jerseys for every fan.",
        link: "/products"
    },

    {
        image:
            "https://media.gettyimages.com/id/2276645038/photo/shanghai-china-jerseys-are-on-display-at-a-store-on-may-16-2026-in-shanghai-china-the-fifa.jpg?s=612x612&w=0&k=20&c=WP3BHWjQPgiUOnrZWwbCnOLG64amtfC9lN2OPPLd8kU=",

        tag: "Just Landed",
        title: "New Season Collection",
        subtitle: "Latest arrivals for the new season.",
        link: "/category/Club"
    },

    {
        image:
            "https://media.gettyimages.com/id/2279472761/photo/jerseys-of-german-french-argentinian-and-brazilian-national-football-teams-for-the-fifa-2026.jpg?s=612x612&w=0&k=20&c=-tjcJMbcqtzpYJfOKDtGiELjMPGEp6d3nmBaa3Jjuww=",

        tag: "Fan Favorite",
        title: "Retro & Special Editions",
        subtitle: "Classic football shirts, timeless memories.",
        link: "/category/Retro Collection"
    }

];

const AUTOPLAY_MS = 4500;

const easeOut = [0.16, 1, 0.3, 1];

const copyVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.22 } }
};

const itemVariants = {
    hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: easeOut } }
};

const HeroCarousel = () => {

    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const navigate = useNavigate();
    const reduceMotion = useReducedMotion();
    const timerRef = useRef(null);

    const goTo = useCallback((i) => {
        setIndex(((i % slides.length) + slides.length) % slides.length);
    }, []);

    useEffect(() => {

        if (paused) return undefined;

        timerRef.current = setInterval(() => {
            setIndex((i) => (i + 1) % slides.length);
        }, AUTOPLAY_MS);

        return () => clearInterval(timerRef.current);

    }, [paused]);

    const slide = slides[index];

    return (

        <section
            className="hero-carousel"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >

            <AnimatePresence mode="wait">

                <motion.div
                    key={index}
                    className="carousel-item active"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(slide.link)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: easeOut }}
                >

                    <motion.img
                        src={slide.image}
                        className="hero-image"
                        alt={slide.title}
                        initial={{ scale: 1 }}
                        animate={{ scale: reduceMotion ? 1 : 1.1 }}
                        transition={{ duration: AUTOPLAY_MS / 1000 + 1.2, ease: "linear" }}
                    />

                    <div className="hero-overlay"></div>

                    <div className="carousel-caption">

                        <motion.div
                            className="hero-content"
                            variants={copyVariants}
                            initial="hidden"
                            animate="show"
                        >

                            <motion.span className="hero-tag" variants={itemVariants}>
                                {slide.tag}
                            </motion.span>

                            <motion.h1 variants={itemVariants}>
                                {slide.title}
                            </motion.h1>

                            <motion.p className="hero-subtitle" variants={itemVariants}>
                                {slide.subtitle}
                            </motion.p>

                        </motion.div>

                    </div>

                </motion.div>

            </AnimatePresence>

            {/* Indicators */}

            <div className="carousel-indicators">

                {
                    slides.map((_, i) => (
                        <button
                            key={i}
                            type="button"
                            className={i === index ? "active" : ""}
                            aria-current={i === index}
                            aria-label={`Go to slide ${i + 1}`}
                            onClick={() => goTo(i)}
                        />
                    ))
                }

            </div>

            {/* Previous */}

            <button
                className="carousel-control-prev"
                type="button"
                aria-label="Previous slide"
                onClick={() => goTo(index - 1)}
            >
                <span className="carousel-control-prev-icon"></span>
            </button>

            {/* Next */}

            <button
                className="carousel-control-next"
                type="button"
                aria-label="Next slide"
                onClick={() => goTo(index + 1)}
            >
                <span className="carousel-control-next-icon"></span>
            </button>

        </section>

    );

};

export default HeroCarousel;
