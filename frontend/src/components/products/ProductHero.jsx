import React from "react";

import "./ProductHero.css";

const ProductHero = ({

    title = "Explore Every Product",

    subtitle = "Jerseys, football boots, retro collections, merchandise and much more.",

    badge = "JERSEYHUB STORE",

    glassTitle = "Football Starts Here ⚽",

    glassText = "Browse every football product available at JerseyHub. From jerseys and boots to accessories and exclusive collections.",

    totalProducts

}) => {

    return (

<section className="products-hero">

    <div className="hero-overlay"></div>

    <div className="hero-left">

        <span className="hero-badge">

            {badge}

        </span>

        <h1>

            {title}

        </h1>

        <p>

            {subtitle}

        </p>

        <div className="hero-buttons">

            <button className="primary-btn">

                Shop Now

            </button>

            <button className="secondary-btn">

                Browse Categories

            </button>

        </div>

        <div className="hero-stats">

            <div>

                <h2>{totalProducts}</h2>

                <span>Products</span>

            </div>

            <div>

                <h2>100%</h2>

                <span>Authentic</span>

            </div>

            <div>

                <h2>24/7</h2>

                <span>Support</span>

            </div>

        </div>

    </div>

    <div className="hero-right">

        <div className="glass-card">

            <div className="football">

                ⚽

            </div>

            <h3>

                {glassTitle}

            </h3>

            <p>

                {glassText}

            </p>

        </div>

    </div>

</section>

);

};

export default ProductHero;