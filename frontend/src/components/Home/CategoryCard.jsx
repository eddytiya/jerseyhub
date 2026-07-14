import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'

const CategoryCard = ({ category, jerseyCount }) => {

    return (

        <NavLink

            to={`/category/${category.name}`}

            className="category-card"

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

        </NavLink>

    )

}

export default CategoryCard