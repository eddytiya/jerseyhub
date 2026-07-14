import React from "react";
import { useNavigate } from "react-router-dom";
import "./ShopGrid.css";

const ShopGrid = ({ jerseys }) => {

    const navigate = useNavigate();

    return (

        <section className="shop-grid">

            {

                jerseys.map((jersey) => (

                    <div
    key={jersey._id}
    className="shop-card"
>

    <div className="featured-ribbon">

        {jersey.featured ? "★ FEATURED" : jersey.category}

    </div>

    <div className="shop-image-wrapper">

        <img
            src={jersey.imageUrl}
            alt={jersey.jerseyName}
        />

        <div className="image-overlay"></div>

    </div>

    <div className="shop-card-body">

        <h5 className="team-name">

            {jersey.teamName}

        </h5>

        <h3>

            {jersey.jerseyName}

        </h3>

        <div className="card-info-row">

            <span className="season-pill">

                {jersey.season}

            </span>

            <span className="type-pill">

                {jersey.jerseyType}

            </span>

        </div>

        {

            jersey.stock > 0 ?

            (

                <div className="stock-badge in-stock">

                    🟢 Stock : {jersey.stock}

                </div>

            )

            :

            (

                <div className="stock-badge out-stock">

                    🔴 Out of Stock

                </div>

            )

        }

        <p className="price">

            ₹ {jersey.price}

        </p>

        <button
            onClick={() => navigate(`/jersey/${jersey._id}`)}
        >

            View Jersey →

        </button>

    </div>

</div>

                ))

            }

        </section>

    );

};

export default ShopGrid;