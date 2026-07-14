import React, { useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Carousel from "bootstrap/js/dist/carousel";
import { FaArrowRight } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import { HiShieldCheck } from "react-icons/hi";
import { BsTruck } from "react-icons/bs";
import { MdVerified } from "react-icons/md";
import "./HeroCarousel.css";
const slides = [

    {
        image:
            "https://media.gettyimages.com/id/182790712/photo/soccer-jerseys.jpg?s=612x612&w=0&k=20&c=rQVy-ENttTIJhzPeRA4Oq0Ds9tkmOen9q_YIsNlSXdE=",

        title: "Premium Football Jerseys",

        subtitle: "Authentic jerseys for every fan.",

        link: "/products"
    },

    {
        image:
            "https://media.gettyimages.com/id/2276645038/photo/shanghai-china-jerseys-are-on-display-at-a-store-on-may-16-2026-in-shanghai-china-the-fifa.jpg?s=612x612&w=0&k=20&c=WP3BHWjQPgiUOnrZWwbCnOLG64amtfC9lN2OPPLd8kU=",

        title: "New Season Collection",

        subtitle: "Latest arrivals for the new season.",

        link: "/category/Club"
    },

    {
        image:
            "https://media.gettyimages.com/id/2279472761/photo/jerseys-of-german-french-argentinian-and-brazilian-national-football-teams-for-the-fifa-2026.jpg?s=612x612&w=0&k=20&c=-tjcJMbcqtzpYJfOKDtGiELjMPGEp6d3nmBaa3Jjuww=",

        title: "Retro & Special Editions",

        subtitle: "Classic football shirts, timeless memories.",

        link: "/category/Retro Collection"
    }

];

const HeroCarousel = () => {

    const carouselRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {

        if (!carouselRef.current) return;

        const carousel = new Carousel(carouselRef.current, {

            interval: 4500,
            ride: "carousel",
            pause: false,
            wrap: true,
            touch: true

        });

        return () => {

            carousel.dispose();

        };

    }, []);

    return (

        <section className="hero-carousel">

            <div

                ref={carouselRef}
                id="heroCarousel"
                className="carousel slide carousel-fade"

            >

                <div className="carousel-indicators">

                    {

                        slides.map((_, index) => (

                            <button

                                key={index}
                                type="button"
                                data-bs-target="#heroCarousel"
                                data-bs-slide-to={index}
                                className={index === 0 ? "active" : ""}
                                aria-current={index === 0}
                                aria-label={`Slide ${index + 1}`}

                            />

                        ))

                    }

                </div>

                <div className="carousel-inner">

                    {

                        slides.map((slide, index) => (

                            <div
                                key={index}
                                className={`carousel-item ${index === 0 ? "active" : ""}`}
                                onClick={() => navigate(slide.link)}
                                style={{ cursor: "pointer" }}
                            >

                                <img

                                    src={slide.image}
                                    className="hero-image"
                                    alt={slide.title}

                                />

                                <div className="hero-overlay"></div>

                                <div className="carousel-caption">

                                    <div className="hero-content">

    <span className="hero-tag">
        {slide.tag}
    </span>

    <h1>{slide.title}</h1>

    <p className="hero-subtitle">
        {slide.subtitle}
    </p>

</div>

                                </div>

                            </div>

                        ))

                    }

                </div>

                {/* Previous */}

                <button

                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#heroCarousel"
                    data-bs-slide="prev"

                >

                    <span

                        className="carousel-control-prev-icon"

                    ></span>

                </button>

                {/* Next */}

                <button

                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#heroCarousel"
                    data-bs-slide="next"

                >

                    <span

                        className="carousel-control-next-icon"

                    ></span>

                </button>

            </div>

        </section>

    );

};

export default HeroCarousel;