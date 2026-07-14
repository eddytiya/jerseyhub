import React from "react";

const ProductInfo = ({ jersey }) => {

    return (

        <div className="product-info">

            <span className="product-category">

                {jersey.category}

            </span>

            <h1>

                {jersey.jerseyName}

            </h1>

            <h3>

                {jersey.teamName}

            </h3>

            <div className="product-price">

                ₹ {jersey.price}

            </div>

            {

                jersey.stock > 0 ?

                (

                    <div className="stock available">

                        ✓ {jersey.stock} In Stock

                    </div>

                )

                :

                (

                    <div className="stock unavailable">

                        Out Of Stock

                    </div>

                )

            }

            <div className="product-meta">

                <p>

                    <strong>Season:</strong> {jersey.season}

                </p>

                <p>

                    <strong>Type:</strong> {jersey.type}

                </p>

                <p>

                    <strong>Sizes:</strong>

                    {

                        jersey.sizes?.join(", ")

                    }

                </p>

            </div>

        </div>

    );

};

export default ProductInfo;