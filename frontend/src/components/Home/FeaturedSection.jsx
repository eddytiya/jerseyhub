import React from 'react'

import './FeaturedSection.css'

import './Home.css'

import FeaturedCard from './FeaturedCard'

const FeaturedSection = ({ jerseys }) => {

    return (

        <section className="home-section">

            <div className="section-title">

                <h2>

                    Featured Jerseys

                </h2>

                <span></span>

                <p className="section-subtitle">

                    Hand-picked premium football jerseys.

                </p>

            </div>

            <div className="featured-grid">

                {

                    jerseys

                    .filter(

                        jersey => jersey.featured

                    )

                    .map(jersey => (

                        <FeaturedCard

                            key={jersey._id}

                            jersey={jersey}

                        />

                    ))

                }

            </div>

        </section>

    )

}

export default FeaturedSection