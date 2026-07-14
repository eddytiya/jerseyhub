import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaArrowRight, FaStar } from 'react-icons/fa'

const FeaturedCard = ({ jersey }) => {

    return (

        <div className="featured-card">

            <div className="featured-image">

    <img
        src={jersey.imageUrl}
        alt={jersey.jerseyName}
    />

    <div className="featured-overlay"></div>

    <div className="featured-glow"></div>

    <div className="featured-tag">
        <FaStar />
        Featured
    </div>

</div>

            <div className="featured-body">

                <h3>

                    {jersey.teamName}

                </h3>

                <p className="featured-name">

                    {jersey.jerseyName}

                </p>

                <div className="featured-info">

                    <span>

                        {jersey.jerseyType}

                    </span>

                    <span>

                        {jersey.season}

                    </span>

                </div>

                <h2 className="featured-price">

                    ₹ {jersey.price}

                </h2>

                <NavLink

                    to={`/jersey/${jersey._id}`}

                    className="featured-btn"

                >

                    View Details

                    <FaArrowRight />

                </NavLink>

            </div>

        </div>

    )

}

export default FeaturedCard