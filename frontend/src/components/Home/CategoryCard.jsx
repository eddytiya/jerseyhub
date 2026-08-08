import React from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaArrowRight } from 'react-icons/fa'

const EASE_OUT = [0.16, 1, 0.3, 1]

const MotionNavLink = motion(NavLink)

const CategoryCard = ({ category, jerseyCount, index = 0 }) => {

    const entranceDelay = Math.min(index * 0.06, 0.3)

    return (

        <MotionNavLink

            to={`/category/${category.name}`}

            className="category-card"

            initial={{ opacity: 0, y: 32 }}
            whileInView={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, delay: entranceDelay, ease: EASE_OUT }
            }}
            viewport={{ once: true, amount: 0.25 }}
            whileHover={{
                y: -14,
                scale: 1.02,
                transition: { duration: 0.3, ease: EASE_OUT }
            }}

        >

            <img

                src={category.imageUrl}

                alt={category.name}

            />

            <div className="category-overlay"></div>

            {/* <div className="category-badge">

                {jerseyCount} Jerseys

            </div> */}

            <div className="category-content">

                <h3>

                    {category.name}

                </h3>

                <p>

                    {category.description}

                </p>

                <div className="category-link">

                    Explore Collection

                    <FaArrowRight/>

                </div>

            </div>

        </MotionNavLink>

    )

}

export default CategoryCard