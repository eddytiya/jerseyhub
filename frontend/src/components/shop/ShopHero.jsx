import React from "react";
import "./ShopHero.css";

const ShopHero = ({ total }) => {

    return (

        <section className="shop-hero">

            <div className="hero-left">

                <span className="shop-badge">

                    OFFICIAL STORE

                </span>

                <h1>

                    Shop Football Jerseys

                </h1>

                <p>

                    Discover official club kits, international jerseys,
                    retro classics, football boots and fan merchandise.

                </p>

                <div className="shop-stats">

                    <div>

                        <h2>{total}</h2>

                        <span>Products</span>

                    </div>

                    <div>

                        <h2>100%</h2>

                        <span>Authentic</span>

                    </div>

                    <div>

                        <h2>24/7</h2>

                        <span>Available</span>

                    </div>

                </div>

            </div>

            <div className="hero-right">

                <div className="hero-card">

                    <h3>

                        Football Starts Here ⚽

                    </h3>

                    <p>

                        Browse every jersey available in JerseyHub.
                        Club collections, national teams, retro editions
                        and exclusive drops.

                    </p>

                </div>

            </div>

        </section>

    );

};

export default ShopHero;