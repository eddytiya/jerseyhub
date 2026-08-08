import React from 'react'

import './FeaturedSection.css'

import './Home.css'

import FeaturedCard from './FeaturedCard'
import ScrollReveal from '../dashboard/ScrollReveal'

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

                    .map((jersey, index) => (

                        <ScrollReveal key={jersey._id} delay={Math.min(index * 0.08, 0.32)}>

                            <FeaturedCard

                                jersey={jersey}

                            />

                        </ScrollReveal>

                    ))

                }

            </div>

        </section>

    )

}

export default FeaturedSection